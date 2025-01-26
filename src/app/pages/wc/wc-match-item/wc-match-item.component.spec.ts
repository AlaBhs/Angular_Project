import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WcMatchItemComponent } from './wc-match-item.component';

describe('WcMatchItemComponent', () => {
  let component: WcMatchItemComponent;
  let fixture: ComponentFixture<WcMatchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WcMatchItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WcMatchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
