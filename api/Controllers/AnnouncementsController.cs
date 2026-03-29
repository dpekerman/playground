using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Playground.Api.Data;
using Playground.Api.Models;

namespace Playground.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnnouncementsController(PlaygroundDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Announcement>>> GetAll([FromQuery] bool? activeOnly)
    {
        var query = db.Announcements.AsQueryable();
        if (activeOnly == true)
            query = query.Where(a => a.IsActive);
        return Ok(await query.OrderByDescending(a => a.PublishedAt).ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Announcement>> GetById(int id)
    {
        var announcement = await db.Announcements.FindAsync(id);
        return announcement is null ? NotFound() : Ok(announcement);
    }

    [HttpPost]
    public async Task<ActionResult<Announcement>> Create(Announcement announcement)
    {
        announcement.PublishedAt = DateTime.UtcNow;
        db.Announcements.Add(announcement);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = announcement.Id }, announcement);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Announcement announcement)
    {
        if (id != announcement.Id) return BadRequest();
        db.Entry(announcement).State = EntityState.Modified;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var announcement = await db.Announcements.FindAsync(id);
        if (announcement is null) return NotFound();
        db.Announcements.Remove(announcement);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
