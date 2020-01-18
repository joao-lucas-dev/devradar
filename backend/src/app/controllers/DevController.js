import Dev from '../models/Dev';
import * as Yup from 'yup';

import api from '../../services';
import parseStringAsArray from '../../utils/ParseStringAsArray';
import { findConnections, sendMessage } from '../../websocket';

class DevController {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      github_username: Yup.string().required(),
      techs: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(404).json({ error: 'Validation fails' });
    }

    const { github_username, techs, longitude, latitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (dev) {
      return res.status(404).json({ error: 'User already registered' });
    }

    const techsArray = parseStringAsArray(techs);

    try {
      const response = await api.get(`/users/${github_username}`);

      const { name = login, avatar_url, bio } = response.data;

      const location = {
        type: 'Point',
        coordinates: [
          longitude,
          latitude
        ]
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      // Filtrar as conexões que estão há no máximo 10
      // km de distância e que o novo dev deve ter uma
      // das techs filtradas

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev)

      return res.json(dev);
    } catch (err) {
      return res.status(404).json({ error: 'User not found' });
    }
  }
}

export default new DevController();
