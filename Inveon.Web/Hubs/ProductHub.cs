using Inveon.Web.Models;
using Inveon.Web.Services;
using Inveon.Web.Services.IServices;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace Inveon.Web.Hubs;

public class ProductHub : Hub
{
    private readonly IProductService _productService;

    public ProductHub(IProductService productService)
    {
        this._productService = productService;
    }
    public async Task<List<ProductDto>> GetProducts()
    {
        List<ProductDto> list = new();
        var response = await _productService.GetAllProductsAsync<ResponseDto>("");
        if (response != null && response.IsSuccess)
        {
            list = JsonConvert.DeserializeObject<List<ProductDto>>(Convert.ToString(response.Result));
        }

        return list;
    }
    public async Task AddProduct(string imageUrl, string productName, string categoryName, string description, double price, int count)
    {
        var product = new ProductDto
        {
            ImageUrl = imageUrl,
            Name = productName,
            CategoryName = categoryName,
            Description = description,
            Price = price,
            Count = count
        };
        await _productService.CreateProductAsync<ResponseDto>(product, "");
        var list = await GetProducts();
        await Clients.All.SendAsync("updateProductList", list);
    }
}