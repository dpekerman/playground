using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Playground.Api.Data;
using Playground.Api.Models;

namespace Playground.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamMembersController(PlaygroundDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TeamMember>>> GetAll([FromQuery] bool? activeOnly)
    {
        var query = db.TeamMembers.AsQueryable();
        if (activeOnly == true)
            query = query.Where(m => m.IsActive);
        return Ok(await query.OrderBy(m => m.Name).ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TeamMember>> GetById(int id)
    {
        var member = await db.TeamMembers.FindAsync(id);
        return member is null ? NotFound() : Ok(member);
    }

    [HttpPost]
    public async Task<ActionResult<TeamMember>> Create(TeamMember member)
    {
        member.JoinedAt = DateTime.UtcNow;
        db.TeamMembers.Add(member);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = member.Id }, member);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, TeamMember member)
    {
        if (id != member.Id) return BadRequest();
        db.Entry(member).State = EntityState.Modified;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var member = await db.TeamMembers.FindAsync(id);
        if (member is null) return NotFound();
        db.TeamMembers.Remove(member);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
