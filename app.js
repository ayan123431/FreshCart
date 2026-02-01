
    
        const products = [
            { id: 1, name: 'Wireless Headphones', price: 2999, oldPrice: 4999, discount: 40, category: 'electronics', icon: '🎧' },
            { id: 2, name: 'Smart Watch', price: 5999, oldPrice: 9999, discount: 40, category: 'electronics', icon: '⌚' },
            { id: 3, name: 'Casual T-Shirt', price: 799, oldPrice: 1299, discount: 38, category: 'fashion', icon: '👕' },
            { id: 4, name: 'Running Shoes', price: 3499, oldPrice: 5999, discount: 42, category: 'fashion', icon: '👟' },
            { id: 5, name: 'Coffee Maker', price: 4999, oldPrice: 7999, discount: 38, category: 'home', icon: '☕' },
            { id: 6, name: 'LED Table Lamp', price: 1299, oldPrice: 2499, discount: 48, category: 'home', icon: '💡' },
            { id: 7, name: 'Lipstick Set', price: 899, oldPrice: 1499, discount: 40, category: 'beauty', icon: '💄' },
            { id: 8, name: 'Face Cream', price: 1599, oldPrice: 2499, discount: 36, category: 'beauty', icon: '🧴' },
            { id: 9, name: 'Football', price: 1999, oldPrice: 3499, discount: 43, category: 'sports', icon: '⚽' },
            { id: 10, name: 'Yoga Mat', price: 1299, oldPrice: 1999, discount: 35, category: 'sports', icon: '🧘' },
            { id: 11, name: 'Best Seller Novel', price: 599, oldPrice: 999, discount: 40, category: 'books', icon: '📖' },
            { id: 12, name: 'Cookbook', price: 799, oldPrice: 1299, discount: 38, category: 'books', icon: '📚' }
        ];

        let cart = [];
        let currentProducts = [...products];

        function displayProducts(productsToShow) {
            const grid = document.getElementById('productGrid');
            grid.innerHTML = '';
            
            productsToShow.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <div class="product-image">${product.icon}</div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">Rs. ${product.price}</div>
                        <div>
                            <span class="product-old-price">Rs. ${product.oldPrice}</span>
                            <span class="product-discount">-${product.discount}%</span>
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            cart.push(product);
            updateCartCount();
            showModal('Added to Cart!', `${product.name} has been added to your cart`);
        }

        function updateCartCount() {
            document.getElementById('cartCount').textContent = cart.length;
        }

        function filterCategory(category) {
            currentProducts = products.filter(p => p.category === category);
            displayProducts(currentProducts);
            scrollToProducts();
        }

        function searchProducts() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            if (query) {
                currentProducts = products.filter(p => 
                    p.name.toLowerCase().includes(query) || 
                    p.category.toLowerCase().includes(query)
                );
                displayProducts(currentProducts);
                scrollToProducts();
            } else {
                currentProducts = [...products];
                displayProducts(currentProducts);
            }
        }

        function viewCart() {
            if (cart.length === 0) {
                showModal('Cart Empty', 'Your cart is empty. Start shopping!');
            } else {
                const total = cart.reduce((sum, item) => sum + item.price, 0);
                showModal('Your Cart', `You have ${cart.length} items. Total: Rs. ${total}`);
            }
        }

        function showLogin() {
            showModal('Login', 'Login feature coming soon!');
        }

        function showModal(title, message) {
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalMessage').textContent = message;
            document.getElementById('modal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }

        function scrollToProducts() {
            document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
        }

        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });

        displayProducts(products);
    