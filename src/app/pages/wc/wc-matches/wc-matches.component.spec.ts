import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WcMatchesComponent } from './wc-matches.component';

describe('WcMatchesComponent', () => {
  let component: WcMatchesComponent;
  let fixture: ComponentFixture<WcMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WcMatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WcMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
