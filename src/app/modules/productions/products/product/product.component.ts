import { ProductCreationRequest, ProductResponse, Category } from '@shared/interfaces';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService, TitleService } from '@core/services';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  //readonly categories = signal<Category[]>([]);
  categories$ = toSignal(this.productService.getActivesCategories());

  selectedFiles: File[] = [];
  selectedCategory: Category | null = null;
  dropdownOpen = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly titleService: TitleService,
  ) {
    this.titleService.setTitle('Nuevo Producto');
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.dropdownOpen = false;
  }

  getSelectedCategoryName() {
    if (!this.selectedCategory) {
      return 'Seleccione una categoría';
    }
    let selectedName = 'Seleccione una categoría';
    const categories = this.categories$() || [];
    for (const category of categories) {
      if (category.id === this.selectedCategory.id) {
        selectedName = this.selectedCategory.name;
        break;
      } else {
        for (const subcategory of category.childrens) {
          if (subcategory.id === this.selectedCategory.id) {
            selectedName = this.selectedCategory.name;
            break;
          }
        }
      }
    }
    return selectedName;
  }

  addCategory(selectedCategory: Category | null) {
    if (selectedCategory !== null) {
      console.log('Adding category:', selectedCategory);
    }
  }

  removeCategory(selectedCategory: Category | null) {
    if (selectedCategory !== null) {
      console.log('Removing category:', selectedCategory);
    }
  }

  productForm = this.formBuilder.group({
    sku: ['', Validators.required],
    barcode: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    cost: [0, Validators.required],
    weight_kg: [0, Validators.required],
    categories: this.formBuilder.array([]),
  });

  onFileChange(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.selectedFiles = Array.from(element.files);
    }
  }

  onSubmit() {
    const formValue = this.productForm.value;
    const product: ProductCreationRequest = {
      sku: formValue.sku!,
      barcode: formValue.barcode!,
      name: formValue.name!,
      description: formValue.description!,
      price: formValue.price!,
      cost: formValue.cost!,
      weight_kg: formValue.weight_kg!,
      categories: this.selectedCategory ? [this.selectedCategory] : [],
    };

    //   // Guarda el producto
    //   // this.productService.createProduct(product).subscribe((savedProduct: ProductResponse) => {
    //     // Una vez que el producto se ha guardado con éxito, guarda las imágenes
    //     if (this.selectedFiles && this.selectedFiles.length > 0) {
    //       for (const file of this.selectedFiles) {
    //         // Aquí se crea el objeto createImageDto, necesitaría más detalles sobre cómo se crea este objeto
    //         const createImageDto = {};
    //         this.productService.uploadImage(savedProduct.id, file, createImageDto).subscribe(() => {
    //           // Maneja la respuesta de la carga de la imagen aquí
    //         });
    //       }
    //     }
    //   });
    // }
  }
}
