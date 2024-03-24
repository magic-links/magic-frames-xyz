import { STORAGE_REGISTRY_ADDRESS } from "@farcaster/core";
import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
} from "viem";
import { daoProposalABI } from "./contracts/dao-proposal";

// TODO to be replaced with actuall storage function
// const getSpellById = (id: number) => {
//   return {
//     id: 1,
//     name: 'Fireball',
//     content: {
//       contractAddress: "0x789fc99093b09ad01c34dc7251d0c89ce743e5a4",
//       proposalId: "21881347407562908848280051025758535553780110598432331587570488445729767071232",
//       chainId: 42161,
//       proposalSummary: "Vote for the latest Magic proposal!"
//     }
//   }
// }
const getSpellById = (id: number) => {
  return {
    id: 1,
    name: 'Fireball',
    content: {
      contractAddress: "0x94032F9dCDDe83CC748D588018E90a26bD8b57Ad",
      proposalId: "2734038565809152965325796826027147483950341642058568409179168635425560537011",
      chainId: 8453,
      proposalSummary: "Vote for the latest Magic proposal!"
    }
  }
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);

  const urlParse = json.untrustedData.url.split("/");
  const spellId = urlParse[(urlParse.length-2)];

  const spellDetails = getSpellById(spellId);

  if (!frameMessage) {
    throw new Error("No frame message");
  }

  //console.log(json)

  const getVoteSupport = (buttonIndex) => {
    switch (buttonIndex) {
      case 1:
        return 1
      case 2:
        return 0
      case 3:
        return 2
    };
  };

  var voteSupport = getVoteSupport(frameMessage.buttonIndex);

  const proposalId = spellDetails.content.proposalId
  const daoContractAddress = spellDetails.content.contractAddress

  const calldata = encodeFunctionData({
    abi: daoProposalABI,
    functionName: "castVote",
    args: [BigInt(proposalId), voteSupport],
  });

  return NextResponse.json({
    chainId: "eip155:8453", // Arbitrum Mainnet 42161, Base Mainnet 8453
    method: "eth_sendTransaction",
    params: {
      abi: daoProposalABI as Abi,
      to: daoContractAddress,
      data: calldata,
      value: 0,
    },
  });
}
