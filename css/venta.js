document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('#product-list');
    const cartItemsContainer = document.querySelector('#cart-items');
    const totalPriceEl = document.querySelector('#total-price');
    const checkoutBtn = document.querySelector('#checkout-btn');
    const goToCartBtn = document.querySelector('#go-to-cart-btn');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const products = [
        { name: 'Adidas Formu Low X Bad Bunny', price: '$180.000', image: 'images/Bad Bunny x Adidas _Easter Egg_.jpeg' },
        { name: 'Adidas Forum Low x El Grinsh', price: '$120.000', image: 'images/zapatillas carrusel 4.jpg' },
        { name: 'Nike x Travis Scott', price: '$300.000', image: 'images/zapatillas travis scott.jpeg' },
        { name: 'Nike Air Force 1 Low x Louis Vuitton', price: '$1.000.000', image: 'images/Nike Air Force 1 Low x Louis Vuitton by Virgil Abloh será Leiloado.jpeg' },
        { name: 'Spider-Man: Across the Spider-Verse x Air Jordan 1', price: '$250.000', image: 'images/Spider-Man_ Across the Spider-Verse x Air Jordan 1.jpeg' },
        { name: 'Spider-Man: Across the Spider-Verse edicion Miles Morales Medidador x Air Jordan 1', price: '$400.000', image: 'images/Air Jordan 1 Stash Utility Spider-Verse Series.jpeg' },
        { name: 'Mystery Box X Bad Bunny', price: '$400.000', image: 'images/misterybox Bad bunny.jpeg' },
        { name: 'Mystery Box Jordan Edition', price: '$500.000', image: 'images/misteryboxtienda.jpeg' },
        { name: 'Mystery Box yezzy-supreme-nike-jordan', price: '$700.000', image: 'images/Mysteryboxyezzysupremenikejordan.jpg' },
    ];

    const renderProducts = () => {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('col-md-4');
            productItem.innerHTML = `
                <div class="card mb-4 shadow-sm">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price}</p>
                        <button class="btn btn-primary add-to-cart" data-index="${index}">Agregar al Carrito</button>
                    </div>
                </div>
            `;
            productList.appendChild(productItem);
        });

        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                const product = products[index];
                cartItems.push(product);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateCart();
            });
        });
    };

    const updateCart = () => {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price}</span>
                <button class="btn btn-danger btn-delete remove-item" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            const price = parseFloat(item.price.replace('$', '').replace('.', ''));
            totalPrice += price;
        });

        totalPriceEl.textContent = `$${totalPrice.toLocaleString()}`;

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cartItems.splice(index, 1);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateCart();
            });
        });
    };

    checkoutBtn.addEventListener('click', () => {
        alert('Compra finalizada');
        cartItems = [];
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCart();
    });

    goToCartBtn.addEventListener('click', () => {
        window.location.href = 'carrito.html';
    });

    renderProducts();
    updateCart();
});
