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
            image: "https://via.placeholder.com/80x80/28a745/ffffff?text=Mouse",
            options: [
                {
                    name: "Màu sắc",
                    type: "color",
                    required: true,
                    values: [
                        { label: "Đen", value: "black", priceAdjustment: 0, image: "https://via.placeholder.com/80x80/000000/ffffff?text=Black" },
                        { label: "Trắng", value: "white", priceAdjustment: 0, image: "https://via.placeholder.com/80x80/ffffff/000000?text=White" },
                        { label: "RGB", value: "rgb", priceAdjustment: 200000, image: "https://via.placeholder.com/80x80/ff69b4/ffffff?text=RGB" }
                    ]
                },
                {
                    name: "DPI",
                    type: "select",
                    required: true,
                    values: [
                        { label: "8000 DPI", value: "8000", priceAdjustment: 0 },
                        { label: "12000 DPI", value: "12000", priceAdjustment: 300000 },
                        { label: "16000 DPI Pro", value: "16000", priceAdjustment: 500000 }
                    ]
                }
            ]
        },
        {
            id: "gaming-keyboard", 
            name: "Gaming Keyboard Mechanical",
            originalPrice: 2500000,
            discountType: "percentage",
            discountValue: 15,
            minQty: 1,
            maxQty: 1,
            image: "https://via.placeholder.com/80x80/dc3545/ffffff?text=Keyboard",
            options: [
                {
                    name: "Switch",
                    type: "select",
                    required: true,
                    values: [
                        { label: "Cherry MX Red", value: "red", priceAdjustment: 0 },
                        { label: "Cherry MX Blue", value: "blue", priceAdjustment: 100000 },
                        { label: "Cherry MX Brown", value: "brown", priceAdjustment: 150000 },
                        { label: "Cherry MX Silver", value: "silver", priceAdjustment: 300000 }
                    ]
                },
                {
                    name: "Layout",
                    type: "radio",
                    required: true,
                    values: [
                        { label: "Full Size (104 phím)", value: "full", priceAdjustment: 0 },
                        { label: "TKL (87 phím)", value: "tkl", priceAdjustment: -200000 },
                        { label: "60% (61 phím)", value: "60", priceAdjustment: -400000 }
                    ]
                },
                {
                    name: "Keycap",
                    type: "select",
                    required: false,
                    values: [
                        { label: "ABS chuẩn", value: "abs", priceAdjustment: 0 },
                        { label: "PBT cao cấp", value: "pbt", priceAdjustment: 400000 },
                        { label: "PBT Double Shot", value: "pbt-double", priceAdjustment: 800000 }
                    ]
                }
            ]
        },
        {
            id: "gaming-monitor",
            name: "Gaming Monitor 27\" 144Hz", 
            originalPrice: 8500000,
            discountType: "percentage",
            discountValue: 20,
            minQty: 1,
            maxQty: 2,
            image: "https://via.placeholder.com/80x80/6f42c1/ffffff?text=Monitor",
            options: [
                {
                    name: "Độ phân giải",
                    type: "radio",
                    required: true,
                    values: [
                        { label: "Full HD (1920x1080)", value: "1080p", priceAdjustment: 0 },
                        { label: "2K QHD (2560x1440)", value: "1440p", priceAdjustment: 2000000 },
                        { label: "4K UHD (3840x2160)", value: "4k", priceAdjustment: 5000000 }
                    ]
                },
                {
                    name: "Tần số quét",
                    type: "select",
                    required: true,
                    values: [
                        { label: "144Hz", value: "144", priceAdjustment: 0 },
                        { label: "165Hz", value: "165", priceAdjustment: 500000 },
                        { label: "240Hz", value: "240", priceAdjustment: 1500000 }
                    ]
                },
                {
                    name: "Panel",
                    type: "radio",
                    required: true,
                    values: [
                        { label: "IPS (Màu sắc tốt)", value: "ips", priceAdjustment: 0 },
                        { label: "VA (Tương phản cao)", value: "va", priceAdjustment: -300000 },
                        { label: "OLED (Premium)", value: "oled", priceAdjustment: 8000000 }
                    ]
                },
                {
                    name: "Tính năng đặc biệt",
                    type: "checkbox",
                    required: false,
                    values: [
                        { label: "G-Sync Compatible", value: "gsync", priceAdjustment: 800000 },
                        { label: "HDR10 Support", value: "hdr", priceAdjustment: 1200000 },
                        { label: "USB-C Hub", value: "usbc", priceAdjustment: 600000 },
                        { label: "Webcam tích hợp", value: "webcam", priceAdjustment: 1000000 }
                    ]
                }
            ]
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
    generateBundleItems();
    setupEventListeners();
    updateSummary();
    setupImageGallery();
});

function generateBundleItems() {
    const bundleProductsContainer = document.querySelector('.bundle-products');
    bundleProductsContainer.innerHTML = '';

    bundleData.bundleItems.forEach(item => {
        const bundleItem = createBundleItemHTML(item);
        bundleProductsContainer.appendChild(bundleItem);
    });
}

