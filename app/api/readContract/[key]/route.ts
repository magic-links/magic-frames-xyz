// TODO: this is an example of reading from the contract.

import { createWalletClient, http, publicActions } from 'viem'
import { hardhat } from 'viem/chains'
import { NextRequest, NextResponse } from 'next/server';

import abi from '../../../abis/abi.json';

const contractABI = abi as any;
const contractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
 
// export async function GET(request: NextRequest, key: string) {
export async function GET(
  request: NextRequest,
  {params}: {params: {key: string}}
) {

  const key = params.key;

  const walletClient = createWalletClient({
    chain: hardhat,
    transport: http('http://localhost:8545'),
  }).extend(publicActions);

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
