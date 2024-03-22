import { FrameButton, FrameInput } from "frames.js/next/server";
import { type State } from "../page";
import { ReactNode } from "react";

const DaoFrameImage = (state: State): ReactNode => {
  return (
    <div tw="flex flex-col">
      {/* <img width={573} height={300} src={imageUrl} alt="Image" /> */}
      <div tw="flex">Enter the Proposal ID</div>
    </div>
  );
};

const DaoInput = <FrameInput text="Enter Proposal Id"></FrameInput>;
const DaoButton = <FrameButton>OK</FrameButton>;

const DaoProposalFrame = {
  frameImage: DaoFrameImage,
  frameButton: DaoButton,
  input: DaoInput,
};

export default DaoProposalFrame;
