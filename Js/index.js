let price = document.querySelector("#price")
let name = document.querySelector("#nameInput")
let desc = document.querySelector("#desc")
let category = document.querySelector("#category")



async function getAllCategories() {
    try {
        let res = await fetch('https://dummyjson.com/products/category-list')
        let data = await res.json()
        displayCategories(data)
        console.log(data);
        
    } catch (error) {
        console.log(error);
    }

}

getAllCategories()

function displayCategories(list) {
    let cartona = ``
    for (let i = 0; i < list.length; i++) {
        cartona += `

    <div class="col-md-4 category">
            <div class="inner d-flex justify-content-center align-items-center">
              <h3>${list[i].toUpperCase()}</h3>
            </div>
          </div>
`
        // (document.querySelector("#rowCateg")) ? document.querySelector("#rowCateg").innerHTML = cartona : null  ///

    } if (document.querySelector("#rowCateg")) document.querySelector("#rowCateg").innerHTML = cartona //setter


    let categList = document.querySelectorAll(".category")

    for (let i = 0; i < categList.length; i++) {
        categList[i].addEventListener("click", () => {

            localStorage.setItem("categoryName", categList[i].innerText)
            location.href = "../Products.html"

        })

    }


}





async function getCategProducts(categName) {
    let res = await fetch(`https://dummyjson.com/products/category/${categName}`)
    let products = await res.json()
    displayProducts(products.products, "rowProducts")

}

if (location.pathname == "/Products.html") {
    getCategProducts(localStorage.getItem("categoryName"))
}

function displayProducts(products, rowID) {

    let cartona = ''

    for (let i = 0; i < products.length; i++) {
        cartona += `
         <div class="col-md-4 product" id=${products[i].id}>
            <div class="card">
              <img src=${products[i].thumbnail} class="cardF-img-top img-fluid" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${products[i].title}</h5>
                <p class="card-text">
                ${products[i].description}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="text-success">${products[i].price}$</h5>
                  <h5>${products[i].rating} <i class="fa-regular fa-star text-warning"></i></h5>
                </div>

                <button class="btn w-100 btn-success">Add to cart</button>
              </div>
            </div>
          </div>
        `

    }
    if (document.getElementById(rowID)) document.getElementById(rowID).innerHTML = cartona

    let productCards = document.querySelectorAll(".product")
    for (let i = 0; i < productCards.length; i++) {
        productCards[i].addEventListener("click", () => {
            localStorage.setItem("productID", productCards[i].getAttribute("id"))
            location.href = "../ProductDetails.html"
        })

    }

}

async function getProductDetails(id) {
    try {
        let res = await fetch(`https://dummyjson.com/products/${id}`)
        let product = await res.json()
        displayProductDetails(product)
    } catch (error) {
        console.log(error);

    }

}

if (location.pathname == "/ProductDetails.html") {

    getProductDetails(localStorage.getItem("productID"))

}



function displayProductDetails(product) {
    console.log(product);

    let cartona = `
          <div class="col-md-6">
            <img src=${product.thumbnail} alt="" />
          </div>
          <div class="col-md-6">
            <h2>${product.title}</h2>
            <p class="text-muted my-3 lh-lg">
            ${product.description}
            </p>
            <h4 class="my-4">Price : <span class="text-muted">${product.price}$</span></h4>
            <h4 class="my-4">Brand : <span class="text-muted">${product.brand}</span></h4>
            <h4 class="my-4">Category : <span class="text-muted">${product.category}</span></h4>
            <h4 class="my-4">Return Policy : <span class="text-muted">${product.returnPolicy}</span></h4>
            <h4 class="text-danger">DISCOUNT : ${product.discountPercentage}%</h4>
            <button class="btn btn-success w-100 my-4">Add to cart</button>
          </div>
`

    document.getElementById("rowDetails").innerHTML = cartona

}


async function getAllProducts() {
    try {
        let res = await fetch('https://dummyjson.com/products')
        let allProducts = await res.json()
        displayProducts(allProducts.products, "rowAllProducts")
    } catch (error) {
        console.log(error);

    }

}

if (location.pathname == "/AllProducts.html") {
    getAllProducts()
}



async function addProduct() {

    let product = {
        title: nameInput.value,
        price: price.value,
        description: desc.value,
        category: category.value
    }

    if (checkNotEmpty()) {
        let x = await fetch("https://dummyjson.com/products/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        console.log(x.status);

        // let res = await x.json()
        // console.log(res)
        console.log(x);

        if (x.status == 201) {
            Toastify({

                text: "Product added successfully",
                duration: 3000,
                gravity: "bottom",
                style: {
                    background: "#96c93d"
                }


            }).showToast();

            setTimeout(() => {
                location.href = "../index.html"
            }, 3000)
        }
        reset()
    }



}

document.querySelector("#submitBtn").addEventListener("click", () => {
    addProduct()
})



function checkNotEmpty() {
    if (nameInput.value == "" || price.value == "" || category.value == "" || desc.value == "") {
        document.getElementById("warnMsg").classList.replace("d-none", "d-block")
        return false
    }
    else {
        document.getElementById("warnMsg").classList.replace("d-block", "d-none")
        return true
    }
}

function reset() {
    nameInput.value = ""
    price.value = ""
    desc.value = ""
    category.value = ""
}