import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/client";
import { ChevronUpCircleFill, ChevronUpCircle } from "@geist-ui/react-icons";
import { Button, Modal, Spacer } from "@geist-ui/react";
import { getidbyemail } from "../utils/helpers";
import {
  postVote,
  getVote,
  deleteVote,
  updateVoteCount,
} from "../utils/voteHelpers";

export default VoteButton;

function VoteButton(props) {
  const [voteState, setVoteState] = useState({
    voteDisplay: props.votes,
    postId: props.id,
    userId: "",
    didVote: "",
    voteModal: false,
  });
  const handleVote = () => {
    if (voteState.voteModal) {
      setVoteState({
        ...voteState,
        voteModal: !voteState.voteModal,
      });
      console.log("Modal Closed");
    } else if (!props.session) {
      setVoteState({
        ...voteState,
        voteModal: true,
      });
      console.log("Modal Open");
    } else if (voteState.didVote && voteState.voteDisplay <= 1) {
      return;
    } else if (voteState.didVote) {
      deleteVote(voteState.userId, voteState.postId);
      setVoteState({
        ...voteState,
        didVote: !voteState.didVote,
        voteDisplay: voteState.voteDisplay - 1,
      });
    } else {
      postVote(voteState.userId, voteState.postId);
      setVoteState({
        ...voteState,
        didVote: !voteState.didVote,
        voteDisplay: voteState.voteDisplay + 1,
      });
    }
  };
  useEffect(() => {
    if (props.session) {
      getidbyemail(props.session.user.email, voteState, setVoteState);
      console.log("layout getemailbyid");
    }
  }, [props.session]);
  useEffect(() => {
    if (voteState.userId) {
      getVote(voteState.userId, voteState.postId, voteState, setVoteState);
    }
  }, [voteState.userId]);
  useEffect(() => {
    updateVoteCount(props.id);
  }, []);
  return (
    <>
      {voteState.didVote ? (
        <ChevronUpCircleFill size={19} onClick={handleVote} />
      ) : (
        <ChevronUpCircle size={19} onClick={handleVote} />
      )}
      <Modal open={voteState.voteModal} onClose={handleVote}>
        <Modal.Title>Sign in to vote</Modal.Title>
        <Modal.Content style={{ textAlign: "center" }}>
          <Button
            auto
            shadow
            style={{ position: "absolute", left: "40%", top: "0%" }}
            onClick={signIn}
          >
            Sign In
          </Button>
        </Modal.Content>
      </Modal>
      <Spacer inline x={0.2} />
      {voteState.voteDisplay} Pts
    </>
  );
}
