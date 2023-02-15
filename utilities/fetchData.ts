import axios from 'axios';

export const fetchData = async (url) => {
  return axios(url, {
    method: 'GET',
    headers: {
      // Enabling the next line will solve the error, but it shouldn't make a difference
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      console.log(response);
      // handle success
      return response.data;
    })
    .catch(function (error) {
      console.error(error, url);
      return error;
    });
};
