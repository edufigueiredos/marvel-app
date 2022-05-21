import { Character } from "./character.model";

export interface APIResponse {
  code: number;
  status: string;
  data: APIData;
}

export interface APIData {
  count: number;
  limit: number;
  offset: number;
  results: Character[];
  total: number;
}
