import { FrameButton, FrameInput } from "frames.js/next/server";
import { type State } from "../page";
import { ReactNode } from "react";

const DaoFrameImage = (state: State): ReactNode => {
  return (
    <div tw="flex flex-col">
      {/* <img width={573} height={300} src={imageUrl} alt="Image" /> */}
      <div tw="flex">This is a Preview of your frame!</div>
    </div>
  );
};

const DaoInput = null
const DaoButton = <FrameButton action="post_redirect">Create</FrameButton>;

const DaoPreviewFrame = {
  frameImage: DaoFrameImage,
  frameButton: DaoButton,
  input: DaoInput,
};

export default DaoPreviewFrame;
