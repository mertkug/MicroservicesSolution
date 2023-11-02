using Inveon.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.Web.Areas.Customer.Controllers;

[Area("Admin")]
public class YoneticiController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
    [HttpPost]
    public IActionResult Index(ProductDto productDto)
    {
        Console.WriteLine("hi");
        return View();
    }
    public IActionResult Git()
    {
        return RedirectToAction("Index");
    }
    public IActionResult AdminLogout()
    {
        return SignOut("Cookies", "oidc");
    }
}