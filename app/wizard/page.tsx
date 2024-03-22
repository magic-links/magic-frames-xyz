import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  NextServerPageProps,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";
import Link from "next/link";
import { currentURL } from "../utils";
import { createDebugUrl } from "../debug";

import { ReactNode } from "react";
import DaoContractFrame from "./_frames/daoContractAddress";
import DaoProposalFrame from "./_frames/daoContractProposalId";

export type State = {
  pageIndex: number;
  templateOption: string;
  contractAddress?: string;
  proposalId?: string;
};

const totalPages = 5;
const initialState: State = { pageIndex: 0, templateOption: "HOME" };

const reducer: FrameReducer<State> = (state, action) => {
  const buttonIndex = action.postBody?.untrustedData.buttonIndex;
  const inputText = action.postBody?.untrustedData.inputText;

  switch (buttonIndex) {
    case 1:
      switch (state.templateOption) {
        case "HOME":
          return { ...state, templateOption: "DAO_CONTRACT" };

        case "DAO_CONTRACT":
          return {
            ...state,
            templateOption: "DAO_PROPOSAL",
            contractAddress: inputText,
          };

        case "DAO_PROPOSAL":
          return {
            ...state,
            templateOption: "DAO_PREVIEW",
            proposalId: inputText,
          };

        default:
          return { ...state, templateOption: "HOME" };
      }

    default:
      return { ...state, templateOption: "HOME" };
  }
};

const frameComponents = {
  DAO_CONTRACT: DaoContractFrame,
  DAO_PROPOSAL: DaoProposalFrame,
};
const renderImage = (state: State): ReactNode => {
  const FrameComponent =
    frameComponents[state.templateOption as keyof typeof frameComponents];
  if (FrameComponent) {
    return FrameComponent.frameImage(state);
  }
  return (
    <div tw="flex flex-col">
      {/* <img width={573} height={300} src={imageUrl} alt="Image" /> */}
      <div tw="flex">Select you template to start building spells!</div>
      <div tw="flex flex-col ">
        <div>1. Dao</div>
        <div>2. Dao</div>
        <div>3. Dao</div>
        <div>4. Dao</div>
      </div>
      <div tw="flex">
        This is slide {state.pageIndex + 1} / {totalPages}
      </div>
    </div>
  );
};

const renderInput = (state: State) => {
  const FrameComponent =
    frameComponents[state.templateOption as keyof typeof frameComponents];
  return FrameComponent ? FrameComponent.input : null;
};

const renderButton = (state: State): any => {
  const FrameComponent =
    frameComponents[state.templateOption as keyof typeof frameComponents];
  if (FrameComponent) {
    return FrameComponent.frameButton;
  }
  return [
    <FrameButton key="btn1">DAO</FrameButton>,
    <FrameButton key="btn2">DAO</FrameButton>,
    <FrameButton key="btn3">DAO</FrameButton>,
    <FrameButton key="btn4">DAO</FrameButton>,
  ];
};

// This is a react server component only
export default async function Home({ searchParams }: NextServerPageProps) {
  const url = currentURL("/wizard");
  const previousFrame = getPreviousFrame<State>(searchParams);
  console.log(previousFrame);
  const [state] = useFramesReducer<State>(reducer, initialState, previousFrame);
  // const imageUrl = `https://picsum.photos/seed/frames.js-${state.pageIndex}/1146/600`;

  // then, when done, return next frame

  return (
    <div>
      Multi-page example <Link href={createDebugUrl(url)}>Debug</Link>
      <FrameContainer
        pathname="/wizard"
        postUrl="/wizard/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage>{renderImage(state)}</FrameImage>
        {renderInput(state)}
        {renderButton(state)}
      </FrameContainer>
    </div>
  );
}
