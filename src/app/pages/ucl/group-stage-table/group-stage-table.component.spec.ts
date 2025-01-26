import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStageTableComponent } from './group-stage-table.component';

describe('GroupStageTableComponent', () => {
  let component: GroupStageTableComponent;
  let fixture: ComponentFixture<GroupStageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupStageTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupStageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
