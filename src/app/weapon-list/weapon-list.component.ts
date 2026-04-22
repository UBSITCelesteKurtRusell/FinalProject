import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weapon-list',
  imports: [CommonModule],
  templateUrl: './weapon-list.component.html',
  styleUrl: './weapon-list.component.css',
})
export class WeaponList {
  weapons: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private http: HttpClient) {
    this.http.get<any[]>('https://api.api-onepiece.com/v2/weapons/en').subscribe(
      response => {
        this.weapons = response;
        this.loading = false;
      },
      error => {
        console.error('Error:', error);
        this.error = 'Failed to load weapons.';
        this.loading = false;
      }
    );
  }
}
