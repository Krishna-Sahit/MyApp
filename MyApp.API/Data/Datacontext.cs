using MyApp.API.Models;
using Microsoft.EntityFrameworkCore;
namespace MyApp.API.Data
{
    public class Datacontext : DbContext
    {
        public Datacontext(DbContextOptions<Datacontext> options) : base(options)
        {
        }
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
    }
}