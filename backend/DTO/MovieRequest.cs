using System.ComponentModel.DataAnnotations;

namespace backend.DTO;

public class MovieRequest
{
    [Required]
    public required string Title { get; set; }
}
