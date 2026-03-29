namespace Playground.Api.Models;

public class Announcement
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public required string Type { get; set; } // "info" | "warning" | "success"
    public DateTime PublishedAt { get; set; }
    public bool IsActive { get; set; }
}
