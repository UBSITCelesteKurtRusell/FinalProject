import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-api-character',
  imports: [],
  templateUrl: './api-character.component.html',
  styleUrl: './api-character.component.css',
})
export class ApiCharacter implements OnInit {
  private http = inject(HttpClient);

  allCharacters = signal<any[]>([]);
  loading = signal(true);
  error = signal('');
  search = signal('');
  filter = signal<'All' | 'Devil Fruit' | 'No Fruit'>('All');

  filtered = computed(() => {
    let list = this.allCharacters();
    const q = this.search().toLowerCase();

    if (q) {
      list = list.filter(c =>
        c.name?.toLowerCase().includes(q) ||
        c.job?.toLowerCase().includes(q) ||
        c.crew?.toLowerCase().includes(q)
      );
    }

    if (this.filter() === 'Devil Fruit') {
      list = list.filter(c => c.devil_fruit);
    } else if (this.filter() === 'No Fruit') {
      list = list.filter(c => !c.devil_fruit);
    }

    return list;
  });

  ngOnInit() {
    this.http.get<any[]>('https://api.api-onepiece.com/v2/characters/en').subscribe(
      response => {
        this.allCharacters.set(response);
        this.loading.set(false);
      },
      error => {
        console.error('Error:', error);
        this.error.set('Failed to load characters.');
        this.loading.set(false);
      }
    );
  }

  setFilter(f: 'All' | 'Devil Fruit' | 'No Fruit') {
    this.filter.set(f);
  }

  onSearch(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
  }
}