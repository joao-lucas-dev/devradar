import Dev from '../models/Dev';
import * as Yup from 'yup';

import api from '../../services';
import parseStringAsArray from '../../utils/ParseStringAsArray'

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

    return res.json(dev);
  }
}

export default new DevController();
