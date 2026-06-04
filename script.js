// ===== GLOBAL VARIABLES =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];
let currentPage = 1;
const productsPerPage = 12;

// ===== INITIALIZE WHEN DOM LOADS =====
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    loadProducts();
    updateCartCount();
    initSwiper();
    
    // Hide loader after 2 seconds
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 2000);
});

// ===== INITIALIZE PAGE =====
function initializePage() {
    // Set current year in footer
    const copyrightElement = document.getElementById('copyrightYear');
    if (copyrightElement) {
        copyrightElement.textContent = `© 1996-${new Date().getFullYear()}, KP Marketplace, Inc. or its affiliates`;
    }
    
    // Add animations to elements
    animateElementsOnScroll();
}

// ===== SETUP EVENT LISTENERS =====
function setupEventListeners() {
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
    
    // Voice search
    const voiceSearchBtn = document.getElementById('voiceSearchBtn');
    if (voiceSearchBtn) {
        voiceSearchBtn.addEventListener('click', startVoiceSearch);
    }
    
    // Cart functionality
    const cartBtn = document.getElementById('cartBtn');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartBtn) cartBtn.addEventListener('click', toggleCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);
    
    // Notification close
    const closeNotification = document.querySelector('.close-notification');
    if (closeNotification) {
        closeNotification.addEventListener('click', function() {
            this.parentElement.parentElement.style.display = 'none';
        });
    }
    
    // Back to top
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Scroll listener for back to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
            
            // Add scroll animations
            animateOnScroll();
        });
    }
    
    // Category navigation
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProductsByCategory(category);
        });
    });
}

// ===== LOAD PRODUCTS DATA =====
async function loadProducts() {
    try {
        createMockProducts();
        
        // Display products in each section
        displayProductsByCategory('electronics', 'electronicsGrid');
        displayProductsByCategory('fashion', 'fashionGrid');
        displayProductsByCategory('home', 'homeGrid');
        displayProductsByCategory('beauty', 'beautyGrid');
        displayProductsByCategory('grocery', 'groceryGrid');
        displayDeals();
        
        console.log('Products loaded successfully:', products.length);
    } catch (error) {
        console.error('Error loading products:', error);
        createMockProducts();
    }
}

