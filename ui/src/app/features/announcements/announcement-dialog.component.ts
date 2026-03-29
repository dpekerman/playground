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
import { Announcement } from '../../core/models/playground.models';
import { PlaygroundApiService } from '../../core/services/playground-api.service';

export interface AnnouncementDialogData {
  announcement?: Announcement;
}

@Component({
  selector: 'app-announcement-dialog',
  templateUrl: './announcement-dialog.component.html',
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
export class AnnouncementDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(PlaygroundApiService);
  private readonly dialogRef = inject(MatDialogRef<AnnouncementDialogComponent>);
  protected readonly data = inject<AnnouncementDialogData>(MAT_DIALOG_DATA);

  protected readonly saving = signal(false);

  protected readonly types: { value: Announcement['type']; label: string; icon: string }[] = [
    { value: 'info', label: 'Info', icon: 'info' },
    { value: 'success', label: 'Success', icon: 'check_circle' },
    { value: 'warning', label: 'Warning', icon: 'warning' },
  ];

  protected readonly form = this.fb.nonNullable.group({
    title: [this.data.announcement?.title ?? '', [Validators.required, Validators.maxLength(300)]],
    content: [this.data.announcement?.content ?? ''],
    type: [this.data.announcement?.type ?? ('info' as Announcement['type']), Validators.required],
    isActive: [this.data.announcement?.isActive ?? true],
  });

  protected get isEditMode(): boolean {
    return !!this.data.announcement;
  }

  protected save(): void {
    if (this.form.invalid) return;

    this.saving.set(true);
    const payload = this.form.getRawValue();

    if (this.isEditMode) {
      this.api.updateAnnouncement({ ...this.data.announcement!, ...payload }).subscribe({
        next: () => this.dialogRef.close({ ...this.data.announcement!, ...payload }),
        error: () => this.saving.set(false),
      });
    } else {
      this.api.createAnnouncement(payload).subscribe({
        next: (result) => this.dialogRef.close(result),
        error: () => this.saving.set(false),
      });
    }
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
