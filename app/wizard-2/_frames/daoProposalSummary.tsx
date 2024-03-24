import { FrameButton, FrameInput } from "frames.js/next/server";
import { type State } from "../frames/route";
import { ReactNode } from "react";
import { Button } from "frames.js/next";

const DaoFrameImage = (state: State): ReactNode => {
  return (
    <div tw="flex flex-col">
      {/* <img width={573} height={300} src={imageUrl} alt="Image" /> */}
      <div tw="flex">Enter the Proposal Summary</div>
    </div>
  );
};

const DaoInput ="Enter Proposal Summary";
const DaoButton = (state: State) => {
  return [
    <Button key="submit-proposal-summary" action="post">
      OK
    </Button>,
  ];
};

const DaoProposalFrame = {
  frameImage: DaoFrameImage,
  frameButton: DaoButton,
  input: DaoInput,
};

export default DaoProposalFrame;