// ===== CREATE MOCK PRODUCTS (100+ PRODUCTS) =====
function createMockProducts() {
    products = [
        // Electronics (20 products)
        {
            id: 1,
            name: "Apple iPhone 15 Pro (256 GB) - Black Titanium",
            category: "electronics",
            price: 134900,
            originalPrice: 149900,
            rating: 4.7,
            reviewCount: 2345,
            image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "iPhone 15 Pro with titanium design, A17 Pro chip, and advanced camera system.",
            prime: true,
            stock: 45
        },
        {
            id: 2,
            name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
            category: "electronics",
            price: 24990,
            originalPrice: 29990,
            rating: 4.8,
            reviewCount: 4567,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Industry-leading noise cancellation with Dual Noise Sensor technology.",
            prime: true,
            stock: 78
        },
        {
            id: 3,
            name: "Apple MacBook Air M2 (13-inch, 8GB RAM, 256GB SSD)",
            category: "electronics",
            price: 89990,
            originalPrice: 99990,
            rating: 4.9,
            reviewCount: 3120,
            image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Supercharged by M2 chip. Incredibly thin and light.",
            prime: true,
            stock: 24
        },
        {
            id: 4,
            name: "Samsung 55-inch 4K Ultra HD Smart QLED TV",
            category: "electronics",
            price: 54990,
            originalPrice: 69990,
            rating: 4.5,
            reviewCount: 2890,
            image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Quantum Dot Technology with 4K UHD Resolution.",
            prime: true,
            stock: 15
        },
        {
            id: 5,
            name: "Google Pixel 8 Pro (256 GB) - Obsidian",
            category: "electronics",
            price: 84999,
            originalPrice: 99999,
            rating: 4.6,
            reviewCount: 1890,
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Powered by Google Tensor G3 with best-in-class cameras.",
            prime: true,
            stock: 32
        },
        {
            id: 6,
            name: "Dell XPS 13 Laptop (16GB RAM, 512GB SSD)",
            category: "electronics",
            price: 124990,
            originalPrice: 139990,
            rating: 4.7,
            reviewCount: 2678,
            image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "InfinityEdge display with 11th Gen Intel Core processor.",
            prime: true,
            stock: 18
        },
        {
            id: 7,
            name: "Bose QuietComfort 45 Wireless Headphones",
            category: "electronics",
            price: 27990,
            originalPrice: 32990,
            rating: 4.8,
            reviewCount: 4563,
            image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "World-class noise cancellation with impressive audio.",
            prime: true,
            stock: 56
        },
        {
            id: 8,
            name: "Apple iPad Air (5th Gen, 64GB)",
            category: "electronics",
            price: 54900,
            originalPrice: 59900,
            rating: 4.8,
            reviewCount: 4321,
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "M1 chip, 10.9-inch Liquid Retina display.",
            prime: true,
            stock: 42
        },
        {
            id: 9,
            name: "Sony PlayStation 5 Digital Edition",
            category: "electronics",
            price: 44990,
            originalPrice: 49990,
            rating: 4.9,
            reviewCount: 7890,
            image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Next-gen gaming with ultra-high speed SSD.",
            prime: true,
            stock: 12
        },
        {
            id: 10,
            name: "Apple Watch Series 9 (GPS, 45mm)",
            category: "electronics",
            price: 41900,
            originalPrice: 45900,
            rating: 4.7,
            reviewCount: 3456,
            image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Advanced health monitoring and fitness tracking.",
            prime: true,
            stock: 67
        },

        // Fashion (20 products)
        {
            id: 21,
            name: "Men's Cotton Casual Shirt - Regular Fit",
            category: "fashion",
            price: 899,
            originalPrice: 1499,
            rating: 4.3,
            reviewCount: 1234,
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "100% Premium Cotton Regular Fit Shirt.",
            prime: true,
            stock: 89
        },
        {
            id: 22,
            name: "Women's Kurti with Palazzo Set",
            category: "fashion",
            price: 1299,
            originalPrice: 2499,
            rating: 4.5,
            reviewCount: 2345,
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Rayon Fabric with Embroidered Neckline.",
            prime: true,
            stock: 45
        },
        {
            id: 23,
            name: "Men's Sports Shoes - Running & Gym",
            category: "fashion",
            price: 1899,
            originalPrice: 2999,
            rating: 4.4,
            reviewCount: 3456,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Air Cushion Technology Sports Shoes.",
            prime: true,
            stock: 120
        },
        {
            id: 24,
            name: "Women's Silk Saree - Traditional Wear",
            category: "fashion",
            price: 2999,
            originalPrice: 4999,
            rating: 4.6,
            reviewCount: 1567,
            image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Pure Silk Saree with Zari Border.",
            prime: true,
            stock: 34
        },
        {
            id: 25,
            name: "Men's Formal Suit - 3 Piece",
            category: "fashion",
            price: 4999,
            originalPrice: 7999,
            rating: 4.5,
            reviewCount: 987,
            image: "https://images.unsplash.com/photo-1594938374182-3740c76a7d70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Wool Blend Formal Suit for Office Wear.",
            prime: true,
            stock: 23
        },
        {
            id: 26,
            name: "Women's Handbag - Leather",
            category: "fashion",
            price: 1999,
            originalPrice: 3499,
            rating: 4.4,
            reviewCount: 2456,
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Genuine Leather Handbag with Multiple Compartments.",
            prime: true,
            stock: 56
        },
        {
            id: 27,
            name: "Men's Denim Jeans - Slim Fit",
            category: "fashion",
            price: 1499,
            originalPrice: 2499,
            rating: 4.3,
            reviewCount: 4567,
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Stretchable Denim with Comfort Fit.",
            prime: true,
            stock: 78
        },
        {
            id: 28,
            name: "Women's Running Shoes",
            category: "fashion",
            price: 2199,
            originalPrice: 3499,
            rating: 4.5,
            reviewCount: 3456,
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Lightweight Running Shoes with Cushioning.",
            prime: true,
            stock: 45
        },
        {
            id: 29,
            name: "Men's Polo T-Shirts (Pack of 3)",
            category: "fashion",
            price: 999,
            originalPrice: 1799,
            rating: 4.2,
            reviewCount: 5678,
            image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Cotton Polo T-Shirts in Assorted Colors.",
            prime: true,
            stock: 112
        },
        {
            id: 30,
            name: "Women's Winter Jacket",
            category: "fashion",
            price: 2999,
            originalPrice: 4999,
            rating: 4.6,
            reviewCount: 2341,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Warm Winter Jacket with Hood.",
            prime: true,
            stock: 37
        },

        // Home & Kitchen (15 products)
        {
            id: 51,
            name: "Prestige Omega Select Plus Induction Cooktop",
            category: "home",
            price: 2999,
            originalPrice: 3999,
            rating: 4.4,
            reviewCount: 5678,
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "2100W Power with 7 Cooking Functions.",
            prime: true,
            stock: 89
        },
        {
            id: 52,
            name: "Non-Stick Cookware Set 5 Pieces",
            category: "home",
            price: 3999,
            originalPrice: 5999,
            rating: 4.5,
            reviewCount: 3456,
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Premium Non-Stick Cookware Set.",
            prime: true,
            stock: 56
        },
        {
            id: 53,
            name: "Philips Air Fryer XXL",
            category: "home",
            price: 12999,
            originalPrice: 15999,
            rating: 4.6,
            reviewCount: 7890,
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Healthy Cooking with 90% Less Oil.",
            prime: true,
            stock: 34
        },
        {
            id: 54,
            name: "Bajaj Air Cooler - Desert Cooler",
            category: "home",
            price: 9999,
            originalPrice: 12999,
            rating: 4.3,
            reviewCount: 4567,
            image: "https://images.unsplash.com/photo-1566110980915-fe3a5b42c4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "65L Tank Capacity with 4-way Air Deflection.",
            prime: true,
            stock: 45
        },
        {
            id: 55,
            name: "Kaff Coffee Maker",
            category: "home",
            price: 5999,
            originalPrice: 7999,
            rating: 4.5,
            reviewCount: 2345,
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Automatic Coffee Maker with Milk Frother.",
            prime: true,
            stock: 28
        },
        {
            id: 56,
            name: "Sleepwell Mattress - Queen Size",
            category: "home",
            price: 14999,
            originalPrice: 19999,
            rating: 4.7,
            reviewCount: 3456,
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Memory Foam Mattress with Cooling Gel.",
            prime: true,
            stock: 19
        },
        {
            id: 57,
            name: "Milton Thermosteel Flask 1L",
            category: "home",
            price: 999,
            originalPrice: 1499,
            rating: 4.6,
            reviewCount: 7891,
            image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Hot/Cold Retention for 24 Hours.",
            prime: true,
            stock: 124
        },
        {
            id: 58,
            name: "Havells Fan - Ceiling Fan",
            category: "home",
            price: 2399,
            originalPrice: 2999,
            rating: 4.4,
            reviewCount: 4567,
            image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Energy Efficient Ceiling Fan with Remote.",
            prime: true,
            stock: 67
        },
        {
            id: 59,
            name: "Godrej Refrigerator 260L",
            category: "home",
            price: 24990,
            originalPrice: 29990,
            rating: 4.5,
            reviewCount: 2345,
            image: "https://images.unsplash.com/photo-1571175443880-49e1d1b7b3a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Frost Free Double Door Refrigerator.",
            prime: true,
            stock: 23
        },
        {
            id: 60,
            name: "Dyson Vacuum Cleaner - Cordless",
            category: "home",
            price: 34990,
            originalPrice: 42990,
            rating: 4.8,
            reviewCount: 1234,
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Cordless Vacuum Cleaner with Multiple Attachments.",
            prime: true,
            stock: 15
        },

        // Beauty (15 products)
        {
            id: 71,
            name: "Lakmé Absolute Skin Gloss Gel Crème",
            category: "beauty",
            price: 699,
            originalPrice: 899,
            rating: 4.5,
            reviewCount: 12345,
            image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "SPF 50 PA+++ with Instant Glow.",
            prime: true,
            stock: 150
        },
        {
            id: 72,
            name: "Maybelline New York Lipstick - Matte Finish",
            category: "beauty",
            price: 499,
            originalPrice: 699,
            rating: 4.6,
            reviewCount: 9876,
            image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Long Lasting Matte Lipstick in 12 Shades.",
            prime: true,
            stock: 89
        },
        {
            id: 73,
            name: "Mamaearth Onion Hair Oil",
            category: "beauty",
            price: 399,
            originalPrice: 599,
            rating: 4.4,
            reviewCount: 23456,
            image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Reduces Hair Fall & Promotes Hair Growth.",
            prime: true,
            stock: 167
        },
        {
            id: 74,
            name: "Nivea Men Face Wash",
            category: "beauty",
            price: 199,
            originalPrice: 299,
            rating: 4.3,
            reviewCount: 34567,
            image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Deep Cleansing Face Wash for Men.",
            prime: true,
            stock: 234
        },
        {
            id: 75,
            name: "LOreal Paris Hair Color",
            category: "beauty",
            price: 299,
            originalPrice: 399,
            rating: 4.5,
            reviewCount: 12345,
            image: "https://images.unsplash.com/photo-1522338242990-8f6c3e1534c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Ammonia Free Hair Color with Shine.",
            prime: true,
            stock: 78
        },
        {
            id: 76,
            name: "Garnier Skin Naturals Face Cream",
            category: "beauty",
            price: 249,
            originalPrice: 349,
            rating: 4.4,
            reviewCount: 9876,
            image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Vitamin C Face Cream for Brightening.",
            prime: true,
            stock: 145
        },
        {
            id: 77,
            name: "VLCC Almond Honey Body Lotion",
            category: "beauty",
            price: 349,
            originalPrice: 499,
            rating: 4.3,
            reviewCount: 5678,
            image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Nourishing Body Lotion for 24hr Moisture.",
            prime: true,
            stock: 98
        },
        {
            id: 78,
            name: "Biotique Bio Fruit Face Pack",
            category: "beauty",
            price: 199,
            originalPrice: 299,
            rating: 4.6,
            reviewCount: 8765,
            image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Natural Face Pack for Glowing Skin.",
            prime: true,
            stock: 112
        },
        {
            id: 79,
            name: "Forest Essentials Body Mist",
            category: "beauty",
            price: 1299,
            originalPrice: 1799,
            rating: 4.7,
            reviewCount: 2345,
            image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Luxury Ayurvedic Body Mist.",
            prime: true,
            stock: 45
        },
        {
            id: 80,
            name: "MCaffeine Coffee Body Scrub",
            category: "beauty",
            price: 499,
            originalPrice: 699,
            rating: 4.5,
            reviewCount: 5678,
            image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Exfoliating Body Scrub with Coffee.",
            prime: true,
            stock: 67
        },

        // Grocery (15 products)
        {
            id: 91,
            name: "Fortune Sunflower Oil, 5L Jar",
            category: "grocery",
            price: 899,
            originalPrice: 999,
            rating: 4.3,
            reviewCount: 45678,
            image: "https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "100% Pure Sunflower Oil.",
            prime: true,
            stock: 200
        },
        {
            id: 92,
            name: "Tata Salt Iodized, 1kg",
            category: "grocery",
            price: 28,
            originalPrice: 32,
            rating: 4.7,
            reviewCount: 98765,
            image: "https://images.unsplash.com/photo-1589988024316-a0dde987b8c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Pure Vacuum Evaporated Iodized Salt.",
            prime: true,
            stock: 500
        },
        {
            id: 93,
            name: "Maggi Noodles Masala, 12-pack",
            category: "grocery",
            price: 240,
            originalPrice: 300,
            rating: 4.8,
            reviewCount: 76543,
            image: "https://images.unsplash.com/photo-1559532295-459d7d4d9e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Instant Noodles - Ready in 2 Minutes.",
            prime: true,
            stock: 150
        },
        {
            id: 94,
            name: "Amul Butter, 500g",
            category: "grocery",
            price: 295,
            originalPrice: 325,
            rating: 4.6,
            reviewCount: 45678,
            image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Pure Milk Butter.",
            prime: true,
            stock: 89
        },
        {
            id: 95,
            name: "Britannia Good Day Biscuits, 1kg",
            category: "grocery",
            price: 199,
            originalPrice: 249,
            rating: 4.5,
            reviewCount: 34567,
            image: "https://images.unsplash.com/photo-1586985289688-ca3cf47bc1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Cashew & Butter Cookies.",
            prime: true,
            stock: 134
        },
        {
            id: 96,
            name: "Red Label Tea, 1kg",
            category: "grocery",
            price: 499,
            originalPrice: 599,
            rating: 4.4,
            reviewCount: 23456,
            image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Rich Aroma Tea Leaves.",
            prime: true,
            stock: 78
        },
        {
            id: 97,
            name: "Kellogg's Corn Flakes, 1.2kg",
            category: "grocery",
            price: 399,
            originalPrice: 499,
            rating: 4.5,
            reviewCount: 12345,
            image: "https://images.unsplash.com/photo-1529254479751-fbacb4c7a587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Breakfast Cereal with Iron & Vitamins.",
            prime: true,
            stock: 67
        },
        {
            id: 98,
            name: "Parle-G Biscuits, 1kg",
            category: "grocery",
            price: 110,
            originalPrice: 130,
            rating: 4.8,
            reviewCount: 98765,
            image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Glucose Biscuits - India's Favorite.",
            prime: true,
            stock: 256
        },
        {
            id: 99,
            name: "Dabur Honey, 1kg",
            category: "grocery",
            price: 499,
            originalPrice: 599,
            rating: 4.6,
            reviewCount: 34567,
            image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "100% Pure Honey.",
            prime: true,
            stock: 89
        },
        {
            id: 100,
            name: "Nestle Milkmaid, 397g",
            category: "grocery",
            price: 199,
            originalPrice: 249,
            rating: 4.7,
            reviewCount: 23456,
            image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Sweetened Condensed Milk.",
            prime: true,
            stock: 145
        }
    ];

    // Add more products to reach 100+
    for (let i = 101; i <= 150; i++) {
        const categories = ['electronics', 'fashion', 'home', 'beauty', 'grocery'];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const price = Math.floor(Math.random() * 50000) + 999;
        
        products.push({
            id: i,
            name: `Product ${i} - ${category.charAt(0).toUpperCase() + category.slice(1)}`,
            category: category,
            price: price,
            originalPrice: price * 1.3,
            rating: (Math.random() * 2 + 3).toFixed(1),
            reviewCount: Math.floor(Math.random() * 10000),
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: `High-quality ${category} product with excellent features.`,
            prime: Math.random() > 0.5,
            stock: Math.floor(Math.random() * 200) + 10
        });
    }
}

