using System;

namespace MyApp.API.Models
{
    public class Photo
    {
        public int ID { get; set; }

        public string url { get; set; }

        public string description {get; set; }

        public DateTime DateAdded { get; set; }

        public bool isMain { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }
    }
}