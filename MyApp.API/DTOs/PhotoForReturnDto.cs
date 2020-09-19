using System;

namespace MyApp.API.DTOs
{
    public class PhotoForReturnDto
    {
        public int ID { get; set; }

        public string url { get; set; }

        public string description {get; set; }

        public DateTime DateAdded { get; set; }

        public bool isMain { get; set; }

        public string PublicId { get; set; }
    }
}