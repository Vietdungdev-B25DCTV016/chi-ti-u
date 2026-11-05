# LẬP TRÌNH WEB (LTW) — BÀI THỰC HÀNH 03 (N1)
## Ứng dụng "Sổ Chi Tiêu Cá Nhân" (Personal Expense Tracker)

> **Mã học phần:** RIPT1306-20261-07  
> **Sinh viên thực hiện:** [Điền Họ và Tên của bạn tại đây]  
> **Mã sinh viên:** [Điền Mã Sinh Viên tại đây]  
> **Lớp:** [Điền Lớp tại đây]  
> **Trạng thái kho lưu trữ:** PUBLIC  

---

## 📌 Giới thiệu dự án

Dự án xây dựng ứng dụng **"Sổ chi tiêu cá nhân"** nhằm ghi lại các khoản chi tiêu hằng ngày (nội dung, số tiền, loại: Ăn uống / Đi lại / Học tập / Giải trí, ngày chi). Giao diện gồm header có đồng hồ thời gian thực, form thêm khoản chi với validation, nút lọc theo danh mục, ô tìm kiếm, danh sách khoản chi với nút Xóa (xác nhận `confirm`), và dòng tổng tiền.

Ứng dụng được xây dựng hai lần theo đúng yêu cầu đề bài:
1. **`part-a-class/`**: Xây dựng hoàn toàn bằng **React Class Component**.
2. **`part-b-hooks/`**: Viết lại toàn bộ bằng **Function Component + React Hooks**, tích hợp API qua **MockAPI** với custom hook `useFetch`, tự động focus bằng `useRef`, chuyển đổi giao diện Sáng/Tối bằng `useContext`.
3. **Không sử dụng:** React Router, Redux, các thư viện UI bên ngoài (Bootstrap, Tailwind, AntD, MUI,...). Toàn bộ giao diện được viết bằng **Pure Modern CSS**.

---

## 🚀 Hướng dẫn cài đặt và chạy ứng dụng

### Yêu cầu hệ thống
- **Node.js**: Phiên bản 18+ (khuyên dùng Node 20 hoặc Node 22+)
- **Trình quản lý gói**: `npm` hoặc `yarn`

---

### Cách chạy Phần A (Class Component)

```bash
# 1. Di chuyển vào thư mục part-a-class
cd part-a-class

# 2. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 3. Khởi chạy server phát triển
npm run dev
```

> Mặc định ứng dụng chạy tại: `http://localhost:5173/` (hoặc cổng hiển thị trên Terminal).  
> Để dừng ứng dụng: Nhấn `Ctrl + C`.

---

### Cách chạy Phần B (Function Component + Hooks)

```bash
# 1. Di chuyển vào thư mục part-b-hooks
cd part-b-hooks

# 2. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 3. Khởi chạy server phát triển
npm run dev
```

> Mặc định ứng dụng chạy tại: `http://localhost:5173/` (hoặc cổng tiếp theo nếu Part A đang chạy).  
> Để dừng ứng dụng: Nhấn `Ctrl + C`.

---

## 🧠 Phân tích: Hooks đã giúp khắc phục các thách thức của Class Component như thế nào?

*(Yêu cầu bắt buộc mục 4 của Phần B)*

Qua việc trực tiếp xây dựng cùng một bài toán bằng cả hai phương pháp, React Hooks đã giải quyết triệt để các hạn chế cố hữu của Class Component trong bài thực hành này:

| Tiêu chí | Phần A: Class Component | Phần B: Function Component + Hooks | Lợi ích khắc phục |
| :--- | :--- | :--- | :--- |
| **Logic vòng đời (Lifecycle)** | Bị phân mảnh giữa `componentDidMount`, `componentDidUpdate`, và `componentWillUnmount`. Ví dụ: Logic cập nhật tiêu đề tab phải viết ở cả `componentDidMount` và `componentDidUpdate`; timer của đồng hồ phải tách ở `componentDidMount` (bắt đầu) và `componentWillUnmount` (hủy). | Gom gọn trong một `useEffect` duy nhất kèm hàm `return () => cleanup` hoặc mảng phụ thuộc `[deps]`. | Mã nguồn liền mạch, dễ đọc, gom nhóm logic theo tính năng thay vì phân tán theo thời điểm vòng đời của React. |
| **Tái sử dụng logic (Code Reuse)** | Rất khó chia sẻ logic có state (như timer đồng hồ, fetch dữ liệu, debounce tìm kiếm) giữa các component nếu không dùng Higher-Order Component (HOC) hoặc Render Props phức tạp và lồng sâu (wrapper hell). | Tạo **Custom Hook** (`useClock`, `useFetch`, `useDebounce`) độc lập, tái sử dụng linh hoạt ở bất kỳ đâu chỉ với 1 dòng gọi hàm. | Đạt tính mô-đun hóa tối đa, code gọn gàng, giảm trùng lặp mã (DRY). |
| **Ngữ cảnh `this` và Event Binding** | Phải thủ công `bind(this)` trong `constructor` hoặc dùng cú pháp arrow function class fields. Lập trình viên mới rất dễ gặp lỗi `undefined this`. | Không có từ khóa `this`. Tất cả hàm sự kiện đều là standard JavaScript functions hoặc arrow functions với lexical scoping trực quan. | Loại bỏ hoàn toàn lỗi mất ngữ cảnh `this`. |
| **Tương tác DOM (Focus input)** | Phải dùng `React.createRef()` trong constructor, truy cập qua `this.myRef.current`, cú pháp dài dòng. | Khai báo trực tiếp `const titleInputRef = useRef(null)`. Gọi `titleInputRef.current?.focus()` ngay sau khi submit form. | Cú pháp tự nhiên, nhanh chóng và an toàn hơn. |
| **Chia sẻ State toàn cục (Theme)** | Phải truyền `props` xuyên qua nhiều tầng component (prop drilling) hoặc dùng `Context.Consumer` dạng render props rườm rà. | Sử dụng `const { theme, toggleTheme } = useContext(ThemeContext)`. | Bất kỳ component con nào cũng có thể truy xuất và chuyển đổi Theme trực tiếp mà không cần nhận props trung gian. |

