import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalsDetailsComponent } from './finals-details.component';

describe('FinalsDetailsComponent', () => {
  let component: FinalsDetailsComponent;
  let fixture: ComponentFixture<FinalsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
