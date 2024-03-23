// TODO: this is an example of writing to the contract.

import { createWalletClient, publicActions, http, decodeEventLog } from 'viem'
import { hardhat } from 'viem/chains'

import { NextRequest, NextResponse } from 'next/server';
import { privateKeyToAccount } from 'viem/accounts';

import abi from '../../abis/abi.json';

const privateKey = process.env.PRIVATE_KEY as string
const contractABI = abi as any;
const contractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
 
export async function POST(request: NextRequest) {

  const payload = await request.json();
  const content = payload.content;

  const walletClient = createWalletClient({
    chain: hardhat,
    transport: http('http://localhost:8545'),
  }).extend(publicActions);

  const account = privateKeyToAccount(privateKey);

  const { request: txnRequest } = await walletClient.simulateContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'storeValue',
    args: [content],
    account,
  });

  const hash = await walletClient.writeContract(txnRequest);

  const txn = await walletClient.waitForTransactionReceipt({hash});
  const log = txn.logs[0];

  if (!log) {
    throw new Error('No txn logs found');
  }

  const event = decodeEventLog({
    abi: contractABI,
    data: log?.data,
    topics: log?.topics
  });

  if (!event) {
    throw new Error('No event found');
  }

  let key = null;
  if (isEventWithArgs(event)) {
    key = event.args.key;
  } else {
    throw new Error('No event found');
  }

  return new NextResponse(
    JSON.stringify({key}),
    {headers: {'Content-Type': 'application/json'}}
  );
}

function isEventWithArgs(obj: any): obj is { args: { key: string } } {
 return obj && obj.args && typeof obj.args.key === 'string';
}
