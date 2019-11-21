using System.Data.Entity;

namespace DafDevReactAspx.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() : base("DafDevReactAspx")
        {

        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
    }
}