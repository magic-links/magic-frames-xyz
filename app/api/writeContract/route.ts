// TODO: this is an example of writing to the contract.
import { NextRequest, NextResponse } from 'next/server';
import { storeSpell, Spell } from '../../storage.onchain';
 
export async function POST(request: NextRequest) {

  const payload = await request.json();

  const key = await storeSpell(payload as Spell);

  return new NextResponse(
    JSON.stringify({key}),
    {headers: {'Content-Type': 'application/json'}}
  );
}
