import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailsViewComponent } from './club-details-view.component';

describe('ClubDetailsViewComponent', () => {
  let component: ClubDetailsViewComponent;
  let fixture: ComponentFixture<ClubDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubDetailsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
