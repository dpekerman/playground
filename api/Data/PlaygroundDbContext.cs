using Microsoft.EntityFrameworkCore;
using Playground.Api.Models;

namespace Playground.Api.Data;

public class PlaygroundDbContext(DbContextOptions<PlaygroundDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<TeamMember> TeamMembers => Set<TeamMember>();
    public DbSet<Announcement> Announcements => Set<Announcement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Description).HasMaxLength(1000);
            entity.Property(e => e.Category).HasMaxLength(100);
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
        });

        modelBuilder.Entity<TeamMember>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Role).HasMaxLength(200);
            entity.Property(e => e.Department).HasMaxLength(100);
            entity.Property(e => e.Email).HasMaxLength(200);
        });

        modelBuilder.Entity<Announcement>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).HasMaxLength(300).IsRequired();
            entity.Property(e => e.Type).HasMaxLength(50);
        });

        SeedData(modelBuilder);
    }

    private static void SeedData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Analytics Dashboard", Description = "Real-time analytics and reporting platform with interactive charts and KPI tracking.", Price = 299.99m, Category = "Software", IsActive = true, CreatedAt = new DateTime(2025, 1, 15), ImageUrl = "https://picsum.photos/seed/prod1/400/300" },
            new Product { Id = 2, Name = "Cloud Storage Pro", Description = "Enterprise-grade cloud storage with 10TB capacity, versioning, and team collaboration.", Price = 149.99m, Category = "Infrastructure", IsActive = true, CreatedAt = new DateTime(2025, 2, 20), ImageUrl = "https://picsum.photos/seed/prod2/400/300" },
            new Product { Id = 3, Name = "AI Document Processor", Description = "Intelligent document extraction and classification powered by machine learning.", Price = 499.99m, Category = "AI/ML", IsActive = true, CreatedAt = new DateTime(2025, 3, 5), ImageUrl = "https://picsum.photos/seed/prod3/400/300" },
            new Product { Id = 4, Name = "Team Collaboration Suite", Description = "All-in-one workspace for teams — chat, video, tasks, and file sharing.", Price = 79.99m, Category = "Productivity", IsActive = true, CreatedAt = new DateTime(2025, 3, 18), ImageUrl = "https://picsum.photos/seed/prod4/400/300" },
            new Product { Id = 5, Name = "Security Scanner", Description = "Automated vulnerability scanning and compliance reporting for web applications.", Price = 199.99m, Category = "Security", IsActive = true, CreatedAt = new DateTime(2025, 4, 1), ImageUrl = "https://picsum.photos/seed/prod5/400/300" },
            new Product { Id = 6, Name = "DevOps Pipeline", Description = "CI/CD automation platform with built-in container orchestration and deployment.",  Price = 349.99m, Category = "DevOps", IsActive = false, CreatedAt = new DateTime(2025, 4, 12), ImageUrl = "https://picsum.photos/seed/prod6/400/300" }
        );

        modelBuilder.Entity<TeamMember>().HasData(
            new TeamMember { Id = 1, Name = "Sarah Johnson", Role = "Chief Technology Officer", Department = "Engineering", Email = "sarah.johnson@playground.dev", AvatarUrl = "https://i.pravatar.cc/150?img=1", JoinedAt = new DateTime(2022, 6, 1), IsActive = true },
            new TeamMember { Id = 2, Name = "Marcus Williams", Role = "Lead Backend Developer", Department = "Engineering", Email = "marcus.williams@playground.dev", AvatarUrl = "https://i.pravatar.cc/150?img=3", JoinedAt = new DateTime(2022, 9, 15), IsActive = true },
            new TeamMember { Id = 3, Name = "Priya Patel", Role = "UX/UI Designer", Department = "Design", Email = "priya.patel@playground.dev", AvatarUrl = "https://i.pravatar.cc/150?img=5", JoinedAt = new DateTime(2023, 1, 10), IsActive = true },
            new TeamMember { Id = 4, Name = "David Chen", Role = "Data Scientist", Department = "AI/ML", Email = "david.chen@playground.dev", AvatarUrl = "https://i.pravatar.cc/150?img=7", JoinedAt = new DateTime(2023, 3, 22), IsActive = true },
            new TeamMember { Id = 5, Name = "Emily Rodriguez", Role = "Product Manager", Department = "Product", Email = "emily.rodriguez@playground.dev", AvatarUrl = "https://i.pravatar.cc/150?img=9", JoinedAt = new DateTime(2023, 6, 5), IsActive = true },
            new TeamMember { Id = 6, Name = "James Thompson", Role = "DevOps Engineer", Department = "Engineering", Email = "james.thompson@playground.dev", AvatarUrl = "https://i.pravatar.cc/150?img=11", JoinedAt = new DateTime(2023, 8, 14), IsActive = true }
        );

        modelBuilder.Entity<Announcement>().HasData(
            new Announcement { Id = 1, Title = "Platform v2.0 Launched", Content = "We are excited to announce the release of Playground Platform v2.0, featuring enhanced performance and a redesigned interface.", Type = "success", PublishedAt = new DateTime(2026, 3, 25), IsActive = true },
            new Announcement { Id = 2, Title = "Scheduled Maintenance Window", Content = "Infrastructure maintenance scheduled for Sunday April 5, 2026 from 02:00 to 04:00 UTC. Expect brief service interruptions.", Type = "warning", PublishedAt = new DateTime(2026, 3, 27), IsActive = true },
            new Announcement { Id = 3, Title = "New AI Features Available", Content = "Three new AI-powered modules are now available in beta: Smart Search, Auto-Tagging, and Predictive Analytics.", Type = "info", PublishedAt = new DateTime(2026, 3, 28), IsActive = true }
        );
    }
}
