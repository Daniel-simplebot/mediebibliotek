using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class DataContext(DbContextOptions<DataContext> options)
    : DbContext(options)
{
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Movie> Movies => Set<Movie>();
}
