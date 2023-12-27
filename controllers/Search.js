import axios from "axios";

export const search = async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/multi',
    params: {
      query: req.params.query,
      include_adult: false,
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

    const filteredResults = response.data.results.filter(
      (item) => item.media_type !== 'person'
    );

    response.data.results = filteredResults;

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
