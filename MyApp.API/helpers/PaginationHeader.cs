namespace MyApp.API.helpers
{
    public class PaginationHeader
    {
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int ItemsPerPage { get; set; }

        public PaginationHeader(int totalItems, int totalPages, int currentPage, int itemsPerPage)
        {
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
            this.CurrentPage = currentPage;
            this.ItemsPerPage = itemsPerPage;
        }
    }
}