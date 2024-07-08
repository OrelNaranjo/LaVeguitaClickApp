import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualStaffsComponent } from './manual-staffs.component';

describe('ManualStaffsComponent', () => {
  let component: ManualStaffsComponent;
  let fixture: ComponentFixture<ManualStaffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualStaffsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualStaffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
