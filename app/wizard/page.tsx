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
import DaoProposalSummaryFrame from "./_frames/daoProposalSummary";
import DaoPreviewFrame from "./_frames/daoPreview";
import DaoSuccessFrame from "./_frames/daoSuccess";
import DaoSuccess from "./_frames/daoSuccess";

import { storeSpell, Spell } from "../storage.onchain";

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

  console.log(state)

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
            templateOption: "DAO_PROPOSAL_SUMMARY",
            proposalId: inputText,
          };

        case "DAO_PROPOSAL_SUMMARY":
          return {
            ...state,
            templateOption: "DAO_PREVIEW",
          };

        case "DAO_PREVIEW":
          return {
            ...state,
            templateOption: "DAO_SUCCESS",
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
  DAO_PROPOSAL_SUMMARY: DaoProposalSummaryFrame,
  DAO_PREVIEW: DaoPreviewFrame,
  DAO_SUCCESS: DaoSuccess
};
const renderImage = (state: State, previousFrame): ReactNode => {
  const FrameComponent =
    frameComponents[state.templateOption as keyof typeof frameComponents];
  if (FrameComponent) {
    return FrameComponent.frameImage(state, previousFrame);
  }
  return (
    <div tw="flex flex-col">
      {/* <img width={573} height={300} src={imageUrl} alt="Image" /> */}
      <div tw="flex">Select your Spell template to start building!</div>
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
    return FrameComponent.frameButton(state);
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
  const [state] = useFramesReducer<State>(reducer, initialState, previousFrame);
  // const imageUrl = `https://picsum.photos/seed/frames.js-${state.pageIndex}/1146/600`;
  console.log({state, previousFrame});

  let spellUrl = undefined;
  if (state.templateOption === "DAO_SUCCESS") {
    const spell: Spell = {
        name: "bar",
        content: {
          // these values are the only ones that work atm
          // contractAddress: "0x94032F9dCDDe83CC748D588018E90a26bD8b57Ad",
          // proposalId: "2734038565809152965325796826027147483950341642058568409179168635425560537011",
          contractAddress: state.contractAddress,
          proposalId: state.proposalId,
          chainId: 8453,
          proposalSummary: "best proposal this week!"
        }
    };

    const key = await storeSpell(spell);
    spellUrl = `${process.env.NEXT_PUBLIC_HOST}/spell/dao/proposal/${key}`;
  }

  return (
    <div>
      Multi-page example <Link href={createDebugUrl(url)}>Debug</Link>
      <FrameContainer
        pathname="/wizard"
        postUrl="/wizard/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage>{renderImage({...state, spellUrl}, previousFrame)}</FrameImage>
        {renderInput(state)}
        {renderButton({...state, spellUrl})}
      </FrameContainer>
    </div>
  );
}
