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
import { TeamMember } from '../../core/models/playground.models';
import { PlaygroundApiService } from '../../core/services/playground-api.service';

export interface TeamMemberDialogData {
  member?: TeamMember;
}

@Component({
  selector: 'app-team-member-dialog',
  templateUrl: './team-member-dialog.component.html',
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
export class TeamMemberDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(PlaygroundApiService);
  private readonly dialogRef = inject(MatDialogRef<TeamMemberDialogComponent>);
  protected readonly data = inject<TeamMemberDialogData>(MAT_DIALOG_DATA);

  protected readonly saving = signal(false);

  protected readonly departments = [
    'Engineering',
    'Design',
    'AI/ML',
    'Product',
    'Marketing',
    'Operations',
    'Other',
  ];

  protected readonly form = this.fb.nonNullable.group({
    name: [this.data.member?.name ?? '', [Validators.required, Validators.maxLength(200)]],
    role: [this.data.member?.role ?? '', Validators.maxLength(200)],
    department: [this.data.member?.department ?? '', Validators.maxLength(100)],
    email: [this.data.member?.email ?? '', [Validators.maxLength(200), Validators.email]],
    avatarUrl: [this.data.member?.avatarUrl ?? ''],
    isActive: [this.data.member?.isActive ?? true],
  });

  protected get isEditMode(): boolean {
    return !!this.data.member;
  }

  protected save(): void {
    if (this.form.invalid) return;

    this.saving.set(true);
    const value = this.form.getRawValue();
    const payload = {
      ...value,
      avatarUrl: value.avatarUrl || null,
    };

    if (this.isEditMode) {
      this.api.updateTeamMember({ ...this.data.member!, ...payload }).subscribe({
        next: () => this.dialogRef.close({ ...this.data.member!, ...payload }),
        error: () => this.saving.set(false),
      });
    } else {
      this.api.createTeamMember(payload).subscribe({
        next: (result) => this.dialogRef.close(result),
        error: () => this.saving.set(false),
      });
    }
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
