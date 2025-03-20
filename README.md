
# 📌 MERN Authentication API Documentation

Base URL (Live):  
`https://mern-auth-bepd.onrender.com/api/auth`

This API provides authentication features including registration, login, logout, email verification (via OTP), and password reset functionality.

---

## 🚀 **Setup (For Local Development)**
```bash
git clone <repository-url>
cd <project-directory>
npm install
npm start
```
Base URL (Local): `http://localhost:<PORT>/api/auth`

---

## 🛠 **API Endpoints**

## ✅ **1. User Registration**
**URL:** `/register`  
**Method:** `POST`  
**Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```
**Description:** Registers a new user.

---

## ✅ **2. User Login**
**URL:** `/login`  
**Method:** `POST`  
**Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```
**Description:** Logs in the user and sets a token cookie.

---

## ✅ **3. User Logout**
**URL:** `/logout`  
**Method:** `POST`  
**Description:** Logs out the user by clearing the token cookie.

---

## ✅ **4. Get Authenticated User Data**
**URL:** `/data`  
**Method:** `GET`  
**Headers:**
```
Authorization: Bearer <your-jwt-token>
```
**Description:** Returns the authenticated user’s data.

---

## ✅ **5. Check Authentication**
**URL:** `/is-auth`  
**Method:** `GET`  
**Headers:**
```
Authorization: Bearer <your-jwt-token>
```
**Description:** Checks if the user is authenticated.

---

## ✅ **6. Send Email Verification OTP**
**URL:** `/send-otp`  
**Method:** `POST`  
**Headers:**
```
Authorization: Bearer <your-jwt-token>
```
**Description:** Sends OTP to the registered email for verification.

---

## ✅ **7. Verify Email Using OTP**
**URL:** `/verify-email`  
**Method:** `POST`  
**Headers:**
```
Authorization: Bearer <your-jwt-token>
```
**Body:**
```json
{
  "otp": "123456"
}
```
**Description:** Verifies the email using OTP.

---

## ✅ **8. Send Password Reset OTP**
**URL:** `/send-reset-otp`  
**Method:** `POST`  
**Body:**
```json
{
  "email": "johndoe@example.com"
}
```
**Description:** Sends OTP to the user’s email for password reset.

---

## ✅ **9. Reset Password**
**URL:** `/reset-password`  
**Method:** `POST`  
**Body:**
```json
{
  "email": "johndoe@example.com",
  "otp": "123456",
  "newPassword": "newpassword123"
}
```
**Description:** Resets the password if the OTP is verified.

---

## 🔐 **Authentication**
For protected routes, include the token:
```
Authorization: Bearer <your-jwt-token>
```
- Token is provided in cookies or returned by the login route.
- Frontend should store it securely (e.g., httpOnly cookie or state).

---

## 📬 **Response Example (Success)**
```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": { ... }
}
```

## ⚠️ **Response Example (Error)**
```json
{
  "success": false,
  "message": "Invalid credentials."
}
```

---

## 🌐 **Deployment**
✅ Live API is deployed on Render:  
👉 `https://mern-auth-bepd.onrender.com/api/auth`

---

## 📄 **Summary**
| Endpoint              | Method | Auth | Description                             |
|-----------------------|-------|------|-----------------------------------------|
| `/register`           | POST  | ❌   | Register user                           |
| `/login`              | POST  | ❌   | Login user                              |
| `/logout`             | POST  | ❌   | Logout user                             |
| `/data`               | GET   | ✅   | Get user data                           |
| `/is-auth`            | GET   | ✅   | Check authentication status             |
| `/send-otp`           | POST  | ✅   | Send email verification OTP             |
| `/verify-email`       | POST  | ✅   | Verify email using OTP                  |
| `/send-reset-otp`     | POST  | ❌   | Send OTP for password reset             |
| `/reset-password`     | POST  | ❌   | Reset password with OTP                 |

---

## 🤝 **Contributing**
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
