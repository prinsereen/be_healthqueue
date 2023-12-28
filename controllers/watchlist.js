import Users from "../models/UserModel.js";
import Profile from "../models/ProfileModel.js";
import axios from "axios";

export const createList = async(req, res) => {
    const user = await Users.findOne({ where: { id: req.userId } });

    const options = {
        method: 'POST',
        url: 'https://api.themoviedb.org/4/list',
        headers: {
          accept: 'application/json',
          Authorization: process.env.access_token,
        },
        data: req.body
      };
    
      try {
        const response = await axios.request(options);
        await Profile.update({watchlist_id: response.data.id},{ where: { id: user.current_profile } });
        res.status(200).json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export const addItems = async(req, res) => {
    const user = await Users.findOne({ where: { id: req.userId } });
    const currentProfile = await Profile.findOne({ where: { id: user.current_profile } });

    const options = {
        method: 'POST',
        url: `https://api.themoviedb.org/4/list/${currentProfile.watchlist_id}/items`,
        headers: {
          accept: 'application/json',
          Authorization: process.env.access_token,
        },
        data: req.body
      };
    
      try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export const getDetailList = async(req, res) => {  
    const user = await Users.findOne({ where: { id: req.userId } });
    const currentProfile = await Profile.findOne({ where: { id: user.current_profile } });

    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/list/${currentProfile.watchlist_id}`,
      params: {
        language: 'en-US',
        page: req.params.page,
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

export const deleteItems = async(req, res) => {
  const user = await Users.findOne({ where: { id: req.userId } });
  const currentProfile = await Profile.findOne({ where: { id: user.current_profile } });

  const options = {
      method: 'DELETE',
      url: `https://api.themoviedb.org/4/list/${currentProfile.watchlist_id}/items`,
      headers: {
        accept: 'application/json',
        Authorization: process.env.access_token,
      },
      data: req.body
    };
  
    try {
      const response = await axios.request(options);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}