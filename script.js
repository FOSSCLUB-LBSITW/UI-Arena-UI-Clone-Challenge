/* =====================================
   RESTAURANT DATA
===================================== */
const restaurants = [

    {
        id: 1,
        name: "Tharavadu Kitchen",

        image:
            "images/tharavadu_kitchen.jpg",

        rating: "4.6",
        time: "30 mins",
        food: "Kerala Meals, South Indian",

        menu: [
            ["Kerala Meals", 180],
            ["Puttu & Kadala Curry", 140],
            ["Appam & Chicken Stew", 220],
            ["Kappa & Fish Curry", 200],
            ["Pazham Pori", 80]
        ]
    },


    {
        id: 2,
        name: "Malabar Treat",

        image:
            "images/malabar_treat.jpg",

        rating: "4.5",
        time: "35 mins",
        food: "Malabar, Kerala",

        menu: [
            ["Malabar Chicken Biryani", 250],
            ["Malabar Beef Biryani", 280],
            ["Chicken Fry", 220],
            ["Parotta & Chicken Curry", 230],
            ["Unniyappam", 90]
        ]
    },


    {
        id: 3,
        name: "Coconut Tree Restaurant",

        image:
            "images/coconut_tree_restaurant.jpg",

        rating: "4.4",
        time: "30 mins",
        food: "Kerala, Vegetarian",

        menu: [
            ["Kerala Sadya", 250],
            ["Avial", 120],
            ["Vegetable Stew", 140],
            ["Dosa & Sambar", 110],
            ["Palada Payasam", 100]
        ]
    },


    {
        id: 4,
        name: "Naadan Thattukada",

        image:
            "images/naadan_thattukada.jpg",

        rating: "4.7",
        time: "25 mins",
        food: "Naadan Food, Thattukada",

        menu: [
            ["Porotta & Beef Curry", 240],
            ["Kappa & Beef Curry", 220],
            ["Chicken Fry", 200],
            ["Egg Roast & Porotta", 160],
            ["Chatti Pathiri", 120]
        ]
    },


    {
        id: 5,
        name: "Backwater Cafe",

        image:
            "images/backwater_cafe.jpg",

        rating: "4.5",
        time: "30 mins",
        food: "Kerala, Cafe",

        menu: [
            ["Karimeen Fry", 350],
            ["Fish Curry Meals", 250],
            ["Prawns Fry", 320],
            ["Kappa & Fish Curry", 220],
            ["Payasam", 100]
        ]
    }

];
/* =====================================
   CART
===================================== */

let cart = [];


/* MAIN CONTENT */

const main =
    document.getElementById("mainContent");


/* =====================================
   HOME PAGE
===================================== */

function showHome() {

    main.innerHTML = `

        <section class="hero">

            <h1>
                Order food from your
                favourite restaurants
            </h1>

            <div
                class="search-box"
                onclick="showSearch()"
            >

                🔍 Search for food or restaurant

            </div>

        </section>


        <section class="container">

            <h2>
                What's on your mind?
            </h2>


            <div class="categories">

    <div class="category" onclick="showCategory('Meals', '🍛')">
        🍛
        <span>Meals</span>
    </div>

    <div class="category" onclick="showCategory('Dosa', '🥞')">
        🥞
        <span>Dosa</span>
    </div>

    <div class="category" onclick="showCategory('Appam', '🥘')">
        🥘
        <span>Appam</span>
    </div>

    <div class="category" onclick="showCategory('Chicken', '🍗')">
        🍗
        <span>Chicken</span>
    </div>

    <div class="category" onclick="showCategory('Fish', '🐟')">
        🐟
        <span>Fish</span>
    </div>

    <div class="category" onclick="showCategory('Desserts', '🍰')">
        🍰
        <span>Desserts</span>
    </div>

</div>


            <h2>
                Restaurants near you
            </h2>


            <div class="restaurant-grid">

                ${restaurantCards(restaurants)}

            </div>

        </section>

    `;

}


/* =====================================
   CATEGORY DETAIL PAGE
===================================== */

