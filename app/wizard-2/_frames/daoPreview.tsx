import { type State } from "../frames/route";
import { ReactNode } from "react";
import { Button } from "frames.js/next";

const DaoFrameImage = (state: State): ReactNode => {
  return (
    <div tw="flex flex-col">
      {/* <img width={573} height={300} src={imageUrl} alt="Image" /> */}
      <div tw="flex">DAO Contract: {state.contractAddress}</div>
      <div tw="flex">Proposal ID: {state.proposalId}</div>
      <div tw="flex">Proposal Summary: {state.proposalSummary}</div>
    </div>
  );
};

const DaoInput = undefined
const DaoButton = (state: State) => {
  return [
    <Button key="submit-spell-create" action="post">
      Create
    </Button>,
  ];
};

const DaoPreviewFrame = {
  frameImage: DaoFrameImage,
  frameButton: DaoButton,
  input: DaoInput,
};

export default DaoPreviewFrame;
