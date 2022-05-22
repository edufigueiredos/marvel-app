import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CharacterState } from "./character-state.model";
import { characterStateKey } from "./character.reducers";

export const characterSelector = createFeatureSelector<CharacterState>(characterStateKey);

export const allCharactersSelector = createSelector(
  characterSelector,
  (state) => state.characters
)

export const offsetSelector = createSelector(
  characterSelector,
  (state) => state.offset
)

export const limitSelector = createSelector(
  characterSelector,
  (state) => state.limit
)
