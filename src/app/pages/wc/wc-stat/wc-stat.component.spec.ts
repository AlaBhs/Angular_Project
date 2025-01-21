import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WcStatComponent } from './wc-stat.component';

describe('WcStatComponent', () => {
  let component: WcStatComponent;
  let fixture: ComponentFixture<WcStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WcStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WcStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
