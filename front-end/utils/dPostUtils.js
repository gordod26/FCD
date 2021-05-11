const axios = require("axios");
const Dhelper = {};
const baseUrl = "http://localhost:5000/api";

//DHelper.getDposts
Dhelper.getDposts = (setState) => {
  const url = `${baseUrl}/dpost`;
  axios
    .get(url)
    .then(function (response) {
      console.log(response.data);
      return setState(() => {
        return response.data;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
//DHelper.getDpost
//Dhelper.createDpost
Dhelper.createDpost = (post) => {
  const url = `${baseUrl}/dpost`;
  axios
    .post(url, {
      userId: post.userId,
      title: post.title,
      url: post.url,
      text: post.text,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

//Dhelper.updateDpost
//Dhelper.deleteDpost
export default Dhelper;
