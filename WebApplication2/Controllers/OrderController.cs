using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.DataAccess;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Authorize]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public OrderController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task<IActionResult> OrderHistoryAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            var orders = _context.Orders.Where(o => o.UserId == user.Id).ToList();
            return View(orders);
        }
        public IActionResult OrderDetails(int orderId)
        {
            var orderDetails = _context.OrderDetails
                                 .Where(od => od.OrderId == orderId)
                                 .Include(od => od.Product) // Include sản phẩm liên quan
                                 .ToList();
            return View(orderDetails);
        }
    }
}
