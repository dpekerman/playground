import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../core/models/playground.models';
import { PlaygroundApiService } from '../../core/services/playground-api.service';

export interface ProductDialogData {
  product?: Product;
}

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class ProductDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(PlaygroundApiService);
  private readonly dialogRef = inject(MatDialogRef<ProductDialogComponent>);
  protected readonly data = inject<ProductDialogData>(MAT_DIALOG_DATA);

  protected readonly saving = signal(false);

  protected readonly categories = [
    'Software',
    'Infrastructure',
    'AI/ML',
    'Productivity',
    'Security',
    'DevOps',
    'Other',
  ];

  protected readonly form = this.fb.nonNullable.group({
    name: [this.data.product?.name ?? '', [Validators.required, Validators.maxLength(200)]],
    description: [this.data.product?.description ?? '', Validators.maxLength(1000)],
    price: [this.data.product?.price ?? 0, [Validators.required, Validators.min(0)]],
    category: [this.data.product?.category ?? '', Validators.required],
    isActive: [this.data.product?.isActive ?? true],
    imageUrl: [this.data.product?.imageUrl ?? ''],
  });

  protected get isEditMode(): boolean {
    return !!this.data.product;
  }

  protected save(): void {
    if (this.form.invalid) return;

    this.saving.set(true);
    const value = this.form.getRawValue();
    const payload = {
      ...value,
      imageUrl: value.imageUrl || null,
    };

    if (this.isEditMode) {
      this.api.updateProduct({ ...this.data.product!, ...payload }).subscribe({
        next: () => this.dialogRef.close({ ...this.data.product!, ...payload }),
        error: () => this.saving.set(false),
      });
    } else {
      this.api.createProduct(payload).subscribe({
        next: (result) => this.dialogRef.close(result),
        error: () => this.saving.set(false),
      });
    }
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
