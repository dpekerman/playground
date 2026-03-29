import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Announcement } from '../../core/models/playground.models';
import { PlaygroundApiService } from '../../core/services/playground-api.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { AnnouncementDialogComponent } from './announcement-dialog.component';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
})
export class AnnouncementsComponent implements OnInit {
  private readonly api = inject(PlaygroundApiService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly announcements = signal<Announcement[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.getAnnouncements().subscribe({
      next: (data) => {
        this.announcements.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load announcements.');
        this.loading.set(false);
      },
    });
  }

  protected getAnnouncementIcon(type: string): string {
    const icons: Record<string, string> = {
      success: 'check_circle',
      warning: 'warning',
      info: 'info',
    };
    return icons[type] ?? 'info';
  }

  protected openAnnouncementDialog(announcement?: Announcement): void {
    const ref = this.dialog.open(AnnouncementDialogComponent, {
      width: '560px',
      data: { announcement },
    });
    ref.afterClosed().subscribe((result: Announcement | undefined) => {
      if (!result) return;
      if (announcement) {
        this.announcements.update((list) => list.map((a) => (a.id === result.id ? result : a)));
        this.snackBar.open('Announcement updated', 'Close', { duration: 3000 });
      } else {
        this.announcements.update((list) => [result, ...list]);
        this.snackBar.open('Announcement published', 'Close', { duration: 3000 });
      }
    });
  }

  protected confirmDeleteAnnouncement(announcement: Announcement): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Delete Announcement',
        message: `Are you sure you want to delete "${announcement.title}"?`,
        confirmLabel: 'Delete',
      },
    });
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;
      this.api.deleteAnnouncement(announcement.id).subscribe({
        next: () => {
          this.announcements.update((list) => list.filter((a) => a.id !== announcement.id));
          this.snackBar.open('Announcement deleted', 'Close', { duration: 3000 });
        },
        error: () =>
          this.snackBar.open('Failed to delete announcement', 'Close', { duration: 3000 }),
      });
    });
  }

  protected refresh(): void {
    this.loadData();
  }
}
