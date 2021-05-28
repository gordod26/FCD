const axios = require("axios");
const Dhelper = {};
const baseUrl = "http://localhost:5000/api";
///////////////////////////////////////////////////////////////////////////////
//DHelper.getDposts REPLACED BY GETSORTEDPOSTS/////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//Dhelper.getDposts = (setState) => {
//const url = `${baseUrl}/dpost`;
//axios
//.get(url)
//.then(function (response) {
//console.log("getDposts response data //", response.data);
//return setState(response.data);
//})
//.catch(function (error) {
//console.log(error);
//});
//};

///////////////////////////////////////////////////////////////////////////////
//DHelper.getDposts ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////////
// CHANGE DPOSTs by SORTMETHOD ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
Dhelper.getSortedPosts = (sortMethod, postType, setState) => {
  const url = `${baseUrl}/dpost/sort/${sortMethod}/${postType}`;
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
      postType: post.postType,
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
Dhelper.deleteDpost = (id) => {
  const url = `${baseUrl}/dpost/${id}`;
  axios
    .delete(url)
    .then(function (response) {
      console.log("postDeleted", response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Tried to use this for getstatic props but had to manually do it instead.
//Dhelper.getDataForStatic = () => {
//const url = `http://localhost:5000/api/dpost/`;
//axios.get(`http://localhost:5000/api/dpost/`).then(function (response) {
//return response.data;
//});
//};

export default Dhelper;
