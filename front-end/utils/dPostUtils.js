const axios = require("axios");
const Dhelper = {};
const baseUrl = "http://localhost:5000/api";

//DHelper.getDposts
Dhelper.getDposts = (setState) => {
  const url = `${baseUrl}/dpost`;
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
//DHelper.getUsersPosts
Dhelper.getUserPosts = (id, setState) => {
  const url = `${baseUrl}/dpost/userposts/${id}`;
  axios
    .get(url)
    .then(function (response) {
      console.log(response.data);
      setState(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

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
