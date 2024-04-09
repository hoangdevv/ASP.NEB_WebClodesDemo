using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalPrice { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập thông tin đầy đủ.")]
        public string ShippingAddress { get; set; }
        public string? Notes { get; set; }
        public ApplicationUser User { get; set; }
        public List<OrderDetail>? OrderDetails { get; set; }
    }
}
