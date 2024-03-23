"use server";

type Spell = {
  id: number;
  name: string;
  description: string;
}

export const getSpellById = async (id: number) => {
  return {
    id: 1,
    name: 'Fireball',
    description: 'A ball of fire'
  }
}

export const storeSpell = async (spell: Spell) => {
  return {
    id: 1,
    name: 'Fireball',
    description: 'A ball of fire'
  }
}
