import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopScorersTableComponent } from './top-scorers-table.component';

describe('TopScorersTableComponent', () => {
  let component: TopScorersTableComponent;
  let fixture: ComponentFixture<TopScorersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopScorersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopScorersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
