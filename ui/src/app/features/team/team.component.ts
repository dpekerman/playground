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
import { TeamMember } from '../../core/models/playground.models';
import { PlaygroundApiService } from '../../core/services/playground-api.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { TeamMemberDialogComponent } from './team-member-dialog.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
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
export class TeamComponent implements OnInit {
  private readonly api = inject(PlaygroundApiService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly teamMembers = signal<TeamMember[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.getTeamMembers().subscribe({
      next: (data) => {
        this.teamMembers.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load team members.');
        this.loading.set(false);
      },
    });
  }

  protected openTeamMemberDialog(member?: TeamMember): void {
    const ref = this.dialog.open(TeamMemberDialogComponent, {
      width: '560px',
      data: { member },
    });
    ref.afterClosed().subscribe((result: TeamMember | undefined) => {
      if (!result) return;
      if (member) {
        this.teamMembers.update((list) => list.map((m) => (m.id === result.id ? result : m)));
        this.snackBar.open('Team member updated', 'Close', { duration: 3000 });
      } else {
        this.teamMembers.update((list) =>
          [...list, result].sort((a, b) => a.name.localeCompare(b.name)),
        );
        this.snackBar.open('Team member added', 'Close', { duration: 3000 });
      }
    });
  }

  protected confirmDeleteTeamMember(member: TeamMember): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Remove Team Member',
        message: `Are you sure you want to remove "${member.name}" from the team?`,
        confirmLabel: 'Remove',
      },
    });
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;
      this.api.deleteTeamMember(member.id).subscribe({
        next: () => {
          this.teamMembers.update((list) => list.filter((m) => m.id !== member.id));
          this.snackBar.open('Team member removed', 'Close', { duration: 3000 });
        },
        error: () =>
          this.snackBar.open('Failed to remove team member', 'Close', { duration: 3000 }),
      });
    });
  }

  protected refresh(): void {
    this.loadData();
  }
}
