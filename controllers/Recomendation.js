import axios from "axios";
import Users from "../models/UserModel.js";
import Profile from "../models/ProfileModel.js";

export const getRecomendationSeriesById = async(req, res) => {
    try {
        const seriesId = req.params.id

        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${seriesId}/recommendations`,
            params: {
                include_adult: false,
                language: "en-US",
                page: req.params.page,
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
            

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getRecomendationMovieById = async(req, res) => {
    try {
        const movieId = req.params.id

        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
            params: {
                language: "en-US",
                page: req.params.page,
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
            

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getSimilarSeriesById = async(req, res) => {
    try {
        const seriesId = req.params.id

        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${seriesId}/similar`,
            params: {
                include_adult: false,
                language: "en-US",
                page: req.params.page,
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
            

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getSimilarMovieById = async(req, res) => {
    try {
        const movieId = req.params.id

        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}/similar`,
            params: {
                language: "en-US",
                page: req.params.page,
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
            

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getTrendingMovie = async (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10);

    const aWeekAgo = new Date();
    aWeekAgo.setDate(aWeekAgo.getDate() - 7); // Subtract 7 days
    const formattedDate = aWeekAgo.toISOString().slice(0, 10);

    console.log(currentDate);
    console.log(formattedDate);

    const user = await Users.findOne({ where: { id: req.userId } });
    const profile = await Profile.findOne({ where: { id: user.current_profile } });

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie',
        params: {
            include_adult: false,
            include_video: false,
            language: 'en-US',
            page: req.params.page,
            'primary_release_date.lte': currentDate,
            'primary_release_date.gte': formattedDate,
            region: 'SG',
            certification_country: 'SG',
            'certification.lte': profile.contentRating,
            sort_by: 'popularity.desc',
        },
        headers: {
            accept: 'application/json',
            Authorization: process.env.authbearer,
        },
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getTrendingSeries = async(req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10);

    const aWeekAgo = new Date();
    aWeekAgo.setDate(aWeekAgo.getDate() - 7); // Subtract 7 days
    const formattedDate = aWeekAgo.toISOString().slice(0, 10);

    console.log(currentDate);
    console.log(formattedDate);

    const user = await Users.findOne({ where: { id: req.userId } });
    const profile = await Profile.findOne({ where: { id: user.current_profile } });

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/tv',
        params: {
            include_adult: false,
            include_null_first_air_dates: false,
            language: 'en-US',
            page: req.params.page,
            'first_air_date.lte': currentDate,
            'first_air_date.gte': formattedDate,
/*             region: 'SG',
            certification_country: 'SG',
            'certification.lte': profile.contentRating,
            sort_by: 'popularity.desc', */
        },
        headers: {
            accept: 'application/json',
            Authorization: process.env.authbearer,
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