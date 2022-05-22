import { createAction, props } from "@ngrx/store";

import { Character } from "../../models/character.model";

export const loadCharacters = createAction('[Personagem][Store] Carregar personagens');

export const setOffset = createAction(
  '[Personagem][Store] Mudar o offset das requisições',
  props<{ offset: number }>()
);
export const setLimit = createAction(
  '[Personagem][Store] Mudar o limit das requisições',
  props<{ limit: number }>()
);

export const setCharactersOnState = createAction(
  '[Personagem][Store] Adiciona personagens carregados na lista de personagens',
  props<{ characters: Character[] }>()
);

export const successAction = createAction('[Personagem] Sucesso');
export const errorAction = createAction('[Personagem] Erro');
