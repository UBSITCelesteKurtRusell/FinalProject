import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/onepiece';

  characterList = signal<any[]>([]);

  fetchCharacters() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      data => this.characterList.set(data)
    );
  }

  saveCharacter(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateCharacter(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteCharacter(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`).subscribe(() =>
      this.characterList.update(list => list.filter(c => c._id !== id))
    );
  }
}