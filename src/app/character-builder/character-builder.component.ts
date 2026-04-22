import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-builder',
  imports: [CommonModule, FormsModule],
  templateUrl: './character-builder.component.html',
  styleUrl: './character-builder.component.css',
})
export class CharacterBuilder {
  step: number = 1;
  submitting: boolean = false;
  error: string = '';
  success: boolean = false;

  races    = ['Human','Fishman','Mink','Giant','Dwarf','Skypiean','Lunarian','Cyborg','Other'];
  weapons  = ['None','Fists','Katana','Three Swords (Santoryu)','Saber','Nodachi','Pistol','Rifle','Bazooka','Staff','Spear','Trident','Bow','Custom Weapon'];
  fruits   = ['None','Gomu Gomu no Mi','Mera Mera no Mi','Hie Hie no Mi','Gura Gura no Mi','Ope Ope no Mi','Magu Magu no Mi','Yami Yami no Mi','Pika Pika no Mi','Hana Hana no Mi','Doku Doku no Mi','Custom Fruit'];
  roles    = ['Captain','First Mate','Swordsman','Navigator','Sniper','Cook','Doctor','Archaeologist','Shipwright','Musician','Helmsman','Commander','Other'];

  character: any = {
    name:       '',
    faction:    '',
    race:       '',
    role:       '',
    age:        18,
    weapon:     'None',
    devilfruit: 'None',
    isCustom:   true,
  };

  constructor(private http: HttpClient, private router: Router) {}

  nextStep(): void {
    if (this.step === 1 && !this.character.faction) { this.error = 'Choose a faction.'; return; }
    if (this.step === 2 && !this.character.name.trim()) { this.error = 'Name is required.'; return; }
    this.error = '';
    this.step++;
  }

  prevStep(): void {
    this.error = '';
    this.step--;
  }

  selectFaction(faction: string): void {
    this.character.faction = faction;
    this.error = '';
  }

  submit(): void {
    this.submitting = true;
    this.http.post<any>('http://localhost:3000/api/onepiece', this.character).subscribe(
      () => {
        this.success = true;
        this.submitting = false;
      },
      error => {
        console.error('Error:', error);
        this.error = 'Failed to save character.';
        this.submitting = false;
      }
    );
  }

  goToRoster(): void {
    this.router.navigate(['/characters']);
  }
}
