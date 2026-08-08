/* =====================================================
   SWIGGY UI ARENA
   Main JavaScript
===================================================== */


/* =====================================================
   DATA
===================================================== */

const restaurants = [

    {
        id: 1,
        name: "Meghana Foods",
        rating: "4.5",
        type: "Biryani, South Indian",
        time: "30-35 mins",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800",
        menu: [
            {
                id: 101,
                name: "Chicken Biryani",
                price: 299,
                description: "Aromatic basmati rice cooked with tender chicken and traditional spices.",
                image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 102,
                name: "Mutton Biryani",
                price: 349,
                description: "Rich and flavorful biryani prepared with tender mutton.",
                image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500"
            },
            {
                id: 103,
                name: "Chicken 65",
                price: 199,
                description: "Crispy spicy fried chicken tossed with curry leaves.",
                image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
            },
            {
                id: 104,
                name: "Paneer Biryani",
                price: 249,
                description: "Fragrant rice with soft paneer and aromatic spices.",
                image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=500"
            },
            {
                id: 105,
                name: "Butter Chicken",
                price: 289,
                description: "Creamy tomato based chicken curry.",
                image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500"
            },
            {
                id: 106,
                name: "Garlic Naan",
                price: 79,
                description: "Soft naan topped with garlic and butter.",
                image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500"
            }
        ]
    },

    {
        id: 2,
        name: "Burger King",
        rating: "4.3",
        type: "Burgers, American",
        time: "25-30 mins",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
        menu: [
            {
                id: 201,
                name: "Whopper Burger",
                price: 219,
                description: "Classic flame-grilled burger with fresh vegetables.",
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
            },
            {
                id: 202,
                name: "Cheese Burger",
                price: 179,
                description: "Juicy burger topped with melted cheese.",
                image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 203,
                name: "Chicken Burger",
                price: 199,
                description: "Crispy chicken patty with fresh lettuce.",
                image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500"
            },
            {
                id: 204,
                name: "French Fries",
                price: 99,
                description: "Golden crispy fries seasoned with salt.",
                image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"
            },
            {
                id: 205,
                name: "Veg Burger",
                price: 149,
                description: "Crunchy vegetable patty with creamy sauce.",
                image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500"
            }
        ]
    },

    {
        id: 3,
        name: "Pizza Hut",
        rating: "4.2",
        type: "Pizzas, Italian",
        time: "25-30 mins",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
        menu: [
            {
                id: 301,
                name: "Margherita Pizza",
                price: 249,
                description: "Classic pizza topped with mozzarella and tomato.",
                image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500"
            },
            {
                id: 302,
                name: "Farmhouse Pizza",
                price: 329,
                description: "Loaded with fresh vegetables and cheese.",
                image: "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?w=500"
            },
            {
                id: 303,
                name: "Chicken Pizza",
                price: 369,
                description: "Cheesy pizza topped with spicy chicken.",
                image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500"
            },
            {
                id: 304,
                name: "Veggie Pizza",
                price: 299,
                description: "Fresh vegetables with mozzarella cheese.",
                image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500"
            },
            {
                id: 305,
                name: "Cheese Garlic Bread",
                price: 159,
                description: "Soft garlic bread with melted cheese.",
                image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cheese_Garlic_Bread.jpg"
            }
        ]
    },

    {
        id: 4,
        name: "Domino's Pizza",
        rating: "4.4",
        type: "Pizza, Fast Food",
        time: "20-25 mins",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
        menu: [
            {
                id: 401,
                name: "Pepperoni Pizza",
                price: 399,
                description: "Cheesy pizza loaded with pepperoni.",
                image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500"
            },
            {
                id: 402,
                name: "Cheese Burst Pizza",
                price: 379,
                description: "Extra cheesy pizza with a creamy cheese center.",
                image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500"
            },
            {
                id: 403,
                name: "Veg Loaded Pizza",
                price: 299,
                description: "Loaded with crunchy vegetables.",
                image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500"
            },
            {
                id: 404,
                name: "Chicken Wings",
                price: 229,
                description: "Juicy spicy chicken wings.",
                image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500"
            },
            {
                id: 405,
                name: "Garlic Bread",
                price: 129,
                description: "Freshly baked garlic bread.",
                image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cheese_Garlic_Bread.jpg"
            }
        ]
    },

    {
        id: 5,
        name: "Paradise Biryani",
        rating: "4.6",
        type: "Biryani, Indian",
        time: "30-35 mins",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
        menu: [
            {
                id: 501,
                name: "Hyderabadi Chicken Biryani",
                price: 299,
                description: "Traditional Hyderabadi dum biryani.",
                image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 502,
                name: "Mutton Biryani",
                price: 369,
                description: "Slow cooked mutton with aromatic rice.",
                image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500"
            },
            {
                id: 503,
                name: "Paneer Biryani",
                price: 249,
                description: "Spiced rice with soft paneer.",
                image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=500"
            },
            {
                id: 504,
                name: "Chicken Kebab",
                price: 229,
                description: "Juicy grilled chicken kebabs.",
                image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500"
            },
            {
                id: 505,
                name: "Chicken Curry",
                price: 279,
                description: "Traditional spicy chicken curry.",
                image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500"
            }
        ]
    },

    {
        id: 6,
        name: "Udupi Garden",
        rating: "4.4",
        type: "South Indian, Breakfast",
        time: "20-25 mins",
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=800",
        menu: [
            {
                id: 601,
                name: "Masala Dosa",
                price: 99,
                description: "Crispy dosa filled with potato masala.",
                image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500"
            },
            {
                id: 602,
                name: "Idli Sambar",
                price: 79,
                description: "Soft idlis served with hot sambar.",
                image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500"
            },
            {
                id: 603,
                name: "Poori Masala",
                price: 89,
                description: "Fluffy puris served with potato curry.",
                image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
            },
            {
                id: 604,
                name: "Vada",
                price: 69,
                description: "Crispy South Indian medu vada.",
                image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500"
            },
            {
                id: 605,
                name: "Paneer Dosa",
                price: 129,
                description: "Crispy dosa filled with paneer.",
                image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500"
            }
        ]
    }

];


