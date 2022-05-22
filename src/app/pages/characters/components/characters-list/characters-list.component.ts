import { Character } from '../../../../shared/models/character.model';
import { APIResponse } from '../../../../shared/models/api-response.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../../../../shared/services/characters/characters.service';
import { debounceTime, filter, map, Observable, startWith, Subject, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit, OnDestroy {

  public characterName = new FormControl();
  public character$?: Observable<APIResponse<Character>>;
  private unsubscribe$ = new Subject();

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.initSearchAndPage();
  }

  private initSearchAndPage() {
    this.characterName.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500),
        startWith(''),
        map((text: string) => text.trim()),
        tap((text: string) => {
          if (!!!text.length) {
            this.character$ = this.charactersService.getAll();
          }
        }),
        filter((text: string) => !!text && !!text.length),
      )
      .subscribe(name => this.character$ = this.charactersService.getByName(name));
  }

  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.next(true);
      this.unsubscribe$.unsubscribe();
    }
  }

}
