
const connection = new signalR.HubConnectionBuilder().withUrl("/hubs/product").build();

connection.start().then(function () {
    console.log("SignalR connected");
    document.getElementById("productSave").disabled = false;

    connection.on("updateProductList", function (productList) {
        // Clear the current product list
        var container = document.querySelector('.container.row');
        container.innerHTML = "";

        // Add each product to the Razor view
        productList.forEach(function (product) {
            var newProductCard = `
            <div class="col-4">
                <div class="p-0 my-3 border">
                    <div class="card">
                        <img src="~/Uploads/${product.ImageUrl}" class="card-img-top" alt="${product.ImageUrl}">
                        <div class="card-body">
                            <h3 class="card-title text-success">${product.Name}</h3>
                            <span class="badge badge-light mb-2">${product.CategoryName}</span>
                            <p class="card-text">${product.Description}</p>
                            <div class="row">
                                <div class="col pt-1">
                                    <span style="font-size:23px;">${product.Price}</span>
                                </div>
                                <div class="col">
                                    <a asp-action="Details" asp-route-productId="${product.ProductId}"
                                       class="btn btn-success form-control">Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
            container.innerHTML += newProductCard;
        });
    });
}).catch(function (err) {
    return console.error(err.toString());
});