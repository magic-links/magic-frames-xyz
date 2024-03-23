// TODO: this is an example of reading from the contract.

import { createWalletClient, http, publicActions } from 'viem'
import { hardhat } from 'viem/chains'
import { NextRequest, NextResponse } from 'next/server';

import abi from './abi.json';

const contractABI = abi as any;
const contractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
 
export async function GET(request: NextRequest) {

  const walletClient = createWalletClient({
    chain: hardhat,
    transport: http('http://localhost:8545'),
  }).extend(publicActions);

  // TODO: replace this with a value obtained from a write.
  const key = "0x6c60fac1713f9f035c49d02b1195a83f39c5e5b66b99783767e23aa253be9ac9";

  const result = await walletClient.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getValue',
    args: [key],
  });

  return new NextResponse(
    JSON.stringify({result}),
    {headers: {'Content-Type': 'application/json'}}
  );
}
