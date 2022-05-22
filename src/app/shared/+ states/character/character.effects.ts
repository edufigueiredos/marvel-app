import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, switchMap, tap } from "rxjs";

import { errorAction, loadCharacters, setCharactersOnState, successAction } from './character.actions';
import { CharactersService } from "../../services/characters/characters.service";
import { APIResponse } from "../../models/api-response.model";
import { Character } from "../../models/character.model";

@Injectable()
export class CharacterEffect {

  loadCharacters = createEffect(
    () => this.actions$.pipe(
      ofType(loadCharacters),
      switchMap(({ offset, limit }) => this.characterService.getAll(offset, limit).pipe(
        tap((apiResponse: APIResponse<Character>) => this.store.dispatch(setCharactersOnState({ characters: apiResponse.data.results })))
      )),
      map(() => successAction()),
      catchError(() => [errorAction()])
    )
  )

  constructor(
    private actions$: Actions,
    private characterService: CharactersService,
    private store: Store
  ) { }
}
