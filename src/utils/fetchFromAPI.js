import axios from "axios";

const baseURL = "https://youtube-v31.p.rapidapi.com";

const options = {
  method: "GET",
  url: `${baseURL}`,
  params: { maxResults: "50" },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  const response = await axios.get(`${baseURL}/${url}`, options);

  return response.data;
};
