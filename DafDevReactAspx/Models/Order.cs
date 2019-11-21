using System;
using System.ComponentModel.DataAnnotations;

namespace DafDevReactAspx.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public decimal TotalPaid { get; set; }
        public DateTime OrderDate { get; set; }
        public int Status { get; set; }
        public string Comment { get; set; }
    }
}