const categoryKeywords = {
    "Meals": ["meals", "sadya", "avial", "stew", "thali", "curry"],
    "Dosa": ["dosa", "sambar", "idli", "uttapam"],
    "Appam": ["appam", "puttu", "porotta", "parotta", "roast", "pathiri"],
    "Chicken": ["chicken"],
    "Fish": ["fish", "karimeen", "prawns"],
    "Desserts": ["payasam", "pazham pori", "unniyappam", "dessert", "sweet"]
};

function getDishesByCategory(categoryName) {
    const keywords = categoryKeywords[categoryName] || [categoryName.toLowerCase()];
    const results = [];
    restaurants.forEach(restaurant => {
        restaurant.menu.forEach(item => {
            const dishName = item[0];
            const price = item[1];
            const matches = keywords.some(kw => dishName.toLowerCase().includes(kw) || restaurant.food.toLowerCase().includes(kw));
            if (matches) {
                results.push({
                    dishName: dishName,
                    price: price,
                    restaurantId: restaurant.id,
                    restaurantName: restaurant.name,
                    rating: restaurant.rating,
                    time: restaurant.time,
                    image: restaurant.image
                });
            }
        });
    });
    return results;
}

function showCategory(categoryName, emoji) {
    const dishes = getDishesByCategory(categoryName);
    const keywords = categoryKeywords[categoryName] || [categoryName.toLowerCase()];
    const matchingRestaurants = restaurants.filter(r => {
        return r.menu.some(item => keywords.some(kw => item[0].toLowerCase().includes(kw))) ||
               keywords.some(kw => r.food.toLowerCase().includes(kw));
    });

    const categoryList = [
        { name: "Meals", emoji: "🍛" },
        { name: "Dosa", emoji: "🥞" },
        { name: "Appam", emoji: "🥘" },
        { name: "Chicken", emoji: "🍗" },
        { name: "Fish", emoji: "🐟" },
        { name: "Desserts", emoji: "🍰" }
    ];

    main.innerHTML = `
        <div class="container category-page">
            <button class="back-btn" onclick="showHome()">
                ← Back to Home
            </button>

            <div class="category-header-banner">
                <span class="category-banner-emoji">${emoji}</span>
                <div>
                    <h1>${categoryName}</h1>
                    <p>${dishes.length} delicious ${categoryName.toLowerCase()} options available across restaurants</p>
                </div>
            </div>

            <!-- Filter Tabs -->
            <div class="categories category-filter-tabs">
                ${categoryList.map(cat => `
                    <div class="category ${cat.name === categoryName ? 'active-cat' : ''}" onclick="showCategory('${cat.name}', '${cat.emoji}')">
                        ${cat.emoji}
                        <span>${cat.name}</span>
                    </div>
                `).join("")}
            </div>

            <h2>Available ${categoryName} Items (${dishes.length})</h2>

            <div class="dish-grid">
                ${dishes.length > 0 ? dishes.map(dish => `
                    <div class="dish-card">
                        <div class="dish-header">
                            <span class="dish-restaurant-badge" onclick="showRestaurant(${dish.restaurantId})">
                                🏪 ${dish.restaurantName}
                            </span>
                            <span class="dish-rating">⭐ ${dish.rating} • ${dish.time}</span>
                        </div>
                        <div class="dish-body">
                            <div>
                                <h3 class="dish-title">${dish.dishName}</h3>
                                <p class="dish-price">₹${dish.price}</p>
                            </div>
                            <button class="add-btn" onclick="addToCart('${dish.dishName.replace(/'/g, "\\'")}', ${dish.price})">
                                ADD
                            </button>
                        </div>
                    </div>
                `).join("") : `
                    <p>No dishes found in this category.</p>
                `}
            </div>

            <h2 style="margin-top: 36px; margin-bottom: 20px;">Restaurants serving ${categoryName}</h2>
            <div class="restaurant-grid">
                ${restaurantCards(matchingRestaurants)}
            </div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* =====================================
   RESTAURANT CARDS
===================================== */

function restaurantCards(list) {

    return list.map(restaurant => `

        <div
            class="restaurant-card"
            onclick="showRestaurant(${restaurant.id})"
        >

            <img
                src="${restaurant.image}"
                alt="${restaurant.name}"
            >


            <div class="restaurant-info">

                <h3>
                    ${restaurant.name}
                </h3>


                <p>
                    ⭐ ${restaurant.rating}
                    • ${restaurant.time}
                </p>


                <p>
                    ${restaurant.food}
                </p>

            </div>

        </div>

    `).join("");

}


/* =====================================
   RESTAURANT PAGE
===================================== */

function showRestaurant(id) {

    const restaurant =
        restaurants.find(
            r => r.id === id
        );

    if (!restaurant) return;

    main.innerHTML = `

        <div class="container restaurant-detail-page">

            <button class="back-btn" onclick="showHome()">
                ← Back to Home
            </button>

            <div class="restaurant-banner-card">
                <img
                    src="${restaurant.image}"
                    alt="${restaurant.name}"
                    class="restaurant-banner-img"
                >
                <div class="restaurant-banner-content">
                    <h1>${restaurant.name}</h1>
                    <p class="restaurant-banner-food">🍲 ${restaurant.food}</p>
                    <div class="restaurant-banner-meta">
                        <span class="meta-badge rating">⭐ ${restaurant.rating}</span>
                        <span class="meta-badge time">⏱️ ${restaurant.time}</span>
                        <span class="meta-badge count">📜 ${restaurant.menu.length} Items</span>
                    </div>
                </div>
            </div>

            <h2 style="margin-bottom: 20px;">Full Menu (${restaurant.menu.length} Items)</h2>

            <div class="dish-grid">

                ${restaurant.menu.map(item => `

                    <div class="dish-card">

                        <div class="dish-header">
                            <span class="dish-restaurant-badge">
                                🍽️ ${restaurant.name}
                            </span>
                            <span class="dish-rating">⭐ ${restaurant.rating} • ${restaurant.time}</span>
                        </div>

                        <div class="dish-body">

                            <div>
                                <h3 class="dish-title">
                                    ${item[0]}
                                </h3>

                                <p class="dish-price">
                                    ₹${item[1]}
                                </p>
                            </div>

                            <button
                                class="add-btn"
                                onclick="addToCart(
                                    '${item[0].replace(/'/g, "\\'")}',
                                    ${item[1]}
                                )"
                            >
                                ADD
                            </button>

                        </div>

                    </div>

                `).join("")}

            </div>

        </div>

    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });

}


