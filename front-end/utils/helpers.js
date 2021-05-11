const axios = require("axios");
const Helper = {};
const baseUrl = "http://localhost:5000/api";

// im drawing a blank on how to pass the data to the callback functio
// so i put the axios request directly in PostForm.js
export const getidbyemail = (email, state, setState) => {
  axios
    .get(`${baseUrl}/helper/getidbyemail/${email}`)
    .then(function (response) {
      console.log(`EMAIL ${email} // RETURNS ID ${response.data}`);
      return setState({ ...state, userId: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};
