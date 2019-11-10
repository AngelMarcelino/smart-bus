using Microsoft.EntityFrameworkCore;
using SmartBus.Website.Data;
using SmartBus.Website.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Services
{
    public class Service<T> where T : class, IEntity, new()
    {
        protected readonly SmartBusDbContext dbContext;

        public Service(SmartBusDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public virtual async Task AddAsync(T entity)
        {
            this.dbContext.Add(entity);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            this.dbContext.Attach(new T
            {
                Id = id
            }).State = EntityState.Deleted;
            await this.dbContext.SaveChangesAsync();
        }

        public Task<T> GetAsync(int id, params string[] propertiesToInclude)
        {
            IQueryable<T> dbSet = dbContext.Set<T>();
            foreach (var prop in propertiesToInclude)
            {
                dbSet = dbSet.Include(prop);
            }
            return dbSet.Where(e => e.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> GetEntitiesAsync()
        {
            return await dbContext.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> GetEntitiesAsync(params string[] propertiesToInclude)
        {
            IQueryable<T> dbSet = dbContext.Set<T>();
            foreach (var prop in propertiesToInclude)
            {
                dbSet = dbSet.Include(prop);
            }
            return await dbSet.ToListAsync();
        }

        public virtual async Task UpdateAsync(T entity)
        {
            dbContext.Update(entity);
            await dbContext.SaveChangesAsync();
        }
    }
}
