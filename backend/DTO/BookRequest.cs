using System.ComponentModel.DataAnnotations;

namespace backend.DTO;

public class BookRequest
{
    [Required]
    public required string Title { get; set; }

    public string? Author { get; set; }
}
