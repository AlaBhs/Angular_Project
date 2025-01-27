import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalsItemComponent } from './finals-item.component';

describe('FinalsItemComponent', () => {
  let component: FinalsItemComponent;
  let fixture: ComponentFixture<FinalsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalsItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
