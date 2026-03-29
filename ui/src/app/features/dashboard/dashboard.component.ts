import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { Announcement, Product, TeamMember } from '../../core/models/playground.models';
import { PlaygroundApiService } from '../../core/services/playground-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class DashboardComponent implements OnInit {
  private readonly api = inject(PlaygroundApiService);

  protected readonly products = signal<Product[]>([]);
  protected readonly teamMembers = signal<TeamMember[]>([]);
  protected readonly announcements = signal<Announcement[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly activeProducts = computed(() => this.products().filter((p) => p.isActive));
  protected readonly activeTeam = computed(() => this.teamMembers().filter((m) => m.isActive));

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading.set(true);
    this.error.set(null);

    let loaded = 0;
    const checkDone = () => {
      loaded++;
      if (loaded === 3) this.loading.set(false);
    };

    this.api.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        checkDone();
      },
      error: () => {
        this.error.set('Failed to load data.');
        checkDone();
      },
    });

    this.api.getTeamMembers().subscribe({
      next: (data) => {
        this.teamMembers.set(data);
        checkDone();
      },
      error: () => {
        this.error.set('Failed to load data.');
        checkDone();
      },
    });

    this.api.getAnnouncements(true).subscribe({
      next: (data) => {
        this.announcements.set(data);
        checkDone();
      },
      error: () => {
        this.error.set('Failed to load data.');
        checkDone();
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

  protected refresh(): void {
    this.loadData();
  }
}
