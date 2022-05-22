import { createAction, props } from "@ngrx/store";
import { Character } from "../../models/character.model";

export const loadCharacters = createAction(
  '[Personagem][Store] Carregar personagens',
  props<{ offset: number, limit: number }>()
);

export const setCharactersOnState = createAction(
  '[Personagem][Store] Adiciona personagens carregados na lista de personagens',
  props<{ characters: Character[] }>()
)

export const successAction = createAction('[Personagem] Sucesso');
export const errorAction = createAction('[Personagem] Erro');
