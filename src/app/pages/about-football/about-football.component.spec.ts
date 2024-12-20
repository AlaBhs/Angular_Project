import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFootballComponent } from './about-football.component';

describe('AboutFootballComponent', () => {
  let component: AboutFootballComponent;
  let fixture: ComponentFixture<AboutFootballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutFootballComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutFootballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
