using System.ComponentModel.DataAnnotations;

namespace MyApp.API.DTOs
{
    public class UserForRegisterDto
    {
        [Required, StringLength(15 , MinimumLength= 4)]
        public string Username { get; set; }

        [Required, StringLength(12 , MinimumLength= 5, ErrorMessage = "You must have a password between 5-12 characters.")]
        public string Password { get; set; }
        
    }
}