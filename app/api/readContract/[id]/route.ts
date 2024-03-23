// TODO: this is an example of reading from the contract.
import { NextRequest, NextResponse } from 'next/server';
import { getSpellById } from '../../../storage.onchain';
 
// export async function GET(request: NextRequest, key: string) {
export async function GET(
  request: NextRequest,
  {params}: {params: {id: string}}
) {

  const spell = await getSpellById(params.id);

  return new NextResponse(
    spell.toString(),
    {headers: {'Content-Type': 'application/json'}}
  );
}
