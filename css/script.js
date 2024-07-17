document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');

    let cart = [];
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const item = e.target.parentElement;
            const itemName = item.querySelector('img').alt;
            const itemPrice = item.querySelector('.price').textContent;

            cart.push({ name: itemName, price: parseFloat(itemPrice.replace('$', '')) });
            updateCart();
        });
    });

    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = '';
        let totalPrice = 0;
        cart.forEach((item, index) => {
            totalPrice += item.price;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartItems.appendChild(cartItem);
        });
        const totalElement = document.createElement('div');
        totalElement.className = 'cart-total';
        totalElement.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
        cartItems.appendChild(totalElement);
    }

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCart();
    }
});
