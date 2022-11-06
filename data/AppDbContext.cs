using data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }

        // Tables
        public DbSet<Category>? Categories { get; set; }
        public DbSet<Product>? Products { get; set; }
        public DbSet<Cart>? Carts { get; set; }
    }
}
