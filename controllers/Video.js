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
        "primary_release_date.gte": "2005-01-01",
        "primary_release_date.lte": "2020-12-31",
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



export const getPopularMovie = async (req, res) => {
    
    const currentDate = new Date().toISOString().slice(0, 10);
    
    const aYearAgo = new Date();
    aYearAgo.setFullYear(aYearAgo.getFullYear() - 1); 
    const formattedDate = aYearAgo.toISOString().slice(0, 10);

    console.log(currentDate)
    console.log(formattedDate)
  
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

export const getBestSellingMovie = async (req, res) => {
    
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
        region: 'SG',
        certification_country: 'SG',
        'certification.lte': profile.contentRating,
        sort_by: 'revenue.desc.desc',
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
  

  export const getDetailMovie = async(req, res) => {
  
    const id = req.params.id
    const {userId} = req
    const jenis_pengguna = (await Users.findOne({where:{id: userId}})).jenis_pengguna
  
      const optionsMovieVideo = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${id}`,
      params: {
          api_key: process.env.api_key,
          append_to_response: "videos"
      },
      headers: {
          'accept': 'application/json',
          'Authorization': process.env.authbearer,
      },
      };
  
      const optionsReleaseDate = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/movie/${id}/release_dates`,
          headers: {
              'accept': 'application/json',
              'Authorization': process.env.authbearer,
          },
      };
      
      
      try {
  
          const responseMovieVideo = await axios.request(optionsMovieVideo);
          const responseReleaseDate = await axios.request(optionsReleaseDate);
          const certificationSG = responseReleaseDate.data.results.find(item => item.iso_3166_1 === 'SG');
          const response = responseMovieVideo.data
          response.release_dates = certificationSG

        if (jenis_pengguna === "subscribed") {
            const subscribedResult = subscribedFeature(response, "movie");
            return res.status(200).json(subscribedResult);
        }

  
          res.status(200).json(response);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
      
  }

  export const getDetailSeries = async(req, res) => {

    const id = req.params.id
    const {userId} = req
    const jenis_pengguna = (await Users.findOne({where:{id: userId}})).jenis_pengguna

    const optionsMovieVideo = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${id}`,
    params: {
        api_key: process.env.api_key,
        append_to_response: "videos"
    },
    headers: {
        'accept': 'application/json',
        'Authorization': process.env.authbearer,
    },
    };

    const optionsReleaseDate = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${id}/content_ratings`,
        headers: {
            'accept': 'application/json',
            'Authorization': process.env.authbearer,
        },
    };
    

    try {
        
        const responseMovieVideo = await axios.request(optionsMovieVideo);
        const responseReleaseDate = await axios.request(optionsReleaseDate);
        const certificationSG = responseReleaseDate.data.results
        const response = responseMovieVideo.data
        response.release_dates = certificationSG

        if (jenis_pengguna === "subscribed") {
            const subscribedResult = subscribedFeature(response, "series");
            return res.status(200).json(subscribedResult);
        }

        res.status(200).json(responseMovieVideo.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

const subscribedFeature = (result, type) => {
    if (type = "movie"){
        result.video = "https://firebasestorage.googleapis.com/v0/b/visionary-9f018.appspot.com/o/yt1s.com%20-%20Kompilasi%20Tekotok%2048.mp4?alt=media&token=87deeccc-f64d-4e9c-9a78-e4b932d73398"
    }if (type = "series"){
        result.video = "https://firebasestorage.googleapis.com/v0/b/visionary-9f018.appspot.com/o/yt1s.com%20-%20Kompilasi%20Tekotok%2048.mp4?alt=media&token=87deeccc-f64d-4e9c-9a78-e4b932d73398"
    }
    return result;
}

export const getDetailEpisode = async(req, res) => {

      const optionsMovieVideo = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/tv/${req.params.series_id}/season/${req.params.season_number}/episode/${req.params.episode_number}`,
      params: {
        api_key: process.env.api_key,
        append_to_response: "images",
        language: "en-US",
      },
      headers: {
        'accept': 'application/json',
        'Authorization': process.env.authbearer,
      },
      };

      try {
          const responseMovieVideo = await axios.request(optionsMovieVideo);

        if (jenis_pengguna === "subscribed") {
            const subscribedResult = subscribedFeature(responseMovieVideo, "series");
            return res.status(200).json(subscribedResult);
        }

  
          res.status(200).json(response);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
      
  }