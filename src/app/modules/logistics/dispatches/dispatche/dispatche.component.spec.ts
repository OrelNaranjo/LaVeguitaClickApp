import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcheComponent } from './dispatche.component';

describe('DispatcheComponent', () => {
  let component: DispatcheComponent;
  let fixture: ComponentFixture<DispatcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispatcheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
