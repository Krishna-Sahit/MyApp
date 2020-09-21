using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyApp.API.helpers;
using MyApp.API.Models;

namespace MyApp.API.Data
{
    public class BasketballRepository : IBasketballRepository
    {
        private readonly Datacontext _context;
        public BasketballRepository(Datacontext context)
        {
            _context = context;

        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.ID == id);

            return photo;

        }

        public async Task<User> GetUser(int id)
        {
            var user = await  _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
           var users = _context.Users.Include(p => p.Photos);

           return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
           return await _context.SaveChangesAsync() > 0 ;
        }

        public async Task<Photo> GetMainPhoto(int userId){
            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync( p => p.isMain);
        }
    }
}