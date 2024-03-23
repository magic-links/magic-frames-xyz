"use server";

import { StringToBoolean } from "class-variance-authority/types";

type Spell = {
  id: number;
  name: string;
  content: any;
}

type SpellDaoProposal = {
  contract_address: string;
  proposal_id: string;
  chain_d: number;
}

export const getSpellById = async (id: number) => {
  return {
    id: 1,
    name: 'Fireball',
    content: {
      contract_address: "",
      proposal_id: "",
      chain_id: 10
    }
  }
}

export const storeSpell = async (spell: Spell) => {
  return {
    id: 1,
    name: 'Fireball',
    content: {
      contract_address: "",
      proposal_id: "",
      chain_id: 10
    }
  }
}
