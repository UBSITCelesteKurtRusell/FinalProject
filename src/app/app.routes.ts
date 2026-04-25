import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApiCharacter } from './api-character/api-character.component';
import { CharacterForm } from './character-form/character-form.component';
import { FruitList } from './fruit-list/fruit-list.component';

export const routes: Routes = [
  { path: '',                component: HomeComponent },
  { path: 'api-characters',  component: ApiCharacter },
  { path: 'my-characters',   component: CharacterForm },
  { path: 'fruits',          component: FruitList },
];