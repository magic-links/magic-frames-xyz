import { FrameButton, FrameInput } from "frames.js/next/server";
import { type State } from "../page";
import { ReactNode } from "react";

const DaoFrameImage = (state: State, previousFrame): ReactNode => {
  return (
    <div tw="flex flex-col">
      <div tw="flex">Spell Created</div>
      <div tw="flex">Spell URL: {state.spellUrl}</div>
    </div>
  );
};

const DaoButton = (state: State) => {
  return <FrameButton action="link" target={state.spellUrl}>OK</FrameButton>;
}

const DaoSuccess = {
  frameImage: DaoFrameImage,
  frameButton: DaoButton,
};

export default DaoSuccess;