function createBundleItemHTML(item) {
    const discountedPrice = calculateDiscountedPrice(item.originalPrice, item.discountType, item.discountValue);
    
    const bundleItem = document.createElement('div');
    bundleItem.className = 'bundle-item expanded';
    bundleItem.innerHTML = `
        <div class="bundle-item-header">
            <div class="bundle-item-main">
                <div class="bundle-checkbox">
                    <input type="checkbox" id="${item.id}" class="bundle-check" data-product="${item.name}">
                    <label for="${item.id}" class="checkbox-label"></label>
                </div>
                <div class="bundle-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="bundle-details">
                    <h4 class="bundle-name">${item.name}</h4>
                    <div class="bundle-pricing">
                        <span class="bundle-original">${formatPrice(item.originalPrice)}</span>
                        <span class="bundle-discounted">${formatPrice(discountedPrice)}</span>
                        <span class="bundle-discount">-${item.discountValue}${item.discountType === 'percentage' ? '%' : 'VNĐ'}</span>
                    </div>
                    <div class="quantity-selector">
                        <label>Số lượng:</label>
                        <select class="qty-select" data-min="${item.minQty}" data-max="${item.maxQty}">
                            ${generateQuantityOptions(item.minQty, item.maxQty)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-options">
            ${generateOptionsHTML(item.options, item.id)}
        </div>
    `;
    
    return bundleItem;
}

