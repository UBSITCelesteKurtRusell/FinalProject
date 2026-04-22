import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
})
export class CharacterDetail {
  character: any = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`https://api.api-onepiece.com/v2/characters/en/${id}`).subscribe(
      response => {
        this.character = response;
        this.loading = false;
      },
      error => {
        console.error('Error:', error);
        this.error = 'Character not found.';
        this.loading = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/characters']);
  }
}
