let navLinks = document.querySelectorAll('.nav-link');
let pages = document.querySelectorAll('.page');
let navbar = document.querySelector('.glass-nav');
let scrollBtn = document.querySelector('#scroll-up-btn');
let cartData = JSON.parse(localStorage.getItem('artisanCart')) || [];
let cartCount = document.querySelector('#cart-count');
let cartItems = document.querySelector('#cart-items');
let totalDisplay = document.querySelector('#total-display');
const switchPage = (targetId) => {
    pages.forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });
    let targetPage = document.querySelector(`#${targetId}`);
    if(targetPage){
        targetPage.classList.remove('hidden');
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
    }
}
navLinks.forEach(link => {
    link.onclick = (e) => {
        e.preventDefault();
        let target = link.getAttribute('data-page');
        switchPage(target);
    }
});
const updateCartUI = () => {
    let totalQty = 0;
    cartData.forEach(item => totalQty += item.qty);
    cartCount.innerText = totalQty;
    if (cartData.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg">Your cart is currently empty.</p>';
        totalDisplay.innerText = "0";
    } else {
        let totalMoney = 0;
        let html = '';
        
        cartData.forEach((item, index) => {
            totalMoney += item.price * item.qty;
            html += `
                <div class="cart-row">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>$${item.price} x ${item.qty}</small>
                    </div>
                    <div>
                        <span>$${item.price * item.qty}</span>
                        <span class="remove-text" data-index="${index}" style="color:red; cursor:pointer; margin-left:10px;">Remove</span>
                    </div>
                </div>
            `;
        });
        cartItems.innerHTML = html;
        totalDisplay.innerText = totalMoney;
        document.querySelectorAll('.remove-text').forEach(btn => {
            btn.onclick = () => {
                let index = btn.getAttribute('data-index');
                cartData.splice(index, 1);
                saveCart();
            }
        });
    }
}
const saveCart = () => {
    localStorage.setItem('artisanCart', JSON.stringify(cartData));
    updateCartUI();
}
let addButtons = document.querySelectorAll('.add-btn');
addButtons.forEach(btn => {
    btn.onclick = () => {
        let card = btn.closest('.card');
        let product = {
            id: card.getAttribute('data-id'),
            name: card.getAttribute('data-name'),
            price: parseInt(card.getAttribute('data-price'))
        };
        let existing = cartData.find(item => item.id === product.id);
        if(existing){
            existing.qty++;
        } else {
            cartData.push({...product, qty: 1});
        }
        
        saveCart();
        alert(`${product.name} Added!`);
    }
});
let checkoutBtn = document.querySelector('#checkout-btn');
if(checkoutBtn){
    checkoutBtn.onclick = () => {
        if(cartData.length == 0){
            alert("Cart is empty!");
        } else {
            alert("Order Placed!");
            cartData = [];
            saveCart();
            switchPage('home');
        }
    }
}
let loginForm = document.querySelector('#login-form');
if(loginForm){
    loginForm.onsubmit = (e) => {
        e.preventDefault();
        alert("Login Successful!");
        switchPage('home');
    }
}
let registerForm = document.querySelector('#register-form');
if(registerForm){
    registerForm.onsubmit = (e) => {
        e.preventDefault();
        alert("Account Created!");
        switchPage('login');
    }
}
let contactForm = document.querySelector('#contact-form');
if(contactForm){
    contactForm.onsubmit = (e) => {
        e.preventDefault();
        alert("Message Sent!");
        contactForm.reset();
    }
}
window.onscroll = () => {
    if(window.scrollY > 0){
        navbar.classList.add('shadow'); 
        if(scrollBtn) scrollBtn.style.display = "block";
    } else {
        navbar.classList.remove('shadow');
        if(scrollBtn) scrollBtn.style.display = "none";
    }
}
if(scrollBtn){
    scrollBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
updateCartUI();