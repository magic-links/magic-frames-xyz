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

type State = {
  pageIndex: number;
};

const totalPages = 5;
const initialState: State = { pageIndex: 0 };


const reducer: FrameReducer<State> = (state, action) => {
  const buttonIndex = action.postBody?.untrustedData.buttonIndex;

  return {
    pageIndex: buttonIndex
      ? (state.pageIndex + (buttonIndex === 2 ? 1 : -1)) % totalPages
      : state.pageIndex,
  };
};

// This is a react server component only
export default async function Home({ params, searchParams }: NextServerPageProps) {
  console.log(params);
  console.log(searchParams);
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
              This {params.id} is slide {state.pageIndex + 1} / {totalPages}
            </div>
          </div>
        </FrameImage>
        <FrameButton>For</FrameButton>
        <FrameButton>Against</FrameButton>
        <FrameButton>Abstain</FrameButton>
      </FrameContainer>
    </div>
  );
}
