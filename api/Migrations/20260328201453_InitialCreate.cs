using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Playground.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Announcements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PublishedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Announcements", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TeamMembers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Role = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Department = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    AvatarUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JoinedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamMembers", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Announcements",
                columns: new[] { "Id", "Content", "IsActive", "PublishedAt", "Title", "Type" },
                values: new object[,]
                {
                    { 1, "We are excited to announce the release of Playground Platform v2.0, featuring enhanced performance and a redesigned interface.", true, new DateTime(2026, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Platform v2.0 Launched", "success" },
                    { 2, "Infrastructure maintenance scheduled for Sunday April 5, 2026 from 02:00 to 04:00 UTC. Expect brief service interruptions.", true, new DateTime(2026, 3, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), "Scheduled Maintenance Window", "warning" },
                    { 3, "Three new AI-powered modules are now available in beta: Smart Search, Auto-Tagging, and Predictive Analytics.", true, new DateTime(2026, 3, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "New AI Features Available", "info" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "CreatedAt", "Description", "ImageUrl", "IsActive", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Software", new DateTime(2025, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Real-time analytics and reporting platform with interactive charts and KPI tracking.", "https://picsum.photos/seed/prod1/400/300", true, "Analytics Dashboard", 299.99m },
                    { 2, "Infrastructure", new DateTime(2025, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Enterprise-grade cloud storage with 10TB capacity, versioning, and team collaboration.", "https://picsum.photos/seed/prod2/400/300", true, "Cloud Storage Pro", 149.99m },
                    { 3, "AI/ML", new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Intelligent document extraction and classification powered by machine learning.", "https://picsum.photos/seed/prod3/400/300", true, "AI Document Processor", 499.99m },
                    { 4, "Productivity", new DateTime(2025, 3, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "All-in-one workspace for teams — chat, video, tasks, and file sharing.", "https://picsum.photos/seed/prod4/400/300", true, "Team Collaboration Suite", 79.99m },
                    { 5, "Security", new DateTime(2025, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Automated vulnerability scanning and compliance reporting for web applications.", "https://picsum.photos/seed/prod5/400/300", true, "Security Scanner", 199.99m },
                    { 6, "DevOps", new DateTime(2025, 4, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), "CI/CD automation platform with built-in container orchestration and deployment.", "https://picsum.photos/seed/prod6/400/300", false, "DevOps Pipeline", 349.99m }
                });

            migrationBuilder.InsertData(
                table: "TeamMembers",
                columns: new[] { "Id", "AvatarUrl", "Department", "Email", "IsActive", "JoinedAt", "Name", "Role" },
                values: new object[,]
                {
                    { 1, "https://i.pravatar.cc/150?img=1", "Engineering", "sarah.johnson@playground.dev", true, new DateTime(2022, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sarah Johnson", "Chief Technology Officer" },
                    { 2, "https://i.pravatar.cc/150?img=3", "Engineering", "marcus.williams@playground.dev", true, new DateTime(2022, 9, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Marcus Williams", "Lead Backend Developer" },
                    { 3, "https://i.pravatar.cc/150?img=5", "Design", "priya.patel@playground.dev", true, new DateTime(2023, 1, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Priya Patel", "UX/UI Designer" },
                    { 4, "https://i.pravatar.cc/150?img=7", "AI/ML", "david.chen@playground.dev", true, new DateTime(2023, 3, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "David Chen", "Data Scientist" },
                    { 5, "https://i.pravatar.cc/150?img=9", "Product", "emily.rodriguez@playground.dev", true, new DateTime(2023, 6, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Emily Rodriguez", "Product Manager" },
                    { 6, "https://i.pravatar.cc/150?img=11", "Engineering", "james.thompson@playground.dev", true, new DateTime(2023, 8, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "James Thompson", "DevOps Engineer" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Announcements");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "TeamMembers");
        }
    }
}