/* =====================================================
   CART
===================================================== */

let cart = JSON.parse(localStorage.getItem("swiggyCart")) || [];


/* =====================================================
   APP ELEMENT
===================================================== */

const app = document.getElementById("app");


/* =====================================================
   INITIAL LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();

    showHome();

});


/* =====================================================
   HOME PAGE
===================================================== */

function showHome() {

    window.history.pushState(
        { page: "home" },
        "",
        "#home"
    );

    renderHome();
}


function renderHome() {

    app.innerHTML = `

        <section class="home">

            <h1 class="home-title">
                What's on your mind?
            </h1>

            <p class="home-subtitle">
                Order food from your favourite restaurants
            </p>


            <div class="categories">

                <div class="category">
                    <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300">
                    <span>Breakfast</span>
                </div>

                <div class="category">
                    <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80">
                    <span>Biryani</span>
                </div>

                <div class="category">
                    <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300">
                    <span>Burgers</span>
                </div>

                <div class="category">
                    <img src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300">
                    <span>Pizza</span>
                </div>

                <div class="category">
                    <img src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300">
                    <span>Kebabs</span>
                </div>

                <div class="category">
                    <img src="https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=300">
                    <span>Paneer</span>
                </div>

            </div>


            <h2 class="section-title">
                Restaurants to explore
            </h2>


            <div class="restaurant-grid">

                ${restaurants.map(restaurant => `

                    <article
                        class="restaurant-card"
                        onclick="showRestaurant(${restaurant.id})"
                    >

                        <img
                            class="restaurant-image"
                            src="${restaurant.image}"
                            alt="${restaurant.name}"
                        >

                        <div class="restaurant-info">

                            <h3 class="restaurant-name">
                                ${restaurant.name}
                            </h3>

                            <div class="rating">
                                <span>★ ${restaurant.rating}</span>
                                · ${restaurant.time}
                            </div>

                            <div class="restaurant-type">
                                ${restaurant.type}
                            </div>

                        </div>

                    </article>

                `).join("")}

            </div>

        </section>

    `;
}


/* =====================================================
   RESTAURANT PAGE
===================================================== */

