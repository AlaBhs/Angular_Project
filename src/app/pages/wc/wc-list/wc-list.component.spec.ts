import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WcListComponent } from './wc-list.component';

describe('WcListComponent', () => {
  let component: WcListComponent;
  let fixture: ComponentFixture<WcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WcListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
