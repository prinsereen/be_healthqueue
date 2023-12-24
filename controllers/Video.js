import axios from "axios";
import Users from "../models/UserModel.js";
import Profile from "../models/ProfileModel.js";

export const getTopRatedMovie = async(req, res) => {

    const user = await Users.findOne({where: {id: req.userId}})
    const profile = await Profile.findOne({where: {id: user.current_profile}})

    const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie',
    params: {
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: req.params.page,
        "primary_release_date.gte": "2023-10-01",
        region: "SG",
        certification_country: "SG",
        "certification.lte": profile.contentRating
    },
    headers: {
        'accept': 'application/json',
        'Authorization': process.env.authbearer,
    },
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

export const getOldestMovie = async(req, res) => {
  
    const user = await Users.findOne({where: {id: req.userId}})
    const profile = await Profile.findOne({where: {id: user.current_profile}})

    const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie',
    params: {
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: req.params.page,
        "primary_release_date.lte": "1999-12-31",
        region: "SG",
        certification_country: "SG",
        "certification.lte": profile.contentRating
    },
    headers: {
        'accept': 'application/json',
        'Authorization': process.env.authbearer,
    },
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

export const getLatestMovie = async(req, res) => {

    const currentDate = new Date().toISOString().slice(0, 10);
    const user = await Users.findOne({where: {id: req.userId}})
    const profile = await Profile.findOne({where: {id: user.current_profile}})

    const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie',
    params: {
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: req.params.page,
        "primary_release_date.lte": currentDate,
        region: "SG",
        certification_country: "SG",
        "certification.lte": profile.contentRating,
        sort_by:"primary_release_date.desc"
    },
    headers: {
        'accept': 'application/json',
        'Authorization': process.env.authbearer,
    },
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}


export const getUpcomingtMovie = async(req, res) => {

    const currentDate = new Date().toISOString().slice(0, 10);
    const user = await Users.findOne({where: {id: req.userId}})
    const profile = await Profile.findOne({where: {id: user.current_profile}})

    const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie',
    params: {
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: req.params.page,
        "primary_release_date.gte": currentDate,
        region: "SG",
        certification_country: "SG",
        "certification.lte": profile.contentRating,
        sort_by:"primary_release_date.asc"
    },
    headers: {
        'accept': 'application/json',
        'Authorization': process.env.authbearer,
    },
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}