"use server";

import { createWalletClient, publicActions, http, decodeEventLog } from 'viem'
import { hardhat } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts';

import abi from './abis/abi.json';

const privateKey = process.env.PRIVATE_KEY as `0x{string}`;
const contractABI = abi as any;
const contractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';


export type Spell = {
  id: number;
  name: string;
  description: string;
}

export const getSpellById = async (id: string): Promise<Spell> => {

  const walletClient = createWalletClient({
    chain: hardhat,
    transport: http('http://localhost:8545'),
  }).extend(publicActions);

  const result = await walletClient.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getValue',
    args: [id],
  });


  return result as Spell;
}

export const storeSpell = async (spell: Spell): Promise<string> => {

  const content = JSON.stringify(spell);

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

  console.log({event});

  let key = null;
  if (isEventWithArgs(event)) {
    key = event.args.key;
  } else {
    throw new Error('No event found');
  }

  return key;
}

function isEventWithArgs(obj: any): obj is { args: { key: string } } {
 return obj && obj.args && typeof obj.args.key === 'string';
}

