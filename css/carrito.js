document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('#cart-items-container');
    const totalPriceEl = document.querySelector('#total-price');
    const checkoutBtn = document.querySelector('#checkout-btn');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const updateCart = () => {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        // Ordenar los productos por precio en orden descendente
        cartItems.sort((a, b) => {
            const priceA = parseFloat(a.price.replace('$', '').replace('.', ''));
            const priceB = parseFloat(b.price.replace('$', '').replace('.', ''));
            return priceB - priceA;
        });

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-3', 'p-2', 'border');

            cartItem.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${item.image}" class="img-thumbnail mr-3" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover;">
                    <div>
                        <h5 class="mb-1">${item.name}</h5>
                        <p class="mb-1">${item.price}</p>
                    </div>
                </div>
                <button class="btn btn-danger remove-item" data-index="${index}">Eliminar</button>
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

    updateCart();
});
