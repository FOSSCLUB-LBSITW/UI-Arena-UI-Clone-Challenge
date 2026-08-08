/* =========================
   CART
========================= */

function getCart() {
    return JSON.parse(localStorage.getItem("foodieCart")) || [];
}


function saveCart(cart) {
    localStorage.setItem("foodieCart", JSON.stringify(cart));
    updateCartCount();
}


function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }
}


/* =========================
   LOGIN DRAWER
========================= */

function openLogin() {

    const overlay = document.getElementById("loginOverlay");

    if (overlay) {
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}


function closeLogin(event) {

    if (event && event.target !== event.currentTarget) {
        return;
    }

    const overlay = document.getElementById("loginOverlay");

    if (overlay) {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }
}


function loginUser(event) {

    event.preventDefault();

    const phone = document.getElementById("phoneNumber").value;

    if (phone.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    alert("OTP sent successfully!");

    closeLogin();
}


/* =========================
   RESTAURANT
========================= */

function openRestaurant(id) {

    window.location.href =
        "pages/restaurant.html?id=" + id;
}


/* =========================
   SEARCH
========================= */

function searchFromHome() {

    const input = document.getElementById("homeSearch");

    const query = input.value.trim();

    if (!query) {
        window.location.href = "pages/search.html";
        return;
    }

    window.location.href =
        "pages/search.html?query=" +
        encodeURIComponent(query);
}


function searchCategory(category) {

    window.location.href =
        "pages/search.html?query=" +
        encodeURIComponent(category);
}


/* =========================
   MOBILE MENU
========================= */

function toggleMobileMenu() {

    const nav = document.querySelector(".nav-links");

    if (!nav) return;

    if (nav.style.display === "flex") {
        nav.style.display = "";
    } else {
        nav.style.display = "flex";
        nav.style.position = "absolute";
        nav.style.top = "65px";
        nav.style.left = "0";
        nav.style.right = "0";
        nav.style.background = "white";
        nav.style.padding = "20px";
        nav.style.flexDirection = "column";
        nav.style.borderBottom = "1px solid #eee";
    }
}
/* =========================
   ADD TO CART
========================= */

function addToCart(name, price, image) {

    let cart = getCart();

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    saveCart(cart);

    showCartBar();

    alert(name + " added to cart!");
}


/* =========================
   CART BAR
========================= */

function showCartBar() {

    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartBar =
        document.getElementById("cartBar");

    const cartBarCount =
        document.getElementById("cartBarCount");

    if (cartBar && cartBarCount) {

        cartBarCount.textContent = totalItems;

        cartBar.classList.add("show");
    }
}


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

        showCartBar();

    }
);
/* =========================
   LOAD CART PAGE
========================= */

