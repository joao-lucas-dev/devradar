import Dev from '../models/Dev';
import * as Yup from 'yup';

import parseStringAsArray from '../../utils/ParseStringAsArray';

class SearchController {
  async index(req, res) {
    const schema = Yup.object().shape({
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      techs: Yup.string().required(),
    });

    if(!(await schema.isValid(req.query))) {
      return res.status(404).json({ error: 'Validation fails' });
    }

    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      }
    });

    return res.json(devs);
  }
}

export default new SearchController;
