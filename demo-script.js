// Demo data for bundle products
const bundleData = {
    mainProduct: {
        name: "Gaming Laptop ROG Strix G15",
        price: 45990000,
        originalPrice: 52990000
    },
    bundleItems: [
        {
            id: "gaming-mouse",
            name: "Gaming Mouse RGB",
            originalPrice: 1500000,
            discountType: "percentage",
            discountValue: 10,
            minQty: 1,
            maxQty: 2,
            image: "https://via.placeholder.com/80x80/28a745/ffffff?text=Mouse"
        },
        {
            id: "gaming-keyboard", 
            name: "Gaming Keyboard Mechanical",
            originalPrice: 2500000,
            discountType: "percentage",
            discountValue: 15,
            minQty: 1,
            maxQty: 1,
            image: "https://via.placeholder.com/80x80/dc3545/ffffff?text=Keyboard"
        },
        {
            id: "gaming-monitor",
            name: "Gaming Monitor 27\" 144Hz", 
            originalPrice: 8500000,
            discountType: "percentage",
            discountValue: 20,
            minQty: 1,
            maxQty: 2,
            image: "https://via.placeholder.com/80x80/6f42c1/ffffff?text=Monitor"
        }
    ]
};

// DOM Elements
const bundleChecks = document.querySelectorAll('.bundle-check');
const selectedBundlesContainer = document.getElementById('selected-bundles');
const totalSavingsElement = document.getElementById('total-savings');
const totalPriceElement = document.getElementById('total-price');
const mainQtyInput = document.getElementById('main-qty');
const qtyButtons = document.querySelectorAll('.qty-btn');
const addToCartBtn = document.querySelector('.btn-add-cart');
const buyNowBtn = document.querySelector('.btn-buy-now');

let selectedBundles = [];
let mainProductQty = 1;

// Initialize the demo
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateSummary();
    setupImageGallery();
});

function setupEventListeners() {
    // Bundle checkbox events
    bundleChecks.forEach(checkbox => {
        checkbox.addEventListener('change', handleBundleSelection);
    });

    // Quantity selector events for bundle items
    document.querySelectorAll('.qty-select').forEach(select => {
        select.addEventListener('change', handleBundleQuantityChange);
    });

    // Main product quantity events
    qtyButtons.forEach(button => {
        button.addEventListener('click', handleMainQuantityChange);
    });

    mainQtyInput.addEventListener('change', function() {
        mainProductQty = parseInt(this.value) || 1;
        updateSummary();
    });

    // Action button events
    addToCartBtn.addEventListener('click', handleAddToCart);
    buyNowBtn.addEventListener('click', handleBuyNow);

    // Thumbnail image events
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', function() {
            switchMainImage(this.src);
            updateActiveThumbnail(this);
        });
    });
}

function handleBundleSelection(event) {
    const checkbox = event.target;
    const bundleItem = checkbox.closest('.bundle-item');
    const productId = checkbox.dataset.product;
    
    if (checkbox.checked) {
        bundleItem.classList.add('selected');
        addBundleToSelection(productId);
    } else {
        bundleItem.classList.remove('selected');
        removeBundleFromSelection(productId);
    }
    
    updateSummary();
}

function handleBundleQuantityChange(event) {
    const select = event.target;
    const bundleItem = select.closest('.bundle-item');
    const checkbox = bundleItem.querySelector('.bundle-check');
    
    if (checkbox.checked) {
        const productId = checkbox.dataset.product;
        updateBundleQuantity(productId, parseInt(select.value));
        updateSummary();
    }
}

function handleMainQuantityChange(event) {
    const button = event.target;
    const isPlus = button.classList.contains('plus');
    const currentQty = parseInt(mainQtyInput.value) || 1;
    
    if (isPlus) {
        mainProductQty = Math.min(currentQty + 1, 10);
    } else {
        mainProductQty = Math.max(currentQty - 1, 1);
    }
    
    mainQtyInput.value = mainProductQty;
    updateSummary();
}

function addBundleToSelection(productId) {
    const bundleItemData = bundleData.bundleItems.find(item => 
        item.name === productId || item.id === productId.toLowerCase().replace(/\s+/g, '-')
    );
    
    if (bundleItemData) {
        const qtySelect = document.querySelector(`#${bundleItemData.id}`).closest('.bundle-item').querySelector('.qty-select');
        const quantity = parseInt(qtySelect.value) || 1;
        
        selectedBundles.push({
            ...bundleItemData,
            quantity: quantity
        });
    }
}

