using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.DTO;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController(LibraryContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Movie>>> GetAll()
    {
        var movies = await context.Movies
            .AsNoTracking()
            .ToListAsync();

        return Ok(movies);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Movie>> GetById(int id)
    {
        var movie = await context.Movies
            .AsNoTracking()
            .FirstOrDefaultAsync(movie => movie.Id == id);
    
        if (movie is null)
            return NotFound();
    
        return Ok(movie);
    }

    [HttpPost]
    public async Task<ActionResult<Movie>> Create(MovieRequest request)
    {
        var movie = new Movie
        {
            Title = request.Title,
            IsOwned = true
        };

        context.Movies.Add(movie);
        await context.SaveChangesAsync();

        return Created($"/api/movies/{movie.Id}", movie);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var movie = await context.Movies.FindAsync(id);
    
        if (movie is null)
            return NotFound();
    
        context.Movies.Remove(movie);
        await context.SaveChangesAsync();
    
        return NoContent();
    }
}