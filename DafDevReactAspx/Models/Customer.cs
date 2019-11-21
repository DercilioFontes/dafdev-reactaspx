using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DafDevReactAspx.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        [NotMapped]
        public string ConfirmPassword { get; set; }
    }
}   