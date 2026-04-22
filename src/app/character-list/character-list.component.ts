import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CharacterCard } from '../character-card/character-card.component';

@Component({
  selector: 'app-character-list',
  imports: [CommonModule, RouterModule, CharacterCard],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css',
})
export class CharacterListComponent {
  characters: any[] = [];
  loading: boolean = true;
  error: string = '';
  filter: string = 'All';

  constructor(private http: HttpClient) {
    this.http.get<any[]>('https://api.api-onepiece.com/v2/characters/en').subscribe(
      response => {
        this.characters = response.slice(0, 10);
        this.loading = false;
      },
      error => {
        console.error('Error:', error);
        this.error = 'Failed to load characters.';
        this.loading = false;
      }
    );
  }

  get filtered(): any[] {
    if (this.filter === 'All') return this.characters;
    return this.characters.filter(c => c.affiliation === this.filter);
  }

  setFilter(f: string): void {
    this.filter = f;
  }

  onDelete(id: string): void {
    if (!confirm('Remove this character?')) return;
    this.http.delete(`http://localhost:3000/api/onepiece/${id}`).subscribe(
      () => {
        this.characters = this.characters.filter(c => c._id !== id);
      },
      error => console.error('Error:', error)
    );
  }
}