function removeBundleFromSelection(productId) {
    selectedBundles = selectedBundles.filter(bundle => 
        bundle.name !== productId && bundle.id !== productId.toLowerCase().replace(/\s+/g, '-')
    );
}

function updateBundleQuantity(productId, quantity) {
    const bundle = selectedBundles.find(bundle => 
        bundle.name === productId || bundle.id === productId.toLowerCase().replace(/\s+/g, '-')
    );
    
    if (bundle) {
        bundle.quantity = quantity;
    }
}

function calculateDiscountedPrice(originalPrice, discountType, discountValue) {
    if (discountType === 'percentage') {
        return originalPrice * (1 - discountValue / 100);
    } else {
        return Math.max(0, originalPrice - discountValue);
    }
}

function updateSummary() {
    // Clear previous selections
    selectedBundlesContainer.innerHTML = '';
    
    let totalSavings = 0;
    let totalPrice = bundleData.mainProduct.price * mainProductQty;
    
    // Add selected bundles to summary
    selectedBundles.forEach(bundle => {
        const discountedPrice = calculateDiscountedPrice(
            bundle.originalPrice, 
            bundle.discountType, 
            bundle.discountValue
        );
        
        const savings = (bundle.originalPrice - discountedPrice) * bundle.quantity;
        const bundleTotal = discountedPrice * bundle.quantity;
        
        totalSavings += savings;
        totalPrice += bundleTotal;
        
        // Add to summary display
        const summaryRow = document.createElement('div');
        summaryRow.className = 'summary-row';
        summaryRow.innerHTML = `
            <span class="item-name">+ ${bundle.name} (x${bundle.quantity})</span>
            <span class="item-price">${formatPrice(bundleTotal)}</span>
        `;
        selectedBundlesContainer.appendChild(summaryRow);
    });
    
    // Update totals
    totalSavingsElement.textContent = formatPrice(totalSavings);
    totalPriceElement.textContent = formatPrice(totalPrice);
    
    // Update button states
    updateActionButtons();
}

function updateActionButtons() {
    const hasSelections = selectedBundles.length > 0;
    const originalText = hasSelections ? 'Thêm Bundle vào giỏ hàng' : 'Thêm vào giỏ hàng';
    const buyText = hasSelections ? 'Mua Bundle ngay' : 'Mua ngay';
    
    addToCartBtn.textContent = originalText;
    buyNowBtn.textContent = buyText;
}

function handleAddToCart() {
    const items = [{
        name: bundleData.mainProduct.name,
        quantity: mainProductQty,
        price: bundleData.mainProduct.price
    }];
    
    selectedBundles.forEach(bundle => {
        const discountedPrice = calculateDiscountedPrice(
            bundle.originalPrice,
            bundle.discountType,
            bundle.discountValue
        );
        
        items.push({
            name: bundle.name,
            quantity: bundle.quantity,
            price: discountedPrice,
            originalPrice: bundle.originalPrice,
            isBundle: true
        });
    });
    
    // Simulate add to cart
    showNotification('Đã thêm vào giỏ hàng!', 'success');
    console.log('Items added to cart:', items);
}

function handleBuyNow() {
    // Simulate buy now action
    const totalItems = 1 + selectedBundles.reduce((sum, bundle) => sum + bundle.quantity, 0);
    showNotification(`Chuyển đến thanh toán ${totalItems} sản phẩm`, 'info');
}

function setupImageGallery() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Add some sample images
    const images = [
        'https://via.placeholder.com/500x400/667eea/ffffff?text=Gaming+Laptop+Front',
        'https://via.placeholder.com/500x400/764ba2/ffffff?text=Gaming+Laptop+Side', 
        'https://via.placeholder.com/500x400/667eea/ffffff?text=Gaming+Laptop+Back'
    ];
    
    thumbnails.forEach((thumb, index) => {
        if (images[index]) {
            thumb.src = images[index].replace('500x400', '80x60');
            thumb.dataset.fullsize = images[index];
        }
    });
}

function switchMainImage(imageSrc) {
    const mainImage = document.querySelector('.main-image img');
    const thumbnail = document.querySelector(`[src="${imageSrc}"]`);
    
    if (thumbnail && thumbnail.dataset.fullsize) {
        mainImage.src = thumbnail.dataset.fullsize;
    }
}

function updateActiveThumbnail(selectedThumb) {
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    selectedThumb.classList.add('active');
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // If image is already loaded
    if (img.complete) {
        img.style.opacity = '1';
    }
});