---

## ✨ Tính năng chi tiết

### 1. Phần A – Class Component
- **Kiến trúc Component:**
  - `App.jsx`: Component cha giữ state danh sách khoản chi (`expenses`), loại đang lọc (`selectedCategory`), từ khóa tìm kiếm (`searchTerm`), và cờ hiển thị đồng hồ (`showClock`).
  - `Header.jsx`: Chứa tiêu đề và nút ẩn/hiện đồng hồ để kiểm chứng `componentWillUnmount`.
  - `Clock.jsx`: Đồng hồ chạy mỗi giây. Dùng `componentDidMount` kích hoạt `setInterval` và `componentWillUnmount` gọi `clearInterval` để tránh rò rỉ bộ nhớ (có log console chi tiết).
  - `ExpenseForm.jsx`: Form nhập liệu đầy đủ validate (tiêu đề bắt buộc $\ge 2$ ký tự, số tiền $> 0$, chọn danh mục hợp lệ, chọn ngày).
  - `ExpenseFilter.jsx`: Nút lọc nhanh theo danh mục (Ăn uống, Đi lại, Học tập, Giải trí) kèm số đếm bản ghi.
  - `ExpenseList.jsx` & `ExpenseItem.jsx`: Danh sách khoản chi dùng `key={expense.id}`, nút Xóa có hộp thoại xác nhận `window.confirm`.
  - `ExpenseSummary.jsx`: Thống kê tổng tiền theo từng loại chi tiêu với thanh % trực quan.
- **Tiêu đề Tab (document.title):**
  - Tự động đồng bộ và hiển thị tổng tiền chi tiêu qua `componentDidUpdate`.

### 2. Phần B – Function Component + Hooks
- **Toàn bộ Function Component:** Chuyển đổi toàn diện sang `useState`, `useEffect`, `useRef`, `useContext`, `useMemo`, `useCallback`.
- **Custom Hook `useFetch` (MockAPI Integration):**
  - Thực hiện các thao tác RESTful: `GET` (lấy danh sách), `POST` (thêm khoản chi), `DELETE` (xóa khoản chi).
  - Có đầy đủ trạng thái đang tải (`loading`) với spinner và thông báo lỗi (`error`) kèm nút **Thử lại**.
  - Tích hợp cơ chế **Local Cache Fallback**: Tự động dự phòng dữ liệu nếu MockAPI quá hạn mức/mất mạng, giúp giảng viên chấm bài chấm điểm luôn mượt mà.
  - Hộp thoại cấu hình nhanh URL MockAPI ngay trên giao diện (nút `⚙️ MockAPI`).
- **Focus với `useRef`:**
  - Tự động đưa con trỏ chuột focus lại vào ô nhập nội dung sau khi thêm khoản chi thành công.
- **Chế độ Sáng/Tối với `useContext`:**
  - `ThemeContext` cung cấp theme (`light` / `dark`) và hàm `toggleTheme`.
  - Hệ thống CSS biến (CSS Variables) chuyển đổi mượt mà toàn bộ màu nền, text, border, card.
- **Tiêu đề Tab (document.title):**
  - Cập nhật tự động thông qua `useEffect` theo dõi biến `totalFilteredAmount` và `selectedCategory`.

### 3. Yêu cầu nâng cao (Đã hoàn thành 100%)
- ⭐ **Custom hook `useClock`:** Tách toàn bộ logic đồng hồ thành hook độc lập tại `src/hooks/useClock.js`. Quản lý `setInterval` và tự động cleanup khi component unmount.
- ⭐ **Thống kê tổng tiền theo từng loại:** Bảng phân tích chi tiêu đa chiều (`ExpenseSummary`), tính tổng tiền cho từng danh mục (Ăn uống, Đi lại, Học tập, Giải trí), số lượng giao dịch và tỷ lệ % kèm thanh tiến trình CSS.
- ⭐ **Ô tìm kiếm có độ trễ (debounce):** Custom hook `useDebounce` với độ trễ 400ms tại `src/hooks/useDebounce.js`. Giúp việc gõ tìm kiếm phản hồi tức thì trên input nhưng chỉ thực hiện lọc khi người dùng tạm ngừng gõ, tối ưu hiệu năng render.

