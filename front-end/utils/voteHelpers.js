const axios = require("axios");
const baseUrl = "http://localhost:5000/api";

///////////////////////////////////////////////////////////////////////////////
//GET VOTE/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
export function getVote(idNum, postNum, state, setState) {
  axios
    .get(`${baseUrl}/vote/${idNum}/${postNum}`, {})
    .then(function (response) {
      const didVote =
        typeof response.data.vote[0] === "object" &&
        response.data.vote[0] !== null;

      console.log(
        `AXIOS FETCH vote id ${postNum} is object`,
        typeof response.data.vote[0] === "object" &&
          response.data.vote[0] !== null
      );

      setState({
        ...state,
        didVote: didVote,
      });
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}
///////////////////////////////////////////////////////////////////////////////
//GET DPOST VOTES FROM VOTES AND UPDATE DPOSTS ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
export function updateVoteCount(postNum) {
  axios
    .get(`${baseUrl}/vote/${postNum}`, {})
    .then(function (response) {
      console.log(`DPOST votes updated... making change`);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

///////////////////////////////////////////////////////////////////////////////
//POST/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
export function postVote(idNum, postNum) {
  console.log("posting vote");
  axios({
    method: "post",
    url: `${baseUrl}/vote`,
    data: {
      userId: idNum,
      postId: postNum,
    },
  });
}
///////////////////////////////////////////////////////////////////////////////
//DELETE///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
export function deleteVote(idNum, postNum) {
  console.log("deleting vote");
  axios({
    method: "delete",
    url: `${baseUrl}/vote`,
    data: {
      userId: idNum,
      postId: postNum,
    },
  });
}
