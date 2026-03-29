namespace Playground.Api.Models;

public class TeamMember
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Role { get; set; }
    public required string Department { get; set; }
    public required string Email { get; set; }
    public string? AvatarUrl { get; set; }
    public DateTime JoinedAt { get; set; }
    public bool IsActive { get; set; }
}
