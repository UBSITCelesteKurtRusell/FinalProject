import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCharacterComponent } from './api-character.component';

describe('ApiCharacterComponent', () => {
  let component: ApiCharacterComponent;
  let fixture: ComponentFixture<ApiCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiCharacterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
