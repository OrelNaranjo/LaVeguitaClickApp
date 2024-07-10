import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectFieldComponent } from './select-field.component';

describe('SelectFieldComponent', () => {
  interface SelectOption {
    id: number;
    name: string;
  }

  let component: SelectFieldComponent<SelectOption>;
  let fixture: ComponentFixture<SelectFieldComponent<SelectOption>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
