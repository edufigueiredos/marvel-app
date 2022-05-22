import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersService } from './../../shared/services/characters/characters.service';
import { CardModule } from './../../shared/components/card/card.module';


@NgModule({
  declarations: [
    CharactersListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CharactersRoutingModule,
    CardModule
  ],
  providers: [CharactersService]
})
export class CharactersModule { }
