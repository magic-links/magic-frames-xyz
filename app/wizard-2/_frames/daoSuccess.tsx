import { type State } from "../frames/route";
import { ReactNode } from "react";
import { Button } from "frames.js/next";

const DaoFrameImage = (state: State): ReactNode => {
  return (
    <div tw="flex flex-col">
      <div tw="flex">Spell Created</div>
      <div tw="flex">Spell URL: {state.spellUrl}</div>
    </div>
  );
};

const DaoButton = (state: State) => {
  return [
    <Button key="spell-link" action="link" target={state.spellUrl || ""}>
      OK
    </Button>,
  ];
};

const DaoSuccess = {
  frameImage: DaoFrameImage,
  frameButton: DaoButton,
  input: undefined,
};

export default DaoSuccess;
