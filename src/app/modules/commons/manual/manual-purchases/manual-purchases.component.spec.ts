import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualPurchasesComponent } from './manual-purchases.component';

describe('ManualPurchasesComponent', () => {
  let component: ManualPurchasesComponent;
  let fixture: ComponentFixture<ManualPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualPurchasesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManualPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
