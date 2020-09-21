using System;
using System.ComponentModel.DataAnnotations;

namespace MyApp.API.DTOs
{
    public class UserForRegisterDto
    {
        [Required, StringLength(15 , MinimumLength= 4)]
        public string Username { get; set; }

        [Required, StringLength(12 , MinimumLength= 5, ErrorMessage = "You must have a password between 5-12 characters.")]
        public string Password { get; set; }
        
        public string Gender { get; set; }

        public DateTime DateOfBirth { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive{ get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
}
}