import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bounty-leaderboard',
  imports: [],
  templateUrl: './bounty-leaderboards.component.html',
  styleUrl: './bounty-leaderboards.component.css',
})
export class BountyLeaderboard implements OnInit {
  private http = inject(HttpClient);

  allCharacters = signal<any[]>([]);
  loading = signal(true);
  error = signal('');

  
  private parseBounty(bounty: string): number {
    if (!bounty) return 0;
    return parseInt(bounty.replace(/\./g, '').replace(/,/g, ''), 10) || 0;
  }

  top10 = computed(() => {
    return [...this.allCharacters()]
      .filter(c => c.bounty)
      .sort((a, b) => this.parseBounty(b.bounty) - this.parseBounty(a.bounty))
      .slice(0, 10);
  });

  getRankMedal(index: number): string {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  }

  getRankClass(index: number): string {
    if (index === 0) return 'rank--gold';
    if (index === 1) return 'rank--silver';
    if (index === 2) return 'rank--bronze';
    return '';
  }

  ngOnInit() {
    this.http.get<any[]>('https://api.api-onepiece.com/v2/characters/en').subscribe(
      response => {
        this.allCharacters.set(response);
        this.loading.set(false);
      },
      error => {
        console.error('Error:', error);
        this.error.set('Failed to load leaderboard.');
        this.loading.set(false);
      }
    );
  }
}