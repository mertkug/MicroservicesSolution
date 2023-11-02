const connection = new signalR.HubConnectionBuilder().withUrl("/hubs/product").build();

document.getElementById("productSave").disabled = true;

connection.start().then(function () {
    console.log("SignalR connected");
    document.getElementById("productSave").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("product").addEventListener("submit", (e) => {
    const product = {
        imageUrl: document.getElementById("imageUrl").value,
        productName: document.getElementById("productName").value,
        categoryName: document.getElementById("categoryName").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        count: parseInt(document.getElementById("count").value)
    };
    connection.invoke("AddProduct", product.imageUrl, product.productName, product.categoryName, product.description, product.price, product.count).catch((e) => {
        return console.error(e.toString());
    })
    e.preventDefault();
})