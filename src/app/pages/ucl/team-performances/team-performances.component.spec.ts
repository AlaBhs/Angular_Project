import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPerformancesComponent } from './team-performances.component';

describe('TeamPerformancesComponent', () => {
  let component: TeamPerformancesComponent;
  let fixture: ComponentFixture<TeamPerformancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamPerformancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamPerformancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
