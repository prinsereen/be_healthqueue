import axios from "axios";

// Rekomendasi by Id 2 API 
// Trending MOVIE ama Series
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

export const getTrendingMovie = async(req, res) => {
    try {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/trending/movie/week`,
            params: {
                language: "en-US",
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

export const getTrendingSeries = async(req, res) => {
    try {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/trending/tv/week`,
            params: {
                language: "en-US",
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