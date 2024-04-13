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
            // Lấy thông tin người dùng hiện tại
            var user = await _userManager.GetUserAsync(HttpContext.User);

            // Kiểm tra xem người dùng đã đăng nhập hay chưa
            if (user != null)
            {
                // Truy vấn các đơn hàng của người dùng dựa trên UserId
                var orders = await _context.Orders
                    .Where(o => o.UserId == user.Id)
                    .ToListAsync();

                return View(orders);
            }
            else
            {
                // Người dùng chưa đăng nhập, có thể xử lý tùy ý
                return RedirectToAction("Login", "Account");
            }
        }
        public IActionResult OrderDetails(int orderId)
        {
            var order = _context.OrderDetails.Where(od => od.OrderId == orderId)
                                                    .Include(od => od.Product)
                                                    .ToList();

            return View(order);
        }
    }
}
