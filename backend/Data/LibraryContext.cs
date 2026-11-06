using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class LibraryContext(DbContextOptions<LibraryContext> options)
    : DbContext(options)
{
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Movie> Movies => Set<Movie>();
}

public class Book
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string? Author { get; set; }
    public bool IsOwned { get; set; }
}

public class Movie
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string? Platform { get; set; }
    public bool IsOwned { get; set; }
}
