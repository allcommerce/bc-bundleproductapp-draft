// Sample data for demonstration
let bundleProducts = [
    {
        id: 1,
        name: "Bundle Gaming Setup",
        mainProduct: "Gaming Laptop",
        childProducts: [
            { name: "Gaming Mouse", discountType: "percentage", discountValue: 10, minQty: 1, maxQty: 2 },
            { name: "Gaming Keyboard", discountType: "percentage", discountValue: 15, minQty: 1, maxQty: 1 }
        ],
        createdDate: "2024-01-15"
    },
    {
        id: 2,
        name: "Bundle Office Setup",
        mainProduct: "Office Laptop",
        childProducts: [
            { name: "Wireless Mouse", discountType: "fixed", discountValue: 50000, minQty: 1, maxQty: 1 },
            { name: "USB Hub", discountType: "percentage", discountValue: 20, minQty: 1, maxQty: 3 }
        ],
        createdDate: "2024-01-20"
    }
];

let availableProducts = [
    "Gaming Laptop", "Office Laptop", "MacBook Pro", "Dell XPS",
    "Gaming Mouse", "Wireless Mouse", "Gaming Keyboard", 
    "USB Hub", "Monitor 24''", "Monitor 27''", "Webcam HD", "Speakers"
];

let currentEditingId = null;

// DOM Elements
const listPage = document.getElementById('list-page');
const formPage = document.getElementById('form-page');
const addNewBtn = document.getElementById('add-new-btn');
const backBtn = document.getElementById('back-btn');
const bundleForm = document.getElementById('bundle-form');
const formTitle = document.getElementById('form-title');
const mainProductInput = document.getElementById('main-product');
const mainProductSuggestions = document.getElementById('main-product-suggestions');
const addProductBtn = document.getElementById('add-product-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderBundleTable();
    setupEventListeners();
    setupAutocomplete();
}

function setupEventListeners() {
    addNewBtn.addEventListener('click', showAddForm);
    backBtn.addEventListener('click', showListPage);
    cancelBtn.addEventListener('click', showListPage);
    bundleForm.addEventListener('submit', handleFormSubmit);
    addProductBtn.addEventListener('click', addChildProductRow);
}

function setupAutocomplete() {
    setupMainProductAutocomplete();
}

function setupMainProductAutocomplete() {
    mainProductInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        showSuggestions(mainProductSuggestions, query, availableProducts, (selectedProduct) => {
            mainProductInput.value = selectedProduct;
            hideSuggestions(mainProductSuggestions);
        });
    });

    mainProductInput.addEventListener('blur', function() {
        setTimeout(() => hideSuggestions(mainProductSuggestions), 200);
    });

    mainProductInput.addEventListener('focus', function() {
        if (this.value) {
            const query = this.value.toLowerCase();
            showSuggestions(mainProductSuggestions, query, availableProducts, (selectedProduct) => {
                mainProductInput.value = selectedProduct;
                hideSuggestions(mainProductSuggestions);
            });
        }
    });
}

function showSuggestions(container, query, products, onSelect) {
    const filteredProducts = products.filter(product => 
        product.toLowerCase().includes(query)
    );

    container.innerHTML = '';

    if (filteredProducts.length === 0 && query.length > 0) {
        container.innerHTML = '<div class="no-results">Không tìm thấy sản phẩm</div>';
        container.style.display = 'block';
        return;
    }

    if (query.length === 0) {
        hideSuggestions(container);
        return;
    }

    filteredProducts.forEach(product => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = product;
        item.addEventListener('click', () => onSelect(product));
        container.appendChild(item);
    });

    container.style.display = filteredProducts.length > 0 ? 'block' : 'none';
}

function hideSuggestions(container) {
    container.style.display = 'none';
}

