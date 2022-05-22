import { Character } from "../../models/character.model";

export interface CharacterState {
  characters: Character[];
  offset: number,
  limit: number
}
