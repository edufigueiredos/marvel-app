import { Component, OnInit } from '@angular/core';
import { CharactersService } from './../../../shared/services/characters/characters.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {

  }

}