---

## 🌐 Hướng dẫn cấu hình MockAPI (mockapi.io)

Phần B đã được tích hợp sẵn một endpoint mặc định và hệ thống tự động fallback. Nếu bạn muốn sử dụng API cá nhân của mình:

1. Đăng ký tài khoản miễn phí tại [https://mockapi.io/](https://mockapi.io/).
2. Tạo một Project mới (ví dụ: `PersonalExpense`).
3. Tạo một Resource tên là `expenses` với cấu trúc schema:
   - `id`: Faker.js ID (hoặc Number)
   - `title`: String
   - `amount`: Number
   - `category`: String
   - `date`: String
4. Sao chép API Endpoint (dạng: `https://<your-id>.mockapi.io/api/v1/expenses`).
5. Trong ứng dụng Phần B, click vào nút **`⚙️ MockAPI`** ở góc phải Header -> Dán URL của bạn vào -> Nhấn **Lưu URL**.

---

## 📁 Cấu trúc thư mục

```text
chi tiêu cá nhân/
├── README.md                      # Báo cáo và hướng dẫn bài thực hành
├── .gitignore                     # Cấu hình bỏ qua node_modules và dist
│
├── part-a-class/                  # PHẦN A: REACT CLASS COMPONENT
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                # State tổng, componentDidUpdate document.title
│       ├── App.css                # CSS giao diện thuần
│       ├── index.css
│       ├── components/
│       │   ├── Header.jsx         # Nút toggle ẩn/hiện đồng hồ
│       │   ├── Clock.jsx          # componentDidMount, componentWillUnmount
│       │   ├── ExpenseForm.jsx    # Form validate chi tiêu
│       │   ├── ExpenseFilter.jsx  # Bộ lọc danh mục & tìm kiếm
│       │   ├── ExpenseList.jsx    # Danh sách, key, dòng tổng tiền
│       │   ├── ExpenseItem.jsx    # Item, xác nhận confirm xóa
│       │   └── ExpenseSummary.jsx # Thống kê chi tiêu theo từng loại
│       ├── data/
│       │   └── initialData.js     # Dữ liệu mẫu ban đầu
│       └── utils/
│           └── formatters.js      # Định dạng tiền tệ VND & ngày tháng
│
└── part-b-hooks/                  # PHẦN B: FUNCTION COMPONENT & HOOKS
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx               # Bọc ThemeProvider
        ├── App.jsx                # Function component, useEffect document.title
        ├── App.css                # CSS hỗ trợ Light/Dark mode
        ├── index.css
        ├── context/
        │   └── ThemeContext.jsx   # useContext cho chế độ sáng/tối
        ├── hooks/
        │   ├── useClock.js        # Custom hook đồng hồ (Yêu cầu nâng cao)
        │   ├── useDebounce.js     # Custom hook debounce tìm kiếm (Yêu cầu nâng cao)
        │   └── useFetch.js        # Custom hook GET/POST/DELETE MockAPI + fallback
        ├── components/
        │   ├── Header.jsx         # Chuyển Theme, toggle Clock, config MockAPI
        │   ├── Clock.jsx          # Dùng useClock
        │   ├── ExpenseForm.jsx    # Dùng useRef focus ô nhập sau khi thêm
        │   ├── ExpenseFilter.jsx  # Ô tìm kiếm có debounce 400ms
        │   ├── ExpenseList.jsx    # Loading, Error, Empty state, dòng tổng tiền
        │   ├── ExpenseItem.jsx    # Xác nhận xóa
        │   ├── ExpenseSummary.jsx # Thống kê theo loại (Yêu cầu nâng cao)
        │   └── ApiConfigModal.jsx # Modal chỉnh sửa URL MockAPI
        ├── data/
        │   └── initialData.js
        └── utils/
            └── formatters.js
```

---

## 📤 Hướng dẫn nộp bài lên GitHub

Để đưa toàn bộ dự án lên kho GitHub cá nhân (chế độ **PUBLIC**) theo yêu cầu:

```bash
# 1. Khởi tạo Git và thêm tất cả các tệp (ở thư mục gốc)
git add .
git commit -m "feat: complete LTW Lab 03 - Personal Expense Tracker (Part A Class & Part B Hooks)"

# 2. Đổi nhánh chính sang main
git branch -M main

# 3. Tạo một Repository mới trên GitHub của bạn và đặt chế độ PUBLIC
# Sau đó liên kết và push (thay URL bằng link repo của bạn):
git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git
git push -u origin main
```
