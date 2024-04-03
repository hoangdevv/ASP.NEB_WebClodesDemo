using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên sản phẩm là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Tên sản phẩm không được vượt quá 100 ký tự.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Giá sản phẩm là bắt buộc.")]
        [Range(0.01, 1000000000.00, ErrorMessage = "Giá sản phẩm phải nằm trong khoảng từ 0.01 đến 1,000,000,000.")]
        public decimal Price { get; set; }

        public string Description { get; set; }

       
        public string? ImageUrl { get; set; }

        public List<ProductImage>? Images { get; set; }

        public int CategoryId { get; set; }

        public Category? Category { get; set; }
    }
}
