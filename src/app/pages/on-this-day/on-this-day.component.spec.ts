import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnThisDayComponent } from './on-this-day.component';

describe('OnThisDayComponent', () => {
  let component: OnThisDayComponent;
  let fixture: ComponentFixture<OnThisDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnThisDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnThisDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
