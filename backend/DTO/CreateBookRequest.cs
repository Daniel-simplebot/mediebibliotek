using System.ComponentModel.DataAnnotations;

public class CreateBookRequest
{
    [Required]
    public required string Title { get; set; }

    public string? Author { get; set; }
}
