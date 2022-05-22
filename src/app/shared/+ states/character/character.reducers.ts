import { loadCharacters, setCharactersOnState } from './character.actions';
import { createReducer, on } from '@ngrx/store';
import { CharacterState } from './character-state.model';

export const initialState: CharacterState = {
  characters: []
}

export const characterStateKey = 'characterState';

export const characterReducer = createReducer(
  initialState,
  on(setCharactersOnState, (state, { characters }) => {
    state = {
      ...state,
      characters
    }
    return state
  })
)
