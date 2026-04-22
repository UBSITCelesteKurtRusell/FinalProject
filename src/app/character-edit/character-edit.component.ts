import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './character-edit.component.html',
  styleUrl: './character-edit.component.css',
})
export class CharacterEdit {
  loading: boolean = true;
  submitting: boolean = false;
  error: string = '';
  editId: string = '';

  races    = ['Human','Fishman','Mink','Giant','Dwarf','Skypiean','Lunarian','Cyborg','Other'];
  weapons  = ['None','Fists','Katana','Three Swords (Santoryu)','Saber','Nodachi','Pistol','Rifle','Bazooka','Staff','Spear','Trident','Bow','Custom Weapon'];
  fruits   = ['None','Gomu Gomu no Mi','Mera Mera no Mi','Hie Hie no Mi','Gura Gura no Mi','Ope Ope no Mi','Magu Magu no Mi','Yami Yami no Mi','Pika Pika no Mi','Hana Hana no Mi','Doku Doku no Mi','Custom Fruit'];
  roles    = ['Captain','First Mate','Swordsman','Navigator','Sniper','Cook','Doctor','Archaeologist','Shipwright','Musician','Helmsman','Commander','Admiral','Vice Admiral','Other'];

  form: any = {
    name:       '',
    race:       'Human',
    age:        18,
    weapon:     'None',
    devilfruit: 'None',
    faction:    'Pirate',
    role:       'Captain',
    isCustom:   true,
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = id;
      this.http.get<any>(`http://localhost:3000/api/onepiece/${id}`).subscribe(
        response => {
          this.form = response;
          this.loading = false;
        },
        error => {
          console.error('Error:', error);
          this.error = 'Failed to load character.';
          this.loading = false;
        }
      );
    }
  }

  submit(): void {
    if (!this.form.name.trim()) { this.error = 'Name is required.'; return; }
    this.error = '';
    this.submitting = true;

    this.http.put<any>(`http://localhost:3000/api/onepiece/${this.editId}`, this.form).subscribe(
      () => this.router.navigate(['/characters']),
      error => {
        console.error('Error:', error);
        this.error = 'Failed to update character.';
        this.submitting = false;
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/characters']);
  }
}