function showRestaurant(id) {

    const restaurant = restaurants.find(
        r => r.id === id
    );

    if (!restaurant) return;


    window.history.pushState(
        { page: "restaurant", id: id },
        "",
        "#restaurant-" + id
    );


    app.innerHTML = `

        <section class="restaurant-page">

            <button
                class="back-button"
                onclick="goBack()"
            >
                ← Back
            </button>


            <div class="restaurant-header">

                <h1>
                    ${restaurant.name}
                </h1>

                <p>
                    ${restaurant.type}
                </p>

                <div class="restaurant-meta">

                    <span>
                        ★ ${restaurant.rating}
                    </span>

                    <span>
                        ${restaurant.time}
                    </span>

                    <span>
                        ₹200 for two
                    </span>

                </div>

            </div>


            <h2 class="menu-title">
                Recommended
            </h2>


            <div class="menu-list">

                ${restaurant.menu.map(item => `

                    <div class="menu-item">

                        <div class="menu-left">

                            <div class="veg">
                                ●
                            </div>

                            <h3 class="menu-name">
                                ${item.name}
                            </h3>

                            <div class="menu-price">
                                ₹${item.price}
                            </div>

                            <p class="menu-description">
                                ${item.description}
                            </p>

                        </div>


                        <div class="menu-right">

                            <img
                                class="menu-image"
                                src="${item.image}"
                                alt="${item.name}"
                            >

                            <button
                                class="add-btn"
                                onclick="addToCart(
                                    ${restaurant.id},
                                    ${item.id}
                                )"
                            >
                                ADD
                            </button>

                        </div>

                    </div>

                `).join("")}

            </div>

        </section>

    `;
}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(restaurantId, itemId) {

    const restaurant = restaurants.find(
        r => r.id === restaurantId
    );

    if (!restaurant) return;


    const item = restaurant.menu.find(
        m => m.id === itemId
    );

    if (!item) return;


    const existing = cart.find(
        c => c.id === itemId
    );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: item.id,

            name: item.name,

            price: item.price,

            image: item.image,

            restaurant: restaurant.name,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    showToast(`${item.name} added to cart`);
}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "swiggyCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   CART COUNT
===================================================== */

function updateCartCount() {

    const count = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    document.getElementById(
        "cartCount"
    ).textContent = count;

}


/* =====================================================
   CART PAGE
===================================================== */

function showCart() {

    window.history.pushState(
        { page: "cart" },
        "",
        "#cart"
    );

    renderCart();

}


function renderCart() {

    if (cart.length === 0) {

        app.innerHTML = `

            <section class="cart-page">

                <h1>Your Cart</h1>

                <div class="cart-empty">

                    <div class="cart-empty-icon">
                        🛒
                    </div>

                    <h2>
                        Your cart is empty
                    </h2>

                    <p>
                        Add some delicious food to get started.
                    </p>

                </div>

            </section>

        `;

        return;
    }


    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );


    const delivery = subtotal >= 500 ? 0 : 40;

    const taxes = Math.round(subtotal * 0.05);

    const total = subtotal + delivery + taxes;


    app.innerHTML = `

        <section class="cart-page">

            <button
                class="back-button"
                onclick="goBack()"
            >
                ← Back
            </button>

            <h1>
                Your Cart
            </h1>


            <div class="cart-list">

                ${cart.map(item => `

                    <div class="cart-item">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                        <div class="cart-item-info">

                            <div class="cart-item-name">
                                ${item.name}
                            </div>

                            <div class="cart-item-price">
                                ₹${item.price}
                            </div>

                        </div>


                        <div class="quantity">

                            <button
                                onclick="changeQuantity(
                                    ${item.id},
                                    -1
                                )"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeQuantity(
                                    ${item.id},
                                    1
                                )"
                            >
                                +
                            </button>

                        </div>


                        <strong>
                            ₹${item.price * item.quantity}
                        </strong>

                    </div>

                `).join("")}

            </div>


            <div class="cart-summary">

                <div class="summary-row">

                    <span>
                        Item Total
                    </span>

                    <span>
                        ₹${subtotal}
                    </span>

                </div>


                <div class="summary-row">

                    <span>
                        Delivery Fee
                    </span>

                    <span>
                        ₹${delivery}
                    </span>

                </div>


                <div class="summary-row">

                    <span>
                        Taxes
                    </span>

                    <span>
                        ₹${taxes}
                    </span>

                </div>


                <div class="summary-row summary-total">

                    <span>
                        To Pay
                    </span>

                    <span>
                        ₹${total}
                    </span>

                </div>


                <button
                    class="checkout-btn"
                    onclick="checkout()"
                >
                    PROCEED TO CHECKOUT
                </button>

            </div>

        </section>

    `;
}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(id, change) {

    const item = cart.find(
        c => c.id === id
    );

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart = cart.filter(
            c => c.id !== id
        );

    }


    saveCart();

    updateCartCount();

    renderCart();

}


/* =====================================================
   SEARCH PAGE
===================================================== */

