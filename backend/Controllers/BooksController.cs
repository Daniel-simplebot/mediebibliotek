using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.DTO;
using backend.Models;
using System.Text.Json;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController(DataContext context, IHttpClientFactory httpClientFactory) : ControllerBase
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
    
    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] BookSearchRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.SearchQuery))
            return Ok(Array.Empty<object>());

        var client = httpClientFactory.CreateClient();
        var url =
            $"https://openlibrary.org/search.json?q={Uri.EscapeDataString(request.SearchQuery.Trim())}&limit=5";

        try
        {
            using var response = await client.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return StatusCode(502, "Klarte ikke hente bøker");

            await using var stream = await response.Content.ReadAsStreamAsync();
            using var doc = await JsonDocument.ParseAsync(stream);

            if (!doc.RootElement.TryGetProperty("docs", out var docs) ||
                docs.ValueKind != JsonValueKind.Array)
            {
                return StatusCode(502, "Ugyldig svar fra søketjenesten");
            }

            var items = docs.EnumerateArray()
                .Select(d =>
                {
                    var id = d.TryGetProperty("key", out var key)
                        ? key.GetString()
                        : null;

                    var title = d.TryGetProperty("title", out var titleValue)
                        ? titleValue.GetString()
                        : null;

                    var authors = d.TryGetProperty("author_name", out var authorValue) &&
                                  authorValue.ValueKind == JsonValueKind.Array
                        ? authorValue.EnumerateArray()
                            .Where(a => a.ValueKind == JsonValueKind.String)
                            .Select(a => a.GetString())
                            .Where(a => !string.IsNullOrWhiteSpace(a))
                            .ToArray()
                        : [];

                    string? thumbnail = null;

                    if (d.TryGetProperty("cover_i", out var cover) &&
                        cover.TryGetInt32(out var coverId))
                    {
                        thumbnail = $"https://covers.openlibrary.org/b/id/{coverId}-S.jpg";
                    }

                    return new
                    {
                        id,
                        title,
                        authors,
                        thumbnail
                    };
                })
                .ToList();
                
            return Ok(items);
        }
        catch (JsonException)
        {
            return StatusCode(502, "Ugyldig svar fra søketjenesten");
        }
        catch (HttpRequestException)
        {
            return StatusCode(502, "Klarte ikke kontakte søketjenesten");
        }
    }
}