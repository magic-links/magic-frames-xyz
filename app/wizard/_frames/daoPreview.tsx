import { FrameButton, FrameInput } from "frames.js/next/server";
import { type State } from "../page";
import { ReactNode } from "react";

const DaoFrameImage = (state: State, previousFrame): ReactNode => {
  return (
    <div tw="flex flex-col">
      {/* <img width={573} height={300} src={imageUrl} alt="Image" /> */}
      <div tw="flex">DAO Contract: {state.contractAddress}</div>
      <div tw="flex">Proposal ID: {state.proposalId}</div>
      <div tw="flex">Proposal Summary: {previousFrame.postBody.untrustedData.inputText}</div>
    </div>
  );
};

const DaoInput = null
const DaoButton = (state: State) => {
  return <FrameButton action="post">Create</FrameButton>;
}

const DaoPreviewFrame = {
  frameImage: DaoFrameImage,
  frameButton: DaoButton,
  input: DaoInput,
};

export default DaoPreviewFrame;