function showSearch() {

    window.history.pushState(
        { page: "search" },
        "",
        "#search"
    );


    app.innerHTML = `

        <section class="search-page">

            <h1>
                Search for restaurants and food
            </h1>


            <div class="search-box">

                <input
                    id="searchInput"
                    type="text"
                    placeholder="Search for dishes or restaurants..."
                    oninput="performSearch()"
                    autofocus
                >

                <button onclick="performSearch()">
                    ⌕
                </button>

            </div>


            <div
                id="searchResults"
                class="search-results"
            >

                <p style="color:#686b78">
                    Try searching for biryani, pizza, burger...
                </p>

            </div>

        </section>

    `;

}


function performSearch() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;


    const query =
        input.value
            .trim()
            .toLowerCase();


    const results =
        document.getElementById(
            "searchResults"
        );


    if (!query) {

        results.innerHTML = `
            <p style="color:#686b78">
                Try searching for biryani, pizza, burger...
            </p>
        `;

        return;
    }


    const restaurantMatches =
        restaurants.filter(r =>

            r.name.toLowerCase().includes(query) ||

            r.type.toLowerCase().includes(query)

        );


    const menuMatches = [];


    restaurants.forEach(restaurant => {

        restaurant.menu.forEach(item => {

            if (
                item.name
                    .toLowerCase()
                    .includes(query)
            ) {

                menuMatches.push({
                    restaurant,
                    item
                });

            }

        });

    });


    if (
        restaurantMatches.length === 0 &&
        menuMatches.length === 0
    ) {

        results.innerHTML = `
            <h3>
                No results found
            </h3>

            <p style="color:#686b78;margin-top:8px">
                Try another search.
            </p>
        `;

        return;
    }


    results.innerHTML = `

        ${restaurantMatches.map(r => `

            <div
                class="search-result"
                onclick="showRestaurant(${r.id})"
            >

                <img src="${r.image}">

                <div>

                    <h3>
                        ${r.name}
                    </h3>

                    <p>
                        ★ ${r.rating} · ${r.type}
                    </p>

                </div>

            </div>

        `).join("")}


        ${menuMatches.map(match => `

            <div
                class="search-result"
                onclick="showRestaurant(${match.restaurant.id})"
            >

                <img src="${match.item.image}">

                <div>

                    <h3>
                        ${match.item.name}
                    </h3>

                    <p>
                        ${match.restaurant.name}
                    </p>

                    <p>
                        ₹${match.item.price}
                    </p>

                </div>

            </div>

        `).join("")}

    `;

}


/* =====================================================
   HELP PAGE
===================================================== */

function showHelp() {

    window.history.pushState(
        { page: "help" },
        "",
        "#help"
    );


    app.innerHTML = `

        <section class="help-page">

            <h1>
                Help & Support
            </h1>

            <p>
                How can we help you today?
            </p>


            <div
                class="help-card"
                onclick="showToast('Order support selected')"
            >

                <h3>
                    📦 I have an issue with my order
                </h3>

                <p>
                    Get help with an existing order.
                </p>

            </div>


            <div
                class="help-card"
                onclick="showToast('Payment support selected')"
            >

                <h3>
                    💳 Payment related issues
                </h3>

                <p>
                    Problems with payments, refunds or offers.
                </p>

            </div>


            <div
                class="help-card"
                onclick="showToast('Delivery support selected')"
            >

                <h3>
                    🛵 Delivery related issues
                </h3>

                <p>
                    Track your delivery or report an issue.
                </p>

            </div>


            <div
                class="help-card"
                onclick="showToast('Account support selected')"
            >

                <h3>
                    👤 Account & profile
                </h3>

                <p>
                    Manage your account and personal details.
                </p>

            </div>


            <div
                class="help-card"
                onclick="showToast('Contact support selected')"
            >

                <h3>
                    💬 Contact us
                </h3>

                <p>
                    Get in touch with our support team.
                </p>

            </div>

        </section>

    `;

}


/* =====================================================
   SIGN IN DRAWER
===================================================== */

function openSignin() {

    document
        .getElementById("signinDrawer")
        .classList.add("active");


    document
        .getElementById("overlay")
        .classList.add("active");

}


function closeSignin() {

    document
        .getElementById("signinDrawer")
        .classList.remove("active");


    document
        .getElementById("overlay")
        .classList.remove("active");

}


/* =====================================================
   SIGN IN
===================================================== */

function signin() {

    const input =
        document.getElementById("phoneInput");


    if (!input) return;


    const phone =
        input.value.trim();


    if (!/^[0-9]{10}$/.test(phone)) {

        showToast(
            "Please enter a valid 10-digit phone number"
        );

        return;
    }


    closeSignin();

    showToast(
        "OTP sent successfully!"
    );

}


/* =====================================================
   CHECKOUT
===================================================== */

