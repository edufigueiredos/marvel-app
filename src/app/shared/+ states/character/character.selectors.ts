import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CharacterState } from "./character-state.model";
import { characterStateKey } from "./character.reducers";

export const characterSelector = createFeatureSelector<CharacterState>(characterStateKey);

export const allCharactersSelector = createSelector(
  characterSelector,
  (state) => state.characters
)
