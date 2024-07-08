import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualToolsComponent } from './manual-tools.component';

describe('ManualToolsComponent', () => {
  let component: ManualToolsComponent;
  let fixture: ComponentFixture<ManualToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualToolsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManualToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
