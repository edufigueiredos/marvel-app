import { createReducer, on } from '@ngrx/store';

import { setCharactersOnState, setOffset, setLimit } from './character.actions';
import { CharacterState } from './character-state.model';

export const initialState: CharacterState = {
  characters: [],
  offset: 0,
  limit: 20
}

export const characterStateKey = 'characterState';

export const characterReducer = createReducer(
  initialState,
  on(setOffset, (state, { offset }) => {
    return state = { ...state, offset }
  }),
  on(setLimit, (state, { limit }) => {
    return state = { ...state, limit }
  }),
  on(setCharactersOnState, (state, { characters }) => {
    if (state.characters.length) {
      characters.forEach(char => {
        if (!state.characters.includes(char)) {
          state = {
            ...state,
            characters: [
              ...state.characters,
              { ...char }
            ]
          }
        };
      })
      return state;
    }

    return state = { ...state, characters }
  }),
)
