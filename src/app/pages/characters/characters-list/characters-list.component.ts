import { Character } from './../../../shared/models/character.model';
import { APIResponse } from './../../../shared/models/api-response.model';
import { Component, OnInit } from '@angular/core';
import { CharactersService } from './../../../shared/services/characters/characters.service';
import { debounceTime, filter, map, Observable, startWith, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  public characterName = new FormControl();
  public character$?: Observable<APIResponse<Character>>;

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.characterName.valueChanges
      .pipe(
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

    // this.character$ = this.charactersService.getAll();
  }

}
