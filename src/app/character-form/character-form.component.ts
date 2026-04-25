import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-form',
  imports: [ReactiveFormsModule],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.css',
})
export class CharacterForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  characterService = inject(CharacterService);

  editingId = signal<string | null>(null);
  showModal = signal(false);

  characterForm = this.formBuilder.nonNullable.group({
    name:       ['', Validators.required],
    faction:    ['Pirate', Validators.required],
    devilfruit: [''],
    weapon:     [''],
    role:       ['', Validators.required],
    race:       ['', Validators.required],
    isCustom:   [true],
  });

  ngOnInit() {
    this.characterService.fetchCharacters();
  }

  openModal() {
    this.editingId.set(null);
    this.characterForm.reset({ faction: 'Pirate', isCustom: true });
    this.showModal.set(true);
  }

  openEdit(character: any) {
    this.editingId.set(character._id);
    this.characterForm.patchValue(character);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingId.set(null);
    this.characterForm.reset();
  }

  deleteCharacter(id: string) {
    if (confirm('Remove this character from the Grand Line?')) {
      this.characterService.deleteCharacter(id);
    }
  }

  onSubmit() {
    if (this.characterForm.invalid) return;
    const data = this.characterForm.getRawValue();
    const id = this.editingId();

    if (id) {
      this.characterService.updateCharacter(id, data).subscribe({
        next: () => {
          this.characterService.fetchCharacters();
          this.closeModal();
        },
        error: (err) => console.error('Update Failed', err)
      });
    } else {
      this.characterService.saveCharacter(data).subscribe({
        next: () => {
          this.characterService.fetchCharacters();
          this.closeModal();
        },
        error: (err) => console.error('Save Failed', err)
      });
    }
  }
}