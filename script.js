/* =====================================
   RESTAURANT DATA
===================================== */

/* =====================================
   KERALA RESTAURANT DATA
===================================== */

const restaurants = [

    {
        id: 1,

        name: "Tharavadu Kitchen",

        image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950",

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
            "https://images.unsplash.com/photo-1563379091339-03246963d51a",

        rating: "4.5",

        time: "35 mins",

        food: "Malabar, Biryani",

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
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d",

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
            "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7",

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
            "https://images.unsplash.com/photo-1547592180-85f173990554",

        rating: "4.5",

        time: "30 mins",

        food: "Kerala, Seafood",

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

    <div class="category">
        🍛
        <span>Meals</span>
    </div>

    <div class="category">
        🥞
        <span>Dosa</span>
    </div>

    <div class="category">
        🥘
        <span>Appam</span>
    </div>

    <div class="category">
        🍗
        <span>Chicken</span>
    </div>

    <div class="category">
        🐟
        <span>Fish</span>
    </div>

    <div class="category">
        🍰
        <span>Desserts</span>
    </div>

</div>ss


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


    main.innerHTML = `

        <div class="container">

            <div class="restaurant-header">

                <h1>
                    ${restaurant.name}
                </h1>


                <p>
                    ⭐ ${restaurant.rating}
                    • ${restaurant.time}
                </p>


                <p>
                    ${restaurant.food}
                </p>

            </div>


            <h2>
                Menu
            </h2>


            <div class="menu-list">

                ${restaurant.menu.map(item => `

                    <div class="menu-item">

                        <div>

                            <h3>
                                ${item[0]}
                            </h3>

                            <p>
                                ₹${item[1]}
                            </p>

                        </div>


                        <button
                            class="add-btn"
                            onclick="addToCart(
                                '${item[0]}',
                                ${item[1]}
                            )"
                        >

                            ADD

                        </button>

                    </div>

                `).join("")}

            </div>

        </div>

    `;

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


    document.getElementById(
        "cartCount"
    ).innerText = count;

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