/* =====================================
   ADD TO CART
===================================== */

function addToCart(name, price) {

    const existing =
        cart.find(
            item => item.name === name
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCartCount();


    alert(
        name + " added to cart!"
    );

}


/* =====================================
   UPDATE CART COUNT
===================================== */

function updateCartCount() {
    let count = 0;
    cart.forEach(item => {
        count += item.quantity;
    });

    const desktopCount = document.getElementById("cartCount");
    if (desktopCount) desktopCount.innerText = count;

    const mobileCount = document.getElementById("cartCountMobile");
    if (mobileCount) mobileCount.innerText = count;
}


/* =====================================
   CART PAGE
===================================== */

function showCart() {

    if (cart.length === 0) {

        main.innerHTML = `

            <div class="container cart-page">

                <h1>
                    Your Cart
                </h1>


                <div class="empty-cart">

                    <h2>
                        Your cart is empty 🛒
                    </h2>

                    <p>
                        Add some delicious food!
                    </p>

                </div>

            </div>

        `;

        return;

    }


    main.innerHTML = `

        <div class="container cart-page">

            <h1>
                Your Cart
            </h1>

            <br>

            <div id="cartItems"></div>


            <div class="cart-total">

                <h2 id="total">
                </h2>


                <button
                    class="order-btn"
                    onclick="placeOrder()"
                >

                    PLACE ORDER

                </button>

            </div>

        </div>

    `;


    const cartItems =
        document.getElementById(
            "cartItems"
        );


    let total = 0;


    cartItems.innerHTML =
        cart.map((item, index) => {

            total +=
                item.price *
                item.quantity;


            return `

                <div class="cart-item">

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ₹${item.price}
                        </p>

                    </div>


                    <div class="quantity">

                        <button
                            onclick="decreaseItem(${index})"
                        >
                            -
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="increaseItem(${index})"
                        >
                            +
                        </button>

                    </div>

                </div>

            `;

        }).join("");


    document.getElementById(
        "total"
    ).innerText =
        "Total: ₹" + total;

}


/* =====================================
   INCREASE CART ITEM
===================================== */

function increaseItem(index) {

    cart[index].quantity++;

    updateCartCount();

    showCart();

}


/* =====================================
   DECREASE CART ITEM
===================================== */

function decreaseItem(index) {

    cart[index].quantity--;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(index, 1);

    }


    updateCartCount();

    showCart();

}


