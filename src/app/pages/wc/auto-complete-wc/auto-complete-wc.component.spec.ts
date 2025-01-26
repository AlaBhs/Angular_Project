import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteWcComponent } from './auto-complete-wc.component';

describe('AutoCompleteWcComponent', () => {
  let component: AutoCompleteWcComponent;
  let fixture: ComponentFixture<AutoCompleteWcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoCompleteWcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoCompleteWcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
