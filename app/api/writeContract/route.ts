// TODO: this is an example of writing to the contract.

import { createWalletClient, http, publicActions } from 'viem'

import { NextRequest, NextResponse } from 'next/server';
import { privateKeyToAccount } from 'viem/accounts';

import abi from './abi.json';


// TODO: replace with a private key from a wallet that has funds
const privateKey = "0xREPLACE-ME";
const contractABI = abi as any;
const contractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
 
export async function GET(request: NextRequest) {

  const walletClient = createWalletClient({
    chain: hardhat,
    transport: http('http://localhost:8545'),
  });

  const account = privateKeyToAccount(privateKey);

  const txn = await walletClient.writeContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'storeValue',
    args: ["xyz"],
    nonce: 2,
    account,
  });

  console.log({txn});

  return new NextResponse(
    JSON.stringify({txn}),
    {headers: {'Content-Type': 'application/json'}}
  );
}
