import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualLogisticsComponent } from './manual-logistics.component';

describe('ManualLogisticsComponent', () => {
  let component: ManualLogisticsComponent;
  let fixture: ComponentFixture<ManualLogisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualLogisticsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManualLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
