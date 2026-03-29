import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Product } from '../../core/models/playground.models';
import { PlaygroundApiService } from '../../core/services/playground-api.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ProductDialogComponent } from './product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CurrencyPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
})
export class ProductsComponent implements OnInit {
  private readonly api = inject(PlaygroundApiService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly products = signal<Product[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load products.');
        this.loading.set(false);
      },
    });
  }

  protected openProductDialog(product?: Product): void {
    const ref = this.dialog.open(ProductDialogComponent, {
      width: '560px',
      data: { product },
    });
    ref.afterClosed().subscribe((result: Product | undefined) => {
      if (!result) return;
      if (product) {
        this.products.update((list) => list.map((p) => (p.id === result.id ? result : p)));
        this.snackBar.open('Product updated', 'Close', { duration: 3000 });
      } else {
        this.products.update((list) =>
          [...list, result].sort((a, b) => a.name.localeCompare(b.name)),
        );
        this.snackBar.open('Product added', 'Close', { duration: 3000 });
      }
    });
  }

  protected confirmDeleteProduct(product: Product): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Delete Product',
        message: `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
        confirmLabel: 'Delete',
      },
    });
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;
      this.api.deleteProduct(product.id).subscribe({
        next: () => {
          this.products.update((list) => list.filter((p) => p.id !== product.id));
          this.snackBar.open('Product deleted', 'Close', { duration: 3000 });
        },
        error: () => this.snackBar.open('Failed to delete product', 'Close', { duration: 3000 }),
      });
    });
  }

  protected refresh(): void {
    this.loadData();
  }
}