// ===== SWIPER INITIALIZATION =====
function initSwiper() {
    if (typeof Swiper !== 'undefined') {
        const heroSwiper = new Swiper('.heroSwiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        console.log('Swiper initialized');
    } else {
        console.error('Swiper not loaded');
    }
}

// ===== SEARCH FUNCTIONS =====
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        alert(`Searching for: ${query}`);
        // Here you can add actual search functionality
        filterProductsBySearch(query);
    }
}

function startVoiceSearch() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onstart = function() {
            alert('Speak now...');
        };
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('searchInput').value = transcript;
            performSearch();
        };
        
        recognition.onerror = function(event) {
            alert('Error occurred in recognition: ' + event.error);
        };
        
        recognition.start();
    } else {
        alert('Voice search not supported in this browser');
    }
}

// ===== CART FUNCTIONS =====
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('show');
    
    // Update cart items when opening
    if (cartSidebar.classList.contains('open')) {
        updateCartItems();
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartItems() {
    const container = document.getElementById('cartItemsContainer');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="#" class="shop-now-link" onclick="closeCartAndShop()">Shop now</a>
            </div>
        `;
        document.querySelector('.cart-subtotal').textContent = '₹0.00';
        return;
    }
    
    let cartHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="updateCartItemQuantity(${item.id}, -1)">-</button>
                            <span class="qty">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateCartItemQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = cartHTML;
    document.querySelector('.cart-subtotal').textContent = `₹${subtotal.toLocaleString()}`;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartItems();
    
    // Show success message
    showNotification(`${product.name} added to cart!`);
}

function updateCartItemQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartItems();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartItems();
}

function closeCartAndShop() {
    toggleCart();
    // Scroll to products section
    document.querySelector('.products-main').scrollIntoView({ behavior: 'smooth' });
}

// ===== PRODUCT DISPLAY FUNCTIONS =====
function displayProductsByCategory(category, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    const categoryProducts = products.filter(p => p.category === category).slice(0, 8);
    
    container.innerHTML = categoryProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.prime ? '<span class="prime-badge">Prime</span>' : ''}
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                    <span class="rating-count">(${product.reviewCount.toLocaleString()})</span>
                </div>
                <div class="product-actions">
                    <button class="view-details-btn" onclick="viewProductDetails(${product.id})">View Details</button>
                    <button class="add-to-cart-btn-small" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

function displayDeals() {
    const dealsContainer = document.getElementById('dealsGrid');
    if (!dealsContainer) return;
    
    // Get products with at least 20% discount
    const deals = products
        .filter(p => p.originalPrice && p.originalPrice > p.price)
        .map(p => ({
            ...p,
            discountPercent: Math.round((1 - p.price/p.originalPrice) * 100)
        }))
        .sort((a, b) => b.discountPercent - a.discountPercent)
        .slice(0, 8);
    
    dealsContainer.innerHTML = deals.map(product => `
        <div class="deal-card">
            <div class="deal-image">
                <img src="${product.image}" alt="${product.name}">
                <span class="deal-badge">${product.discountPercent}% OFF</span>
            </div>
            <div class="deal-content">
                <h3 class="deal-title">${product.name}</h3>
                <div class="deal-price">
                    <span class="current-price">₹${product.price.toLocaleString()}</span>
                    <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
                    <span class="discount">Save ₹${(product.originalPrice - product.price).toLocaleString()}</span>
                </div>
                <div class="deal-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                    <span class="rating-count">(${product.reviewCount.toLocaleString()})</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`Product Details:\n\nName: ${product.name}\nPrice: ₹${product.price.toLocaleString()}\nDescription: ${product.description}\nRating: ${product.rating}/5 (${product.reviewCount.toLocaleString()} reviews)`);
    }
}

