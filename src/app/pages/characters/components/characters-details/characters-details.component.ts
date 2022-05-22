import { Character } from './../../../../shared/models/character.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CharactersService } from './../../../../shared/services/characters/characters.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.scss']
})
export class CharactersDetailsComponent implements OnInit {

  public character?: Character;

  constructor(
    private activatedRoute: ActivatedRoute,
    private characterService: CharactersService
  ) { }

  ngOnInit(): void {
    this.loadCharacter();
  }

  private loadCharacter() {
    const characterId = this.activatedRoute.snapshot.params['id'];
    if (characterId?.length) {
      this.characterService.getById(parseInt(characterId))
        .pipe(take(1))
        .subscribe(char => this.character = char.data.results[0])
    }
  }

}
