import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BountyLeaderboardsComponent } from './bounty-leaderboards.component';

describe('BountyLeaderboardsComponent', () => {
  let component: BountyLeaderboardsComponent;
  let fixture: ComponentFixture<BountyLeaderboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BountyLeaderboardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BountyLeaderboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
