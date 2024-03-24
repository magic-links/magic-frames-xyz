/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import DaoContractFrame from "../_frames/daoContractAddress";
import DaoProposalFrame from "../_frames/daoContractProposalId";
import DaoProposalSummaryFrame from "../_frames/daoProposalSummary";
import DaoPreviewFrame from "../_frames/daoPreview";
import DaoSuccess from "../_frames/daoSuccess";
import { ReactElement, ReactNode } from "react";
import { Spell, storeSpell } from "../../storage.onchain";

const frames = createFrames({
  basePath: "/wizard-2/frames",
  
});

const handleRequest = frames(async (ctx) => {
  const contextState = ctx?.state as State;
  const contextMessage = ctx?.message || {};

  // if ctx.state has templateOption DAO_PREVIEW it means a spell has to be created
  if (contextState?.templateOption === "DAO_PREVIEW") {
    const spell: Spell = {
      name: "bar",
      content: {
        // these values are the only ones that work atm
        // contractAddress: "0x94032F9dCDDe83CC748D588018E90a26bD8b57Ad",
        // proposalId: "2734038565809152965325796826027147483950341642058568409179168635425560537011",
        contractAddress: contextState?.contractAddress || '',
        proposalId: contextState?.proposalId || '',
        chainId: 8453,
        proposalSummary: contextState?.proposalSummary || '',
      },
    };
    const key = await storeSpell(spell);
    const spellUrl = `${process.env.NEXT_PUBLIC_HOST}/spell/dao/proposal/${key}`;
    contextMessage.spellUrl=spellUrl
  }

  let state = reducer(contextState, contextMessage);

  return {
    image: renderImage(state),
    buttons: renderButton(state),
    textInput: renderInput(state),
    state: state,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;

export type State = {
  templateOption: string;
  contractAddress?: string;
  proposalId?: string;
  proposalSummary?: string;
  spellUrl?: string;
};

const initialState: State = { templateOption: "HOME" };

const reducer = (
  state: State | undefined = initialState,
  action: any = {}
): State => {
  const buttonIndex = action?.buttonIndex;
  const inputText = action?.inputText;

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
            proposalSummary: inputText,
          };

        case "DAO_PREVIEW":
          return {
            ...state,
            templateOption: "DAO_SUCCESS",
            spellUrl: action.spellUrl
          };

        default:
          return { ...state, templateOption: "HOME" };
      }

    default:
      return { ...state, templateOption: "HOME" };
  }
};

const frameComponents: { [key: string]: FrameComponentType } = {
  DAO_CONTRACT: DaoContractFrame,
  DAO_PROPOSAL: DaoProposalFrame,
  DAO_PROPOSAL_SUMMARY: DaoProposalSummaryFrame,
  DAO_PREVIEW: DaoPreviewFrame,
  DAO_SUCCESS: DaoSuccess,
};

type FrameComponentType = {
  frameImage: (state: State) => ReactNode;
  frameButton: (state: State) => JSX.Element[];
  input: string | undefined;
};

const renderImage = (state: State): ReactElement => {
  const FrameComponent: FrameComponentType | undefined =
    frameComponents[state.templateOption];
  if (FrameComponent) {
    return FrameComponent.frameImage(state) as ReactElement;
  }
  return (
    <div tw="flex flex-col">
      {/* <img width={573} height={300} src={imageUrl} alt="Image" /> */}
      <div tw="flex">Select your Spell template to start building!</div>
    </div>
  );
};

const renderInput = (state: State) => {
  const FrameComponent: FrameComponentType | undefined =
    frameComponents[state.templateOption as keyof typeof frameComponents];
  return FrameComponent ? FrameComponent.input : undefined;
};

const renderButton = (state: State): any => {
  const FrameComponent: FrameComponentType | undefined =
    frameComponents[state.templateOption as keyof typeof frameComponents];
  if (FrameComponent) {
    return FrameComponent.frameButton(state);
  }
  return [
    <Button key="btn1" action="post">
      DAO
    </Button>,
    <Button key="btn2" action="post">
      DAO
    </Button>,
    <Button key="btn3" action="post">
      DAO
    </Button>,
    <Button key="btn4" action="post">
      DAO
    </Button>,
  ];
};