/* =====================================
   PLACE ORDER
===================================== */

function placeOrder() {

    alert(
        "Order placed successfully! 🎉"
    );


    cart = [];


    updateCartCount();

    showCart();

}


/* =====================================
   SEARCH PAGE
===================================== */

function showSearch() {

    main.innerHTML = `

        <div class="container search-page">

            <h1>
                Search
            </h1>


            <input
                type="text"
                id="searchInput"
                class="search-input"
                placeholder="Search for food or restaurant"
                onkeyup="searchRestaurants()"
            >


            <h2>
                Restaurants
            </h2>


            <div
                id="searchResults"
                class="restaurant-grid"
            >

                ${restaurantCards(restaurants)}

            </div>

        </div>

    `;

}


/* =====================================
   SEARCH RESTAURANTS
===================================== */

function searchRestaurants() {

    const input =
        document.getElementById("searchInput");

    const value =
        input.value.toLowerCase().trim();


    const results =
        restaurants.filter(restaurant =>

            restaurant.name
                .toLowerCase()
                .includes(value)

            ||

            restaurant.food
                .toLowerCase()
                .includes(value)

        );


    const searchResults =
        document.getElementById("searchResults");


    if (results.length === 0) {

        searchResults.innerHTML = `

            <div class="not-found">

                <div class="not-found-icon">
                    🔍
                </div>

                <h2>
                    Item not found
                </h2>

                <p>
                    Sorry, we couldn't find
                    what you're looking for.
                </p>

            </div>

        `;

    }

    else {

        searchResults.innerHTML =
            restaurantCards(results);

    }

}


/* =====================================
   HELP PAGE
===================================== */

function showHelp() {

    main.innerHTML = `

        <div class="container help-page">

            <h1>Help & Support</h1>

            <p>How can we help you?</p>

            <div class="help-options">

                <button onclick="showOrderHelp()">
                    I have an issue with my order
                </button>

                <button onclick="showPaymentHelp()">
                    Payment related issue
                </button>

                <button onclick="showAccountHelp()">
                    Account related issue
                </button>

                <button onclick="showOtherHelp()">
                    Other
                </button>

            </div>

        </div>

    `;

}
function showOrderHelp() {

    main.innerHTML = `

        <div class="container help-page">

            <h1>Order Help</h1>

            <p>
                What problem are you facing with your order?
            </p>

            <div class="help-options">

                <button onclick="showLateOrder()">
                    My order is late
                </button>

                <button onclick="showCancelledOrder()">
                    My order was cancelled
                </button>

                <button onclick="showWrongItem()">
                    I received the wrong item
                </button>

                <button onclick="showMissingItem()">
                    My order is missing
                </button>

            </div>

            <button
                class="back-btn"
                onclick="showHelp()"
            >
                ← Back to Help
            </button>

        </div>

    `;

}

function showLateOrder() {

    main.innerHTML = `

        <div class="container help-response">

            <div class="success-icon">
                ❤️
            </div>

            <h1>
                We're sorry about the delay!
            </h1>

            <p>
                We understand how frustrating it can be
                to wait for your food.
            </p>

            <p>
                Our team will look into it and make sure
                your order reaches you as soon as possible.
            </p>

            <button
                class="order-btn"
                onclick="showHelp()"
            >
                Okay, thank you
            </button>

        </div>

    `;

}


function showCancelledOrder() {

    main.innerHTML = `

        <div class="container help-response">

            <div class="success-icon">
                ❤️
            </div>

            <h1>
                We're sorry about that!
            </h1>

            <p>
                We understand that a cancelled order
                can be disappointing.
            </p>

            <p>
                Our team will look into the issue and
                help you with the next steps.
            </p>

            <button
                class="order-btn"
                onclick="showHelp()"
            >
                Okay, thank you
            </button>

        </div>

    `;

}

