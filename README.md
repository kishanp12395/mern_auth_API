
# 🚀 MERN Authentication API - Complete Documentation

✅ **Live API Base URL:**  
[https://mern-auth-bepd.onrender.com/api/auth](https://mern-auth-bepd.onrender.com/api/auth)

This RESTful API provides secure authentication features including user registration, login, logout, email verification (OTP-based), and password reset functionality.

---

## 🛠 **Local Development Setup**
```bash
git clone https://github.com/kishanp12395/mern_auth.git
cd server
npm install
npm start
```
- 📍 Local API Base URL: `http://localhost:4000/api/auth`

---
## 📊 **API Endpoints Summary Table**
| #  | Endpoint            | Method | Protected 🔐 | Description                      |
|----|---------------------|-------|-------------|----------------------------------|
| 1️⃣ | /register           | POST  | ❌          | Register a new user              |
| 2️⃣ | /login              | POST  | ❌          | Login user                       |
| 3️⃣ | /logout             | POST  | ❌          | Logout user                      |
| 4️⃣ | /data               | GET   | ✅          | Get authenticated user data      |
| 5️⃣ | /is-auth            | GET   | ✅          | Check authentication status      |
| 6️⃣ | /send-otp           | POST  | ✅          | Send email verification OTP      |
| 7️⃣ | /verify-email       | POST  | ✅          | Verify email with OTP            |
| 8️⃣ | /send-reset-otp     | POST  | ❌          | Send OTP for password reset      |
| 9️⃣ | /reset-password     | POST  | ❌          | Reset password with OTP          |

---

## 🌐 **Deployment Info**
✅ API Live: [https://mern-auth-bepd.onrender.com/api/auth](https://mern-auth-bepd.onrender.com/api/auth)
---


## 📌 **Authentication Flow Overview**
✅ Register → ✅ Login → ✅ (Optional) Verify Email → ✅ Access Protected Routes → ✅ Password Reset

---

## 📚 **Endpoints Detailed Guide**

### 1️⃣ **Register User**
- **URL:** `/register`
- **Method:** `POST`
- **Body Example:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```
- **Purpose:** Create a new user account.

---

### 2️⃣ **Login User**
- **URL:** `/login`
- **Method:** `POST`
- **Body Example:**
```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```
- **Purpose:** Authenticate user and receive JWT token in cookies.

---

### 3️⃣ **Logout User**
- **URL:** `/logout`
- **Method:** `POST`
- **Purpose:** Clear token cookies to log the user out.

---

### 4️⃣ **Get Authenticated User Data**
- **URL:** `/data`
- **Method:** `GET`
- **Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Purpose:** Fetch details of the currently authenticated user.

---

### 5️⃣ **Check if User is Authenticated**
- **URL:** `/is-auth`
- **Method:** `GET`
- **Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Purpose:** Validate user session/token.

---

### 6️⃣ **Send Email Verification OTP**
- **URL:** `/send-otp`
- **Method:** `POST`
- **Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Purpose:** Send verification OTP to the registered email.

---

### 7️⃣ **Verify Email using OTP**
- **URL:** `/verify-email`
- **Method:** `POST`
- **Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Body Example:**
```json
{
  "otp": "123456"
}
```
- **Purpose:** Verify user's email with OTP.

---

### 8️⃣ **Send Password Reset OTP**
- **URL:** `/send-reset-otp`
- **Method:** `POST`
- **Body Example:**
```json
{
  "email": "johndoe@example.com"
}
```
- **Purpose:** Send OTP to user's email for password reset.

---

### 9️⃣ **Reset Password with OTP**
- **URL:** `/reset-password`
- **Method:** `POST`
- **Body Example:**
```json
{
  "email": "johndoe@example.com",
  "otp": "123456",
  "newPassword": "newSecurePassword123"
}
```
- **Purpose:** Reset the password using a valid OTP.

---

## 🔐 **Token-Based Authentication Info**
- Add this header to access protected routes:
```
Authorization: Bearer <your-jwt-token>
```
- Token is sent as an HTTP-only cookie upon login for security.
- Store tokens securely on the frontend.

---

## ✅ **Standard Success Response Example**
```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": { }
}
```

## ⚠️ **Standard Error Response Example**
```json
{
  "success": false,
  "message": "Invalid credentials or expired OTP."
}
```

---



---

## 🤝 **Contribution Guidelines**
- Contributions, feature requests, and pull requests are welcome!
- For major changes, open an issue first to discuss what you would like to change.

---

## 📩 **Contact Developer**
- GitHub: [https://github.com/kishanp12395](https://github.com/kishanp12395)
- Email: kishanp12395@example.com

---

⭐ **Thank you for using this MERN Authentication API!** ⭐
