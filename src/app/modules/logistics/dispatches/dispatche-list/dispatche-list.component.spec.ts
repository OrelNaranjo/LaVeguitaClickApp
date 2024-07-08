import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcheListComponent } from './dispatche-list.component';

describe('DispatcheListComponent', () => {
  let component: DispatcheListComponent;
  let fixture: ComponentFixture<DispatcheListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispatcheListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DispatcheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