function generateQuantityOptions(min, max) {
    let options = '';
    for (let i = min; i <= max; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    return options;
}

function generateOptionsHTML(options, productId) {
    if (!options || options.length === 0) return '';
    
    return options.map(option => {
        const optionId = `${productId}-${option.name.toLowerCase().replace(/\s+/g, '-')}`;
        const isRequired = option.required ? 'required' : '';
        
        switch (option.type) {
            case 'color':
                return `
                    <div class="option-group">
                        <label class="option-label ${isRequired}">${option.name}</label>
                        <div class="color-options">
                            ${option.values.map((value, index) => `
                                <div class="color-option">
                                    <input type="radio" id="${optionId}-${value.value}" name="${optionId}" value="${value.value}" ${index === 0 ? 'checked' : ''} data-price="${value.priceAdjustment}">
                                    <label for="${optionId}-${value.value}" class="color-option-label">
                                        <img src="${value.image}" alt="${value.label}">
                                    </label>
                                    <span class="color-option-text">${value.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            
            case 'radio':
                return `
                    <div class="option-group">
                        <label class="option-label ${isRequired}">${option.name}</label>
                        <div class="radio-options">
                            ${option.values.map((value, index) => `
                                <div class="radio-option">
                                    <input type="radio" id="${optionId}-${value.value}" name="${optionId}" value="${value.value}" ${index === 0 ? 'checked' : ''} data-price="${value.priceAdjustment}">
                                    <div class="radio-option-content">
                                        <label for="${optionId}-${value.value}" class="radio-option-label">${value.label}</label>
                                        <span class="radio-option-price ${value.priceAdjustment < 0 ? 'negative' : ''}">${formatPriceAdjustment(value.priceAdjustment)}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            
            case 'select':
                return `
                    <div class="option-group">
                        <label class="option-label ${isRequired}">${option.name}</label>
                        <select class="select-option" name="${optionId}" data-price-base="0">
                            ${option.values.map((value, index) => `
                                <option value="${value.value}" data-price="${value.priceAdjustment}" ${index === 0 ? 'selected' : ''}>${value.label} ${formatPriceAdjustment(value.priceAdjustment)}</option>
                            `).join('')}
                        </select>
                    </div>
                `;
            
            case 'checkbox':
                return `
                    <div class="option-group">
                        <label class="option-label ${isRequired}">${option.name}</label>
                        <div class="checkbox-options">
                            ${option.values.map(value => `
                                <div class="checkbox-option">
                                    <input type="checkbox" id="${optionId}-${value.value}" name="${optionId}" value="${value.value}" data-price="${value.priceAdjustment}">
                                    <div class="checkbox-option-content">
                                        <label for="${optionId}-${value.value}" class="checkbox-option-label">${value.label}</label>
                                        <span class="checkbox-option-price">${formatPriceAdjustment(value.priceAdjustment)}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            
            default:
                return '';
        }
    }).join('');
}

function formatPriceAdjustment(adjustment) {
    if (adjustment === 0) return '';
    const prefix = adjustment > 0 ? '+' : '';
    return `(${prefix}${formatPrice(adjustment)})`;
}

function setupEventListeners() {
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

    // Setup bundle-specific event listeners
    setupBundleEventListeners();
}

function setupBundleEventListeners() {
    // Bundle checkbox events
    document.querySelectorAll('.bundle-check').forEach(checkbox => {
        checkbox.addEventListener('change', handleBundleSelection);
    });

    // Quantity selector events for bundle items
    document.querySelectorAll('.qty-select').forEach(select => {
        select.addEventListener('change', handleBundleQuantityChange);
    });

    // Option change events
    document.querySelectorAll('.product-options input, .product-options select').forEach(input => {
        input.addEventListener('change', handleOptionChange);
    });

    // Radio and checkbox option styling
    document.querySelectorAll('.radio-option').forEach(option => {
        const input = option.querySelector('input[type="radio"]');
        input.addEventListener('change', function() {
            // Remove selected class from siblings
            this.closest('.radio-options').querySelectorAll('.radio-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            // Add selected class to current option
            if (this.checked) {
                option.classList.add('selected');
            }
        });
        
        // Set initial state
        if (input.checked) {
            option.classList.add('selected');
        }
    });

    document.querySelectorAll('.checkbox-option').forEach(option => {
        const input = option.querySelector('input[type="checkbox"]');
        input.addEventListener('change', function() {
            if (this.checked) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
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
        const bundleElement = document.querySelector(`#${bundleItemData.id}`).closest('.bundle-item');
        const qtySelect = bundleElement.querySelector('.qty-select');
        const quantity = parseInt(qtySelect.value) || 1;
        
        // Get selected options
        const selectedOptions = getSelectedOptions(bundleElement, bundleItemData.id);
        
        selectedBundles.push({
            ...bundleItemData,
            quantity: quantity,
            selectedOptions: selectedOptions
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

function handleOptionChange(event) {
    const input = event.target;
    const bundleItem = input.closest('.bundle-item');
    const checkbox = bundleItem.querySelector('.bundle-check');
    
    // If bundle is selected, update the selection with new options
    if (checkbox.checked) {
        const productId = checkbox.dataset.product;
        updateBundleOptions(productId, bundleItem);
    }
    
    updateSummary();
}

function updateBundleOptions(productId, bundleElement) {
    const bundle = selectedBundles.find(bundle => 
        bundle.name === productId || bundle.id === productId.toLowerCase().replace(/\s+/g, '-')
    );
    
    if (bundle) {
        const bundleItemData = bundleData.bundleItems.find(item => 
            item.name === productId || item.id === productId.toLowerCase().replace(/\s+/g, '-')
        );
        
        bundle.selectedOptions = getSelectedOptions(bundleElement, bundleItemData.id);
    }
}

function getSelectedOptions(bundleElement, productId) {
    const options = {};
    const optionInputs = bundleElement.querySelectorAll('.product-options input, .product-options select');
    
    optionInputs.forEach(input => {
        const optionName = input.name.replace(`${productId}-`, '');
        
        if (input.type === 'radio' && input.checked) {
            options[optionName] = {
                value: input.value,
                priceAdjustment: parseFloat(input.dataset.price) || 0
            };
        } else if (input.type === 'checkbox' && input.checked) {
            if (!options[optionName]) {
                options[optionName] = [];
            }
            options[optionName].push({
                value: input.value,
                priceAdjustment: parseFloat(input.dataset.price) || 0
            });
        } else if (input.tagName === 'SELECT') {
            const selectedOption = input.options[input.selectedIndex];
            options[optionName] = {
                value: input.value,
                priceAdjustment: parseFloat(selectedOption.dataset.price) || 0
            };
        }
    });
    
    return options;
}

function calculateBundlePrice(bundle) {
    let basePrice = bundle.originalPrice;
    
    // Apply option adjustments
    if (bundle.selectedOptions) {
        Object.values(bundle.selectedOptions).forEach(option => {
            if (Array.isArray(option)) {
                // Checkbox options
                option.forEach(opt => {
                    basePrice += opt.priceAdjustment;
                });
            } else {
                // Radio/select options
                basePrice += option.priceAdjustment;
            }
        });
    }
    
    // Apply bundle discount
    return calculateDiscountedPrice(basePrice, bundle.discountType, bundle.discountValue);
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
        const bundlePrice = calculateBundlePrice(bundle);
        const originalTotal = bundle.originalPrice * bundle.quantity;
        
        // Calculate total with options
        let originalPriceWithOptions = bundle.originalPrice;
        if (bundle.selectedOptions) {
            Object.values(bundle.selectedOptions).forEach(option => {
                if (Array.isArray(option)) {
                    option.forEach(opt => {
                        originalPriceWithOptions += opt.priceAdjustment;
                    });
                } else {
                    originalPriceWithOptions += option.priceAdjustment;
                }
            });
        }
        
        const savings = (originalPriceWithOptions - bundlePrice) * bundle.quantity;
        const bundleTotal = bundlePrice * bundle.quantity;
        
        totalSavings += savings;
        totalPrice += bundleTotal;
        
        // Create option summary text
        let optionText = '';
        if (bundle.selectedOptions) {
            const optionParts = [];
            Object.entries(bundle.selectedOptions).forEach(([optionName, option]) => {
                if (Array.isArray(option)) {
                    option.forEach(opt => {
                        optionParts.push(opt.value);
                    });
                } else {
                    optionParts.push(option.value);
                }
            });
            if (optionParts.length > 0) {
                optionText = ` (${optionParts.join(', ')})`;
            }
        }
        
        // Add to summary display
        const summaryRow = document.createElement('div');
        summaryRow.className = 'summary-row';
        summaryRow.innerHTML = `
            <span class="item-name">+ ${bundle.name}${optionText} (x${bundle.quantity})</span>
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