function filterProductsByCategory(category) {
    // Hide all sections
    document.querySelectorAll('.product-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show only products of selected category
    const filteredProducts = products.filter(p => p.category === category);
    
    // Create filtered view
    const main = document.querySelector('.products-main');
    main.innerHTML = `
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">${category.charAt(0).toUpperCase() + category.slice(1)} Products</h2>
                <a href="#" class="see-all" onclick="showAllCategories()">View all categories <i class="fas fa-chevron-right"></i></a>
            </div>
            <div class="products-grid" id="filteredGrid">
                ${filteredProducts.slice(0, 12).map(product => `
                    <div class="product-card">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                            ${product.prime ? '<span class="prime-badge">Prime</span>' : ''}
                        </div>
                        <div class="product-content">
                            <h3 class="product-title">${product.name}</h3>
                            <div class="product-price">₹${product.price.toLocaleString()}</div>
                            <div class="product-rating">
                                <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                                <span class="rating-count">(${product.reviewCount.toLocaleString()})</span>
                            </div>
                            <div class="product-actions">
                                <button class="view-details-btn" onclick="viewProductDetails(${product.id})">View Details</button>
                                <button class="add-to-cart-btn-small" onclick="addToCart(${product.id})">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function filterProductsBySearch(query) {
    const searchResults = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 12);
    
    const main = document.querySelector('.products-main');
    main.innerHTML = `
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Search Results for "${query}"</h2>
                <a href="#" class="see-all" onclick="showAllCategories()">View all categories <i class="fas fa-chevron-right"></i></a>
            </div>
            ${searchResults.length > 0 ? `
                <div class="products-grid" id="searchResultsGrid">
                    ${searchResults.map(product => `
                        <div class="product-card">
                            <div class="product-image">
                                <img src="${product.image}" alt="${product.name}">
                                ${product.prime ? '<span class="prime-badge">Prime</span>' : ''}
                            </div>
                            <div class="product-content">
                                <h3 class="product-title">${product.name}</h3>
                                <div class="product-price">₹${product.price.toLocaleString()}</div>
                                <div class="product-rating">
                                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                                    <span class="rating-count">(${product.reviewCount.toLocaleString()})</span>
                                </div>
                                <div class="product-actions">
                                    <button class="view-details-btn" onclick="viewProductDetails(${product.id})">View Details</button>
                                    <button class="add-to-cart-btn-small" onclick="addToCart(${product.id})">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No products found for "${query}"</h3>
                    <p>Try checking your spelling or use more general terms</p>
                    <button class="back-to-home" onclick="showAllCategories()">Back to Home</button>
                </div>
            `}
        </div>
    `;
}

function showAllCategories() {
    location.reload(); // Reload to show all categories
}

// ===== NOTIFICATION FUNCTION =====
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification-popup';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== SCROLL ANIMATIONS =====
function animateElementsOnScroll() {
    try {
        const elements = document.querySelectorAll('.category-card, .product-card, .deal-card');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (rect.top <= windowHeight * 0.85) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'all 0.6s ease';
            }
        });
    } catch (error) {
        console.log('Animation error:', error);
    }
}

function animateOnScroll() {
    animateElementsOnScroll();
}

// Add slideOutRight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .no-results {
        text-align: center;
        padding: 60px 20px;
    }
    
    .no-results i {
        font-size: 60px;
        color: #ddd;
        margin-bottom: 20px;
    }
    
    .no-results h3 {
        margin-bottom: 10px;
        color: #333;
    }
    
    .no-results p {
        color: #666;
        margin-bottom: 20px;
    }
    
    .back-to-home {
        background: var(--kp-orange);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Initial call and setup
window.addEventListener('load', animateElementsOnScroll);
window.addEventListener('scroll', animateElementsOnScroll);