function showWrongItem() {

    main.innerHTML = `

        <div class="container help-response">

            <div class="success-icon">
                ❤️
            </div>

            <h1>
                We're sorry about that!
            </h1>

            <p>
                We understand that receiving the wrong
                item can be frustrating.
            </p>

            <p>
                Our team will look into it and help
                resolve the issue.
            </p>

            <button
                class="order-btn"
                onclick="showHelp()"
            >
                Okay, thank you
            </button>

        </div>

    `;

}

function showMissingItem() {

    main.innerHTML = `

        <div class="container help-response">

            <div class="success-icon">
                ❤️
            </div>

            <h1>
                We're sorry about the missing item!
            </h1>

            <p>
                We understand how disappointing it is to have an item missing from your order.
            </p>

            <p>
                Our team will process a refund or replacement right away.
            </p>

            <button
                class="order-btn"
                onclick="showHelp()"
            >
                Okay, thank you
            </button>

        </div>

    `;

}

function showPaymentHelp() {

    main.innerHTML = `

        <div class="container help-page">

            <h1>Payment Help</h1>

            <p>
                What payment issue are you facing?
            </p>

            <div class="help-options">

                <button onclick="showPaymentResponse()">
                    Payment failed
                </button>

                <button onclick="showPaymentResponse()">
                    Money was deducted
                </button>

                <button onclick="showPaymentResponse()">
                    Refund not received
                </button>

                <button onclick="showPaymentResponse()">
                    Payment method problem
                </button>

            </div>

            <button
                class="back-btn"
                onclick="showHelp()"
            >
                ← Back to Help
            </button>

        </div>

    `;

}


function showPaymentResponse() {

    main.innerHTML = `

        <div class="container help-response">

            <div class="success-icon">
                ❤️
            </div>

            <h1>
                Don't worry!
            </h1>

            <p>
                We understand your concern regarding
                the payment.
            </p>

            <p>
                Our team will look into the transaction
                and help resolve the issue.
            </p>

            <button
                class="order-btn"
                onclick="showHelp()"
            >
                Okay, thank you
            </button>

        </div>

    `;

}

function showAccountHelp() {

    main.innerHTML = `

        <div class="container help-page">

            <h1>Account Help</h1>

            <p>
                What account issue are you facing?
            </p>

            <div class="help-options">

                <button onclick="showAccountResponse()">
                    I cannot access my account
                </button>

                <button onclick="showAccountResponse()">
                    Change phone number
                </button>

                <button onclick="showAccountResponse()">
                    Change personal details
                </button>

                <button onclick="showAccountResponse()">
                    Other account issue
                </button>

            </div>

            <button
                class="back-btn"
                onclick="showHelp()"
            >
                ← Back to Help
            </button>

        </div>

    `;

}


function showAccountResponse() {

    main.innerHTML = `

        <div class="container help-response">

            <div class="success-icon">
                ❤️
            </div>

            <h1>
                We'll help you with that!
            </h1>

            <p>
                We understand your concern.
            </p>

            <p>
                Our team will look into the issue and
                help you get it resolved.
            </p>

            <button
                class="order-btn"
                onclick="showHelp()"
            >
                Okay, thank you
            </button>

        </div>

    `;

}

function showOtherHelp() {

    main.innerHTML = `

        <div class="container help-page">

            <h1>Other Help</h1>

            <p>
                Choose an option below.
            </p>

            <div class="help-options">

                <button onclick="showOtherResponse()">
                    Delivery related issue
                </button>

                <button onclick="showOtherResponse()">
                    Restaurant related issue
                </button>

                <button onclick="showOtherResponse()">
                    Feedback
                </button>

                <button onclick="showOtherResponse()">
                    Something else
                </button>

            </div>

            <button
                class="back-btn"
                onclick="showHelp()"
            >
                ← Back to Help
            </button>

        </div>

    `;

}


function showOtherResponse() {

    main.innerHTML = `

        <div class="container help-response">

            <div class="success-icon">
                ❤️
            </div>

            <h1>
                Thank you for letting us know!
            </h1>

            <p>
                We appreciate your feedback.
            </p>

            <p>
                Our team will look into it and work
                towards providing you with a better
                experience.
            </p>

            <button
                class="order-btn"
                onclick="showHelp()"
            >
                Okay, thank you
            </button>

        </div>

    `;

}


/* =====================================
   START WEBSITE
===================================== */

showHome();