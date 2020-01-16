const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index (request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response) {
        const { github_userame, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_userame });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_userame}`);
        
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location  = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_userame,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
    
       
    
        return response.json(dev);
    }
}