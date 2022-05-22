import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";

import { limitSelector, offsetSelector } from './character.selectors';
import { errorAction, loadCharacters, setCharactersOnState, successAction, setOffset } from './character.actions';

import { APIResponse } from "../../models/api-response.model";
import { Character } from "../../models/character.model";
import { CharactersService } from "../../services/characters/characters.service";

@Injectable()
export class CharacterEffect {

  loadCharacters$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadCharacters),
      withLatestFrom(this.store.select(offsetSelector), this.store.select(limitSelector)),
      switchMap(([action, offset, limit]) => this.characterService.getAll(offset, limit).pipe(
        tap((apiResponse: APIResponse<Character>) => {
          this.store.dispatch(setCharactersOnState({ characters: apiResponse.data.results }))
          this.store.dispatch(setOffset({ offset: offset + apiResponse.data.results.length }))
        })
      )),
      map(() => successAction()),
      catchError(() => [errorAction()])
    )
  )

  // loadMoreCharacters$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(loadMoreCharacters),
  //     withLatestFrom(this.store.select(offsetSelector), this.store.select(limitSelector)),
  //     switchMap(([action, offset, limit]) => {
  //       return of([]).pipe(tap(() => console.log(action)))
  //     }),
  //     map(() => successAction()),
  //     catchError(() => [errorAction()])
  //   )
  // )

  constructor(
    private actions$: Actions,
    private characterService: CharactersService,
    private store: Store
  ) { }
}
