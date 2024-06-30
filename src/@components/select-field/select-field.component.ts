import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true,
    },
  ],
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
})
export class SelectFieldComponent<T extends { id: number, name: string }> implements ControlValueAccessor {
  @Input() options: T[] = [];
  @Input() label = '';
  @Input() id = '';
  @Input() controlName = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Output() selectChange = new EventEmitter<T>();

  selectedValue!: T;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: T) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  writeValue(obj: T): void {
    this.selectedValue = obj;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = +selectElement.value;
    const selectedOption = this.options.find((option) => option.id === value);
    if (selectedOption) {
      this.selectedValue = selectedOption;
      this.selectChange.emit(this.selectedValue);
      this.onChange(this.selectedValue);
    }
  }
}
