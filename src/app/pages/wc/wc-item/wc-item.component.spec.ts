import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WcItemComponent } from './wc-item.component';

describe('WcItemComponent', () => {
  let component: WcItemComponent;
  let fixture: ComponentFixture<WcItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WcItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WcItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
