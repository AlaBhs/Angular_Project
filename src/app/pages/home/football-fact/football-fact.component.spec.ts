import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballFactComponent } from './football-fact.component';

describe('FootballFactComponent', () => {
  let component: FootballFactComponent;
  let fixture: ComponentFixture<FootballFactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballFactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
