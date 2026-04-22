import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css',
})
export class CharacterCard {
  @Input() character: any;
  @Output() delete = new EventEmitter<string>();

  onDelete(): void {
    this.delete.emit(this.character._id);
  }
}
