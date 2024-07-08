import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualProductionsComponent } from './manual-productions.component';

describe('ManualProductionsComponent', () => {
  let component: ManualProductionsComponent;
  let fixture: ComponentFixture<ManualProductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualProductionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualProductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
