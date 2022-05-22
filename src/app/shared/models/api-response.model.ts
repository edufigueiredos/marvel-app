import { Character } from "./character.model";

export interface APIResponse<T> {
  code: number;
  status: string;
  data: APIData<T>;
}

export interface APIData<T> {
  count: number;
  limit: number;
  offset: number;
  results: T[];
  total: number;
}
