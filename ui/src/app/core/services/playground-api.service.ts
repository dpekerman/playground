import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement, Product, TeamMember } from '../models/playground.models';

@Injectable({ providedIn: 'root' })
export class PlaygroundApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api';

  getProducts(activeOnly = false): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`, {
      params: activeOnly ? { activeOnly: 'true' } : {},
    });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  getTeamMembers(activeOnly = false): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.baseUrl}/teammembers`, {
      params: activeOnly ? { activeOnly: 'true' } : {},
    });
  }

  getAnnouncements(activeOnly = false): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.baseUrl}/announcements`, {
      params: activeOnly ? { activeOnly: 'true' } : {},
    });
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt'>): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, product);
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
  }

  createTeamMember(member: Omit<TeamMember, 'id' | 'joinedAt'>): Observable<TeamMember> {
    return this.http.post<TeamMember>(`${this.baseUrl}/teammembers`, member);
  }

  updateTeamMember(member: TeamMember): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/teammembers/${member.id}`, member);
  }

  deleteTeamMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/teammembers/${id}`);
  }

  createAnnouncement(
    announcement: Omit<Announcement, 'id' | 'publishedAt'>,
  ): Observable<Announcement> {
    return this.http.post<Announcement>(`${this.baseUrl}/announcements`, announcement);
  }

  updateAnnouncement(announcement: Announcement): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/announcements/${announcement.id}`, announcement);
  }

  deleteAnnouncement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/announcements/${id}`);
  }
}
