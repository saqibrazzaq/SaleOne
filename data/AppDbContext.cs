using data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }

        // Tables
        public DbSet<AppIdentityUser>? Users { get; set; }
        public DbSet<Category>? Categories { get; set; }
        public DbSet<Product>? Products { get; set; }
        public DbSet<ProductImage>? ProductImages { get; set; }
        public DbSet<Cart>? Carts { get; set; }
        public DbSet<CartItem>? CartItems { get; set; }
        public DbSet<Unit>? Units { get; set; }
        public DbSet<Address>? Addresses { get; set; }
        public DbSet<UserAddress>? UserAddresses { get; set; }
        public DbSet<City>? Cities { get; set; }
        public DbSet<State>? States { get; set; }
        public DbSet<Country>? Countries { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<CartItem>().HasOne(e => e.Product).WithMany(e => e.CartItems)
                .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Product>().HasOne(e => e.Unit).WithMany(e => e.Products)
                .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<CartItem>().HasOne(e => e.Unit).WithMany(e => e.CartItems)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
