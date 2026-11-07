using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.DTO;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController(DataContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Book>>> GetAll()
    {
        var books = await context.Books
            .AsNoTracking()
            .ToListAsync();

        return Ok(books);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Book>> GetById(int id)
    {
        var book = await context.Books
            .AsNoTracking()
            .FirstOrDefaultAsync(book => book.Id == id);
    
        if (book is null)
            return NotFound();
    
        return Ok(book);
    }

    [HttpPost]
    public async Task<ActionResult<Book>> Create(BookRequest request)
    {
        var book = new Book
        {
            Title = request.Title,
            Author = request.Author,
            IsOwned = true
        };

        context.Books.Add(book);
        await context.SaveChangesAsync();

        return Created($"/api/books/{book.Id}", book);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var book = await context.Books.FindAsync(id);
    
        if (book is null)
            return NotFound();
    
        context.Books.Remove(book);
        await context.SaveChangesAsync();
    
        return NoContent();
    }
}