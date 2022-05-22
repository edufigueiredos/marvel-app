import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { characterReducer, characterStateKey } from './../../shared/+ states/character/character.reducers';
import { CharacterEffect } from './../../shared/+ states/character/character.effects';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersService } from './../../shared/services/characters/characters.service';
import { CardModule } from './../../shared/components/card/card.module';
import { CharactersDetailsComponent } from './components/characters-details/characters-details.component';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    CharactersListComponent,
    CharactersDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CharactersRoutingModule,
    CardModule,
    StoreModule.forFeature(characterStateKey, characterReducer),
    EffectsModule.forFeature([CharacterEffect])
  ],
  providers: [CharactersService]
})
export class CharactersModule { }
