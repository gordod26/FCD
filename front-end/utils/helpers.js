const axios = require("axios");
const baseUrl = "http://localhost:5000/api";

export const getidbyemail = (email, state, setState) => {
  if (!email) {
  } else {
    axios
      .get(`${baseUrl}/helper/getidbyemail/${email}`)
      .then(function (response) {
        console.log(`EMAIL`, email, ` // RETURNS ID,`, response.data);
        return setState({ ...state, userId: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

export const getnamebyid = (id, state, setState) => {
  axios
    .get(`${baseUrl}/helper/getnamebyid/${id}`)
    .then(function (response) {
      console.log("returns id", id, "returns name", response.data);
      return setState({ ...state, username: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};