function loadCartPage() {

    const cartContent =
        document.getElementById("cartContent");

    if (!cartContent) {
        return;
    }

    const cart = getCart();

    if (cart.length === 0) {

        cartContent.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>Your cart is empty</h2>

                <p>
                    Add something delicious from our
                    restaurants and it will appear here.
                </p>

                <a
                    href="../index.html"
                    class="start-order-button"
                >
                    START ORDERING
                </a>

            </div>
        `;

        return;
    }


    let itemsHTML = "";

    let itemTotal = 0;


    cart.forEach((item, index) => {

        const itemPrice =
            item.price * item.quantity;

        itemTotal += itemPrice;


        itemsHTML += `

            <div class="cart-item">

                <div class="cart-item-image">
                    ${item.image}
                </div>

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Delicious and freshly prepared
                    </p>

                    <div class="cart-item-price">
                        ₹${item.price}
                    </div>

                </div>


                <div class="quantity-control">

                    <button
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            </div>

        `;
    });


    const deliveryFee =
        itemTotal >= 499 ? 0 : 40;

    const taxes =
        Math.round(itemTotal * 0.05);

    const total =
        itemTotal + deliveryFee + taxes;


    cartContent.innerHTML = `

        <div class="cart-layout">

            <div class="cart-items">

                ${itemsHTML}

            </div>


            <div class="bill-card">

                <h2>
                    Bill Details
                </h2>

                <div class="bill-row">

                    <span>
                        Item Total
                    </span>

                    <span>
                        ₹${itemTotal}
                    </span>

                </div>


                <div class="bill-row">

                    <span>
                        Delivery Fee
                    </span>

                    <span>
                        ${deliveryFee === 0
                            ? "FREE"
                            : "₹" + deliveryFee}
                    </span>

                </div>


                <div class="bill-row">

                    <span>
                        Taxes & Charges
                    </span>

                    <span>
                        ₹${taxes}
                    </span>

                </div>


                <div class="bill-row total">

                    <span>
                        To Pay
                    </span>

                    <span>
                        ₹${total}
                    </span>

                </div>


                <button
                    class="checkout-button"
                    onclick="checkout()"
                >
                    PROCEED TO CHECKOUT
                </button>

            </div>

        </div>

    `;
}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(index, change) {

    let cart = getCart();

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart(cart);

    loadCartPage();
}


/* =========================
   REMOVE ITEM
========================= */

function removeFromCart(index) {

    let cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    loadCartPage();
}


/* =========================
   CHECKOUT
========================= */

function checkout() {

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    alert(
        "Order placed successfully! 🎉\n\n" +
        "Thank you for ordering with Foodie."
    );


    localStorage.removeItem("foodieCart");

    updateCartCount();

    loadCartPage();
}
/* =========================
   SEARCH DATA
========================= */

/* =========================
   RESTAURANTS
========================= */

const searchRestaurants = [

    {
        id: 1,
        name: "Big Bowl Kitchen",
        category: "Burgers, American, Fast Food",
        rating: "4.5",
        time: "25-30 min",
        price: "₹250 for two",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 2,
        name: "Malabar Spice",
        category: "Biryani, Kerala, South Indian",
        rating: "4.7",
        time: "30-35 min",
        price: "₹350 for two",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 3,
        name: "La Pino's Pizza",
        category: "Pizza, Italian, Fast Food",
        rating: "4.4",
        time: "25-30 min",
        price: "₹400 for two",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 4,
        name: "Wok This Way",
        category: "Chinese, Asian, Noodles",
        rating: "4.3",
        time: "20-25 min",
        price: "₹300 for two",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 5,
        name: "Udupi Grand",
        category: "South Indian, Breakfast, Snacks",
        rating: "4.6",
        time: "20-25 min",
        price: "₹200 for two",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 6,
        name: "Sweet Truth",
        category: "Desserts, Cakes, Ice Cream",
        rating: "4.2",
        time: "25-30 min",
        price: "₹300 for two",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
    }

];

/* =========================
   FOOD ITEMS
========================= */

const searchFoods = [
{
    id: 101,
    name: "Chicken Biryani",
    category: "Biryani",
    restaurant: "Malabar Spice",
    rating: "4.7",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80"
},
    {
        id: 102,
        name: "Chicken Mandi",
        category: "Mandi",
        restaurant: "Arabian Nights",
        rating: "4.6",
        price: "₹250",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 103,
        name: "Porotta & Chicken Curry",
        category: "Kerala",
        restaurant: "Kerala Kitchen",
        rating: "4.5",
        price: "₹160",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 104,
        name: "Chicken Fried Rice",
        category: "Chinese",
        restaurant: "Wok This Way",
        rating: "4.4",
        price: "₹170",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 105,
        name: "Chicken Shawarma",
        category: "Shawarma",
        restaurant: "Arabian Bites",
        rating: "4.6",
        price: "₹120",
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 106,
        name: "Paneer Butter Masala",
        category: "North Indian",
        restaurant: "Spice Garden",
        rating: "4.5",
        price: "₹190",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 107,
        name: "Gobi Manchurian",
        category: "Chinese",
        restaurant: "Wok This Way",
        rating: "4.3",
        price: "₹150",
        image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 108,
        name: "Chicken Fry",
        category: "South Indian",
        restaurant: "Malabar Spice",
        rating: "4.6",
        price: "₹200",
        image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 109,
        name: "Veg Fried Rice",
        category: "Chinese",
        restaurant: "Dragon House",
        rating: "4.4",
        price: "₹140",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 110,
        name: "Chicken 65",
        category: "South Indian",
        restaurant: "Spice Hub",
        rating: "4.5",
        price: "₹180",
        image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=600&q=80"
    }

];

/* =========================
   LOAD SEARCH PAGE
========================= */

function loadSearchPage() {

    const resultsContainer =
        document.getElementById("searchResults");

    if (!resultsContainer) {
        return;
    }


    const params =
        new URLSearchParams(window.location.search);

    const query =
        params.get("query") || "";


    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {
        searchInput.value = query;
    }


    displaySearchResults(query);
}

/* =========================
   DISPLAY SEARCH RESULTS
========================= */

function displaySearchResults(query) {

    const resultsContainer =
        document.getElementById("searchResults");

    const resultsTitle =
        document.getElementById("resultsTitle");

    const resultCount =
        document.getElementById("resultCount");


    if (!resultsContainer) {
        return;
    }


    const searchTerm =
        query.trim().toLowerCase();


    let restaurants;
    let foods;


    /* =========================
       FILTER RESTAURANTS
    ========================= */

    if (searchTerm === "") {

        restaurants = searchRestaurants;

    } else {

        restaurants =
            searchRestaurants.filter(restaurant => {

                const searchableText =
                    (
                        restaurant.name +
                        " " +
                        restaurant.category
                    ).toLowerCase();

                return searchableText.includes(searchTerm);

            });

    }


    /* =========================
       FILTER FOOD ITEMS
    ========================= */

    if (searchTerm === "") {

        foods = searchFoods;

    } else {

        foods =
            searchFoods.filter(food => {

                const searchableText =
                    (
                        food.name +
                        " " +
                        food.category +
                        " " +
                        food.restaurant
                    ).toLowerCase();

                return searchableText.includes(searchTerm);

            });

    }


    const totalResults =
        restaurants.length + foods.length;


    /* =========================
       TITLE
    ========================= */

    if (resultsTitle) {

        if (searchTerm) {

            resultsTitle.textContent =
                `Results for "${query}"`;

        } else {

            resultsTitle.textContent =
                "Popular restaurants & dishes";

        }

    }


    /* =========================
       RESULT COUNT
    ========================= */

    if (resultCount) {

        resultCount.textContent =
            `${totalResults} results`;

    }


    /* =========================
       NO RESULTS
    ========================= */

    if (totalResults === 0) {

        resultsContainer.innerHTML = `

            <div class="no-results">

                <div>🔍</div>

                <h3>
                    No food found
                </h3>

                <p>
                    Try searching for biryani, mandi,
                    shawarma, pizza or another dish.
                </p>

            </div>

        `;

        return;
    }


    let html = "";


    /* =========================
       RESTAURANT CARDS
    ========================= */

    restaurants.forEach(restaurant => {

        html += `

            <article
                class="search-card restaurant-search-card"
                onclick="openRestaurant(${restaurant.id})"
            >

                <div class="search-card-image">

                    <img
                        src="${restaurant.image}"
                        alt="${restaurant.name}"
                        loading="lazy"
                    >

                </div>


                <div class="search-card-info">

                    <span class="search-type">
                        RESTAURANT
                    </span>

                    <h3>
                        ${restaurant.name}
                    </h3>

                    <p>
                        ${restaurant.category}
                    </p>


                    <div class="search-card-meta">

                        <span class="search-card-rating">
                            ★ ${restaurant.rating}
                        </span>

                        <span>
                            • ${restaurant.time}
                        </span>

                        <span>
                            • ${restaurant.price}
                        </span>

                    </div>

                </div>

            </article>

        `;

    });


    /* =========================
       FOOD CARDS
    ========================= */

    foods.forEach(food => {

        html += `

            <article class="search-card food-search-card">

                <div class="food-image">

                    <img
                        src="${food.image}"
                        alt="${food.name}"
                        loading="lazy"
                    >

                </div>


                <div class="search-card-info">

                    <span class="search-type food-label">
                        DISH
                    </span>

                    <h3>
                        ${food.name}
                    </h3>

                    <p>
                        ${food.restaurant}
                        •
                        ${food.category}
                    </p>


                    <div class="search-card-meta">

                        <span class="search-card-rating">
                            ★ ${food.rating}
                        </span>

                        <span>
                            • ${food.price}
                        </span>

                    </div>

                </div>

            </article>

        `;

    });


    resultsContainer.innerHTML = html;

}
/* =========================
   PERFORM SEARCH
========================= */

function performSearch() {

    const input =
        document.getElementById("searchInput");

    if (!input) {
        return;
    }


    const query =
        input.value.trim();


    window.location.href =
        "search.html?query=" +
        encodeURIComponent(query);

}


/* =========================
   POPULAR SEARCH
========================= */

function setSearch(value) {

    const input =
        document.getElementById("searchInput");

    if (input) {

        input.value = value;

        performSearch();

    }

}


/* =========================
   SEARCH ENTER KEY
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            document.activeElement &&
            document.activeElement.id === "searchInput"
        ) {

            performSearch();

        }

    }
);


/* =========================
   SEARCH PAGE INIT
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadSearchPage();

    }
);
/* =========================
   FAQ
========================= */

function toggleFAQ(button) {

    const item = button.closest(".faq-item");

    if (!item) {
        return;
    }

    item.classList.toggle("active");

    const icon = button.querySelector("span");

    if (item.classList.contains("active")) {
        icon.textContent = "−";
    } else {
        icon.textContent = "+";
    }
}
/* =========================
   FAQ SEARCH
========================= */
function filterFAQs() {

    const input = document.getElementById("helpSearch");

    const faqList = document.getElementById("faqList");

    if (!input || !faqList) {
        return;
    }

    const query = input.value.trim().toLowerCase();

    const faqItems = faqList.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector("button").textContent.toLowerCase();

        const answer =
            item.querySelector(".faq-answer").textContent.toLowerCase();

        if (
            query === "" ||
            question.includes(query) ||
            answer.includes(query)
        ) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }

    });
}
/* =========================
   CONTACT SUPPORT
========================= */

function contactSupport() {

    alert(
        "Support request received! 😊\n\n" +
        "Our support team will get back to you soon."
    );

}
/* =========================
   PAGE NAVIGATION
========================= */

function goBack() {

    if (window.history.length > 1) {

        window.history.back();

    } else {

        window.location.href = "../index.html";

    }

}



