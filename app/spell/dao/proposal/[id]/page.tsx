import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  NextServerPageProps,
  getPreviousFrame,
  useFramesReducer,
  getFrameMessage,
} from "frames.js/next/server";
import Link from "next/link";
import { currentURL } from "../../../../utils";
import { DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from "../../../../debug";
import { getSpellById } from "../../../../storage.onchain";

type State = {
  pageIndex: number;
  spellId?: number;
};

const initialState: State = { pageIndex: 0 };

const reducer: FrameReducer<State> = (state, action) => {
  const buttonIndex = action.postBody?.untrustedData.buttonIndex;

  switch (buttonIndex) {
    case 1:
      return {voteSupport: 1}
    case 2:
      return {voteSupport: 0}
    case 3:
      return {voteSupport: 2}
  };
};

// This is a react server component only
export default async function Home({ params, searchParams }: NextServerPageProps) {
  const url = currentURL(`/spell/dao/proposal/${params.id}`);
  const previousFrame = getPreviousFrame<State>(searchParams);
  const [state] = useFramesReducer<State>(reducer, initialState, previousFrame);
  const imageUrl = `https://picsum.photos/seed/frames.js-${state.pageIndex}/1146/600`;

  const spellDetails = await getSpellById(params.id);
  console.log({params, spellDetails});

  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
  });

  if (frameMessage?.transactionId) {
    return (
      <FrameContainer
        pathname="/examples/transaction"
        postUrl="/examples/transaction/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage aspectRatio="1:1">
          <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex">
            Vote submitted!
          </div>
        </FrameImage>
        <FrameButton
          action="link"
          target={`https://basescan.org//tx/${frameMessage.transactionId}`}
        >
          View on block explorer
        </FrameButton>
      </FrameContainer>
    );
  }

  // then, when done, return next frame
  return (
    <div>
      Multi-page example <Link href={createDebugUrl(url)}>Debug</Link>
      <FrameContainer
        pathname={`/spell/dao/proposal/${params.id}`}
        postUrl={`/spell/dao/proposal/${params.id}/frames`}
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage>
          <div tw="flex flex-col">
            {/* <img width={573} height={300} src={imageUrl} alt="Image" /> */}
            <div tw="flex">
              {spellDetails.content.proposalSummary}
            </div>
          </div>
        </FrameImage>
        <FrameButton action="tx" target={`/spell/dao/proposal/${params.id}/txdata`}>For</FrameButton>
        <FrameButton action="tx" target={`/spell/dao/proposal/${params.id}/txdata`}>Against</FrameButton>
        <FrameButton action="tx" target={`/spell/dao/proposal/${params.id}/txdata`}>Abstain</FrameButton>
      </FrameContainer>
    </div>
  );
}
