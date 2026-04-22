import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fruit-list',
  imports: [CommonModule],
  templateUrl: './fruit-list.component.html',
  styleUrl: './fruit-list.component.css',
})
export class FruitList {
  fruits: any[] = [];
  loading: boolean = true;
  error: string = '';
  filter: string = 'All';
  types: string[] = ['All', 'Paramecia', 'Zoan', 'Logia'];

  constructor(private http: HttpClient) {
    this.http.get<any[]>('https://api.api-onepiece.com/v2/fruits/en').subscribe(
      response => {
        this.fruits = response;
        this.loading = false;
      },
      error => {
        console.error('Error:', error);
        this.error = 'Failed to load devil fruits.';
        this.loading = false;
      }
    );
  }

  get filtered(): any[] {
    if (this.filter === 'All') return this.fruits;
    return this.fruits.filter(f => f.type === this.filter);
  }

  setFilter(type: string): void {
    this.filter = type;
  }
}

