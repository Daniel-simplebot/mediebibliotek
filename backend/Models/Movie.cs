namespace backend.Models;

public class Movie
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsOwned { get; set; }
}