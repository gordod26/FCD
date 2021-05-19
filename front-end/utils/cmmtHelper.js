const axios = require("axios");
export const cmmtHelper = {};
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

//cmmtHelper.postCmmt
cmmtHelper.createCmmt = (comment) => {
  const url = `${baseUrl}/comments/dpost/${comment.dpostId}`;
  axios
    .post(url, {
      userId: comment.userId,
      dpostId: comment.dpostId,
      cmmt: comment.cmmt,
      path: comment.path,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
