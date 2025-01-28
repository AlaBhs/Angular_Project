import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalsListComponent } from './finals-list.component';

describe('FinalsListComponent', () => {
  let component: FinalsListComponent;
  let fixture: ComponentFixture<FinalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