function checkout() {

    if (cart.length === 0) return;


    showToast(
        "Order placed successfully! 🎉"
    );


    cart = [];

    saveCart();

    updateCartCount();

    setTimeout(() => {

        showHome();

    }, 1200);

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const oldToast =
        document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }


    const toast =
        document.createElement("div");


    toast.className = "toast";

    toast.textContent = message;


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.remove();

    }, 2200);

}


/* =====================================================
   BACK NAVIGATION
===================================================== */

function goBack() {

    if (window.history.length > 1) {

        window.history.back();

    } else {

        showHome();

    }

}


/* =====================================================
   BROWSER BACK BUTTON
===================================================== */

window.addEventListener(
    "popstate",
    function () {

        const hash =
            window.location.hash;


        if (hash === "#home" || hash === "") {

            renderHome();

        }

        else if (hash === "#cart") {

            renderCart();

        }

        else if (hash === "#search") {

            showSearchWithoutHistory();

        }

        else if (hash === "#help") {

            showHelpWithoutHistory();

        }

        else if (
            hash.startsWith("#restaurant-")
        ) {

            const id =
                Number(
                    hash.replace(
                        "#restaurant-",
                        ""
                    )
                );

            renderRestaurantWithoutHistory(id);

        }

        else {

            renderHome();

        }

    }
);


/* =====================================================
   RENDER WITHOUT ADDING HISTORY
===================================================== */

function showSearchWithoutHistory() {

    app.innerHTML = `

        <section class="search-page">

            <h1>
                Search for restaurants and food
            </h1>

            <div class="search-box">

                <input
                    id="searchInput"
                    type="text"
                    placeholder="Search for dishes or restaurants..."
                    oninput="performSearch()"
                    autofocus
                >

                <button onclick="performSearch()">
                    ⌕
                </button>

            </div>

            <div
                id="searchResults"
                class="search-results"
            >
                <p style="color:#686b78">
                    Try searching for biryani, pizza, burger...
                </p>
            </div>

        </section>

    `;

}


function showHelpWithoutHistory() {

    app.innerHTML = `

        <section class="help-page">

            <h1>
                Help & Support
            </h1>

            <p>
                How can we help you today?
            </p>

            <div class="help-card">
                <h3>
                    📦 I have an issue with my order
                </h3>
                <p>
                    Get help with an existing order.
                </p>
            </div>

            <div class="help-card">
                <h3>
                    💳 Payment related issues
                </h3>
                <p>
                    Problems with payments, refunds or offers.
                </p>
            </div>

            <div class="help-card">
                <h3>
                    🛵 Delivery related issues
                </h3>
                <p>
                    Track your delivery or report an issue.
                </p>
            </div>

            <div class="help-card">
                <h3>
                    👤 Account & profile
                </h3>
                <p>
                    Manage your account and personal details.
                </p>
            </div>

        </section>

    `;

}


function renderRestaurantWithoutHistory(id) {

    const restaurant =
        restaurants.find(
            r => r.id === id
        );

    if (!restaurant) {

        renderHome();

        return;

    }


    app.innerHTML = `

        <section class="restaurant-page">

            <button
                class="back-button"
                onclick="goBack()"
            >
                ← Back
            </button>

            <div class="restaurant-header">

                <h1>
                    ${restaurant.name}
                </h1>

                <p>
                    ${restaurant.type}
                </p>

                <div class="restaurant-meta">

                    <span>
                        ★ ${restaurant.rating}
                    </span>

                    <span>
                        ${restaurant.time}
                    </span>

                    <span>
                        ₹200 for two
                    </span>

                </div>

            </div>

            <h2 class="menu-title">
                Recommended
            </h2>

            <div class="menu-list">

                ${restaurant.menu.map(item => `

                    <div class="menu-item">

                        <div class="menu-left">

                            <div class="veg">
                                ●
                            </div>

                            <h3 class="menu-name">
                                ${item.name}
                            </h3>

                            <div class="menu-price">
                                ₹${item.price}
                            </div>

                            <p class="menu-description">
                                ${item.description}
                            </p>

                        </div>

                        <div class="menu-right">

                            <img
                                class="menu-image"
                                src="${item.image}"
                            >

                            <button
                                class="add-btn"
                                onclick="addToCart(
                                    ${restaurant.id},
                                    ${item.id}
                                )"
                            >
                                ADD
                            </button>

                        </div>

                    </div>

                `).join("")}

            </div>

        </section>

    `;

}


/* =====================================================
   ESC KEY CLOSES SIGN-IN
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeSignin();

        }

    }
);