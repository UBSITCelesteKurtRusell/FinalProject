import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fruit-list',
  imports: [],
  templateUrl: './fruit-list.component.html',
  styleUrl: './fruit-list.component.css',
})
export class FruitList implements OnInit {
  private http = inject(HttpClient);

  allFruits = signal<any[]>([]);
  loading = signal(true);
  error = signal('');
  search = signal('');
  filter = signal('All Types');

  types = ['All Types', 'Paramecia', 'Logia', 'Zoan', 'Zoan Antique', 'Zoan Mythique', 'Smile', 'Clone'];

  filtered = computed(() => {
    let list = this.allFruits();
    const q = this.search().toLowerCase();

    if (q) {
      list = list.filter(f =>
        f.name?.toLowerCase().includes(q) ||
        f.roman_name?.toLowerCase().includes(q)
      );
    }

    if (this.filter() !== 'All Types') {
      list = list.filter(f => f.type === this.filter());
    }

    return list;
  });

  ngOnInit() {
    this.http.get<any[]>('https://api.api-onepiece.com/v2/fruits/en').subscribe(
      response => {
        this.allFruits.set(response);
        this.loading.set(false);
      },
      error => {
        console.error('Error:', error);
        this.error.set('Failed to load devil fruits.');
        this.loading.set(false);
      }
    );
  }

  setFilter(type: string) {
    this.filter.set(type);
  }

  onSearch(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
  }
}