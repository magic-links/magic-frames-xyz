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
import { currentURL } from "../../../../utils";
import { createDebugUrl } from "../../../../debug";
import { getSpellById } from "../../../../storage";

type State = {
  pageIndex: number;
};

const totalPages = 5;
const initialState: State = { pageIndex: 0 };
const baseUrl = "https://app.magiclinks.xyz/txn/0c8e7721-cf24-41b2-8f47-ef22ab4d4831?chain_id=42161";
const spellDetails = {
  id: 1,
  name: 'Fireball',
  content: {
    contractAddress: "0x789fc99093b09ad01c34dc7251d0c89ce743e5a4",
    proposalId: "21881347407562908848280051025758535553780110598432331587570488445729767071232",
    chainId: 42161,
    proposalSummary: "Vote for the latest Magic proposal!"
  }
}

const fullUrl = `${baseUrl}?chainId=${spellDetails.content.chainId}&contractAddress=${spellDetails.content.contractAddress}&proposalId=${spellDetails.content.proposalId}`

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
        <FrameButton action="link" target={`${fullUrl}&vote=1`}>For</FrameButton>
        <FrameButton action="link" target={`${fullUrl}&vote=0`}>Against</FrameButton>
        <FrameButton action="link" target={`${fullUrl}&vote=2`}>Abstain</FrameButton>
      </FrameContainer>
    </div>
  );
}
