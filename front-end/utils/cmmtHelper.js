const axios = require("axios");
const cmmtHelper = {};
const baseUrl = "http://localhost:5000/api";

//cmmtHelper.getCmmts
cmmtHelper.getCmmts = (setState) => {
  const url = `${baseUrl}/comment/${commentId}`;
  axios
    .get(url)
    .then(function (response) {
      console.log("getDposts response data //", response.data);
      return setState(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

//Dhelper.createDpost
Dhelper.createDpost = (comment) => {
  const url = `${baseUrl}/dpost`;
  axios
    .post(url, {
      userId: comment.userId,
      title: comment.title,
      url: comment.url,
      text: comment.text,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
