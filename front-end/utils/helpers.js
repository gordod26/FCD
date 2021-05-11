const axios = require("axios");
const Helper = {};
const baseUrl = "http://localhost:5000/api";

// im drawing a blank on how to pass the data to the callback functio
// so i put the axios request directly in PostForm.js
export const getidbyemail = (email, callback) => {
  axios
    .get(`${baseUrl}/helper/getidbyemail/${email}`)
    .then(function (response) {
      const data = response.data;
      console.log(response.data);
      return callback;
    })
    .catch(function (error) {
      console.log(error);
    });
};
