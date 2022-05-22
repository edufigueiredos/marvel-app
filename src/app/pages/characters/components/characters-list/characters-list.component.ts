import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, filter, map, Observable, startWith, Subject, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { CharacterState } from './../../../../shared/+ states/character/character-state.model';
import { Character } from '../../../../shared/models/character.model';
import { loadCharacters, setLimit } from './../../../../shared/+ states/character/character.actions';
import { allCharactersSelector } from './../../../../shared/+ states/character/character.selectors';

import { CharactersService } from '../../../../shared/services/characters/characters.service';
import { APIResponse } from '../../../../shared/models/api-response.model';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit, OnDestroy {

  public characterNameControl = new FormControl();
  public limitControl = new FormControl(20);
  public characters$?: Observable<Character[]> = this.store.select(allCharactersSelector);
  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<CharacterState>,
    private charactersService: CharactersService
  ) { }

  ngOnInit(): void {
    this.initSearchAndPage();
    this.getCharacters();
  }

  getCharacters() {
    this.store.dispatch(loadCharacters());
  }

  private initSearchAndPage() {
    this.characterNameControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500),
        startWith(''),
        map((text: string) => text.trim()),
        tap((text: string) => {
          if (!!!text.length) {
            this.characters$ = this.store.select(allCharactersSelector);
          }
        }),
        filter((text: string) => !!text && !!text.length),
      )
      .subscribe(name => this.characters$ = this.charactersService.getByName(name).pipe(
        map((apiResponse: APIResponse<Character>) => apiResponse.data.results)
      ));

    this.limitControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(limit => this.store.dispatch(setLimit({ limit: parseInt(limit) })));
  }

  loadMoreCharacters() {
    this.store.dispatch(loadCharacters())
  }

  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.next(true);
      this.unsubscribe$.unsubscribe();
    }
  }

}
