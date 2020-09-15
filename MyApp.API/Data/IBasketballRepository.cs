using System.Collections.Generic;
using System.Threading.Tasks;
using MyApp.API.Models;

namespace MyApp.API.Data
{
    public interface IBasketballRepository
    {
        void Add<T> (T entity) where T:class;
        void Delete<T> (T entity) where T:class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);

    }
}