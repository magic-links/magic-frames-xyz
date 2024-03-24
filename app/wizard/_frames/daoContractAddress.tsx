import { FrameButton, FrameInput } from "frames.js/next/server";
import { type State } from "../page";
import { ReactNode } from "react";

const DaoFrameImage = (state: State, previousFrame): ReactNode => {
  return (
    <div tw="flex flex-col">
      {/* <img width={573} height={300} src={imageUrl} alt="Image" /> */}
      <div tw="flex">Enter DAO Contract Address</div>
    </div>
  );
};

const DaoInput = <FrameInput text="Enter Contract Address"></FrameInput>;
const DaoButton = (state: State) => {
  return <FrameButton>OK</FrameButton>;
}

const DaoContractFrame = {
  frameImage: DaoFrameImage,
  frameButton: DaoButton,
  input: DaoInput,
};

export default DaoContractFrame;