function renderBundleTable() {
    const tbody = document.getElementById('bundle-tbody');
    tbody.innerHTML = '';

    if (bundleProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <h3>Chưa có bundle product nào</h3>
                    <p>Nhấn "Thêm Bundle Product mới" để bắt đầu</p>
                </td>
            </tr>
        `;
        return;
    }

    bundleProducts.forEach(bundle => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bundle.id}</td>
            <td>${bundle.name}</td>
            <td>${bundle.mainProduct}</td>
            <td>${bundle.childProducts.length}</td>
            <td>${formatDate(bundle.createdDate)}</td>
            <td>
                <button class="btn btn-edit" onclick="editBundle(${bundle.id})">Sửa</button>
                <button class="btn btn-danger" onclick="deleteBundle(${bundle.id})">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function showAddForm() {
    currentEditingId = null;
    formTitle.textContent = 'Thêm Bundle Product mới';
    bundleForm.reset();
    clearChildProductsTable();
    showFormPage();
}

function showFormPage() {
    listPage.classList.remove('active');
    formPage.classList.add('active');
}

function showListPage() {
    formPage.classList.remove('active');
    listPage.classList.add('active');
    bundleForm.reset();
    clearChildProductsTable();
}

function editBundle(id) {
    const bundle = bundleProducts.find(b => b.id === id);
    if (!bundle) return;

    currentEditingId = id;
    formTitle.textContent = 'Chỉnh sửa Bundle Product';
    
    // Populate form fields
    document.getElementById('bundle-name').value = bundle.name;
    mainProductInput.value = bundle.mainProduct;
    
    // Clear and populate child products table
    clearChildProductsTable();
    bundle.childProducts.forEach(product => {
        addChildProductRow(product);
    });
    
    showFormPage();
}

function deleteBundle(id) {
    if (confirm('Bạn có chắc chắn muốn xóa bundle product này?')) {
        bundleProducts = bundleProducts.filter(bundle => bundle.id !== id);
        renderBundleTable();
        showMessage('Bundle product đã được xóa thành công!', 'success');
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(bundleForm);
    const bundleName = formData.get('bundleName');
    const mainProduct = formData.get('mainProduct');
    
    if (!bundleName || !mainProduct) {
        showMessage('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }
    
    let childProducts;
    try {
        childProducts = getChildProductsFromTable();
        if (childProducts.length === 0) {
            showMessage('Vui lòng thêm ít nhất một sản phẩm con!', 'error');
            return;
        }
    } catch (error) {
        showMessage(error.message, 'error');
        return;
    }
    
    const bundleData = {
        name: bundleName,
        mainProduct: mainProduct,
        childProducts: childProducts,
        createdDate: new Date().toISOString().split('T')[0]
    };
    
    if (currentEditingId) {
        // Update existing bundle
        const index = bundleProducts.findIndex(b => b.id === currentEditingId);
        if (index !== -1) {
            bundleProducts[index] = { ...bundleData, id: currentEditingId };
            showMessage('Bundle product đã được cập nhật thành công!', 'success');
        }
    } else {
        // Add new bundle
        const newId = Math.max(...bundleProducts.map(b => b.id), 0) + 1;
        bundleProducts.push({ ...bundleData, id: newId });
        showMessage('Bundle product đã được thêm thành công!', 'success');
    }
    
    renderBundleTable();
    showListPage();
}

function addChildProductRow(productData = null) {
    const tbody = document.getElementById('child-products-tbody');
    const row = document.createElement('tr');
    
    const uniqueId = 'product-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    
    row.innerHTML = `
        <td>
            <div class="autocomplete-container">
                <input type="text" class="child-product-input" placeholder="Tìm kiếm sản phẩm..." 
                       value="${productData ? productData.name : ''}" required autocomplete="off">
                <div class="suggestions-list" id="${uniqueId}-suggestions"></div>
            </div>
        </td>
        <td>
            <select class="discount-type-select" required>
                <option value="percentage" ${productData && productData.discountType === 'percentage' ? 'selected' : ''}>%</option>
                <option value="fixed" ${productData && productData.discountType === 'fixed' ? 'selected' : ''}>VNĐ</option>
            </select>
        </td>
        <td>
            <input type="number" class="discount-value-input" min="0" step="0.1" 
                   value="${productData ? productData.discountValue : ''}" placeholder="0" required>
        </td>
        <td>
            <input type="number" class="min-qty-input" min="1" 
                   value="${productData ? productData.minQty : ''}" placeholder="1" required>
        </td>
        <td>
            <input type="number" class="max-qty-input" min="1" 
                   value="${productData ? productData.maxQty : ''}" placeholder="10" required>
        </td>
        <td>
            <button type="button" class="btn btn-danger" onclick="removeChildProductRow(this)">Xóa</button>
        </td>
    `;
    
    tbody.appendChild(row);
    
    // Setup autocomplete for the new row
    const input = row.querySelector('.child-product-input');
    const suggestions = row.querySelector('.suggestions-list');
    setupChildProductAutocomplete(input, suggestions);
    
    // Update discount value constraints based on type
    const discountTypeSelect = row.querySelector('.discount-type-select');
    const discountValueInput = row.querySelector('.discount-value-input');
    updateDiscountConstraints(discountTypeSelect, discountValueInput);
    
    discountTypeSelect.addEventListener('change', function() {
        updateDiscountConstraints(this, discountValueInput);
    });
}

function setupChildProductAutocomplete(input, suggestions) {
    input.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        showSuggestions(suggestions, query, availableProducts, (selectedProduct) => {
            input.value = selectedProduct;
            hideSuggestions(suggestions);
        });
    });

    input.addEventListener('blur', function() {
        setTimeout(() => hideSuggestions(suggestions), 200);
    });

    input.addEventListener('focus', function() {
        if (this.value) {
            const query = this.value.toLowerCase();
            showSuggestions(suggestions, query, availableProducts, (selectedProduct) => {
                input.value = selectedProduct;
                hideSuggestions(suggestions);
            });
        }
    });
}

function updateDiscountConstraints(typeSelect, valueInput) {
    if (typeSelect.value === 'percentage') {
        valueInput.max = '100';
        valueInput.placeholder = '0-100';
        valueInput.step = '0.1';
    } else {
        valueInput.removeAttribute('max');
        valueInput.placeholder = '0';
        valueInput.step = '1000';
    }
}

function removeChildProductRow(button) {
    const row = button.closest('tr');
    row.remove();
}

function clearChildProductsTable() {
    const tbody = document.getElementById('child-products-tbody');
    tbody.innerHTML = '';
}

function getChildProductsFromTable() {
    const rows = document.querySelectorAll('#child-products-tbody tr');
    const childProducts = [];
    
    rows.forEach(row => {
        const productName = row.querySelector('.child-product-input').value;
        const discountType = row.querySelector('.discount-type-select').value;
        const discountValue = parseFloat(row.querySelector('.discount-value-input').value);
        const minQty = parseInt(row.querySelector('.min-qty-input').value);
        const maxQty = parseInt(row.querySelector('.max-qty-input').value);
        
        if (productName && discountType && !isNaN(discountValue) && !isNaN(minQty) && !isNaN(maxQty)) {
            if (minQty > maxQty) {
                throw new Error('Số lượng tối thiểu không thể lớn hơn số lượng tối đa');
            }
            
            // Validate discount value based on type
            if (discountType === 'percentage' && (discountValue < 0 || discountValue > 100)) {
                throw new Error('Tỷ lệ giảm giá phải từ 0% đến 100%');
            }
            
            if (discountType === 'fixed' && discountValue < 0) {
                throw new Error('Giá trị giảm giá cố định không thể âm');
            }
            
            childProducts.push({
                name: productName,
                discountType: discountType,
                discountValue: discountValue,
                minQty: minQty,
                maxQty: maxQty
            });
        }
    });
    
    return childProducts;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the active page
    const activePage = document.querySelector('.page.active');
    activePage.insertBefore(messageDiv, activePage.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Global functions for button onclick events
window.editBundle = editBundle;
window.deleteBundle = deleteBundle;
window.removeChildProductRow = removeChildProductRow;