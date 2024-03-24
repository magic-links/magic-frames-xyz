import { FrameButton, FrameInput } from "frames.js/next/server";
import { type State } from "../frames/route";
import { ReactNode } from "react";
import { Button } from "frames.js/next";

const DaoFrameImage = (state: State): ReactNode => {
  return (
    <div tw="flex flex-col">
      {/* <img width={573} height={300} src={imageUrl} alt="Image" /> */}
      <div tw="flex">Enter DAO Contract Address</div>
    </div>
  );
};

const DaoInput = "Enter Contract Address";
const DaoButton = (state: State) => {
  return [
    <Button key="submit-contract-address" action="post">
      OK
    </Button>,
  ];
};

const DaoContractFrame = {
  frameImage: DaoFrameImage,
  frameButton: DaoButton,
  input: DaoInput,
};

export default DaoContractFrame;
