using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models
{
    public class CartItem
    {
        [Key]
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public Product? Product { get; set; }
    }
}
