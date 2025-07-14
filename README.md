# BC Bundle Product App

Ứng dụng quản lý Bundle Products được xây dựng bằng HTML, CSS và JavaScript thuần.

## 🚀 Demo

Xem ứng dụng trực tiếp tại: [https://allcommerce.github.io/bc-bundleproductapp-draft](https://allcommerce.github.io/bc-bundleproductapp-draft)

## ✨ Tính năng

- **Quản lý Bundle Products**: Liệt kê, thêm, sửa, xóa bundle products
- **Tìm kiếm thông minh**: Autocomplete cho việc chọn sản phẩm chính và sản phẩm con
- **Cấu hình giảm giá linh hoạt**: 
  - Giảm giá theo phần trăm (0-100%)
  - Giảm giá cố định (VNĐ)
- **Quản lý số lượng**: Thiết lập giới hạn tối thiểu và tối đa cho sản phẩm con
- **Giao diện responsive**: Hoạt động tốt trên desktop và mobile
- **Validation form**: Kiểm tra dữ liệu nhập vào một cách thông minh

## 🛠️ Công nghệ sử dụng

- HTML5
- CSS3 (Flexbox, Grid, Responsive Design)
- Vanilla JavaScript (ES6+)
- GitHub Pages (Deployment)

## 🚀 Cài đặt và Chạy

### Chạy local

```bash
# Clone repository
git clone https://github.com/allcommerce/bc-bundleproductapp-draft.git
cd bc-bundleproductapp-draft

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:8080`

### Deploy lên GitHub Pages

```bash
# Cài đặt gh-pages (nếu chưa có)
npm install

# Deploy lên GitHub Pages
npm run publish
```

Hoặc sử dụng GitHub Actions để tự động deploy khi push code lên main branch.

## 📁 Cấu trúc Project

```
bc-bundleproductapp/
├── index.html          # Giao diện chính
├── styles.css          # Styling và responsive design
├── script.js           # Logic ứng dụng
├── package.json        # Cấu hình npm và dependencies
├── .gitignore          # Git ignore rules
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
├── CLAUDE.md           # Hướng dẫn cho Claude Code
├── DRAFT.md            # Yêu cầu ban đầu (tiếng Việt)
└── README.md           # Tài liệu này
```

## 📋 Hướng dẫn sử dụng

### 1. Xem danh sách Bundle Products
- Mở ứng dụng để xem bảng liệt kê các bundle products đã tạo
- Thông tin hiển thị: ID, tên, sản phẩm chính, số sản phẩm con, ngày tạo

### 2. Thêm Bundle Product mới
- Click nút "Thêm Bundle Product mới"
- Nhập tên bundle product
- Tìm kiếm và chọn sản phẩm chính
- Thêm các sản phẩm con:
  - Tìm kiếm tên sản phẩm con
  - Chọn loại giảm giá (% hoặc VNĐ)
  - Nhập giá trị giảm giá
  - Thiết lập số lượng tối thiểu và tối đa
- Click "Lưu Bundle Product"

### 3. Chỉnh sửa Bundle Product
- Click nút "Sửa" trong bảng danh sách
- Thay đổi thông tin cần thiết
- Click "Lưu Bundle Product"

### 4. Xóa Bundle Product
- Click nút "Xóa" trong bảng danh sách
- Xác nhận việc xóa

## 🔧 Development

### Thêm sản phẩm mới vào danh sách
Chỉnh sửa mảng `availableProducts` trong file `script.js`:

```javascript
let availableProducts = [
    "Gaming Laptop", "Office Laptop", "MacBook Pro", "Dell XPS",
    // Thêm sản phẩm mới ở đây
    "Sản phẩm mới"
];
```

### Tùy chỉnh giao diện
- Chỉnh sửa `styles.css` để thay đổi màu sắc, font chữ
- Responsive breakpoints có thể điều chỉnh trong media queries

## 📝 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📞 Hỗ trợ

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trên GitHub repository.