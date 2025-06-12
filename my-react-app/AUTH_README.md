# Authentication System - React Redux JWT

This project now includes a complete authentication system with JWT tokens, login, signup, and a protected dashboard.

## Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 📝 **User Registration** - Sign up with name, email, and password
- 🔑 **User Login** - Sign in with email and password
- 🛡️ **Protected Routes** - Dashboard accessible only to authenticated users
- 🗄️ **Token Storage** - JWT tokens stored in localStorage
- 🔄 **Auto Token Refresh** - Automatic token validation and logout on expiry
- 📱 **Responsive Design** - Beautiful, modern UI that works on all devices

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Application with Mock Server
```bash
npm run dev:full
```

This command will start both:
- **React App** on `http://localhost:5173`
- **Mock API Server** on `http://localhost:3001`

### 3. Alternative: Run Separately
```bash
# Terminal 1 - Start the mock server
npm run server

# Terminal 2 - Start the React app
npm run dev
```

## Authentication Flow

### 1. **Sign Up**
- Navigate to `/signup` or click "Create Account" from the home page
- Fill in your name, email, and password
- Form includes validation for:
  - Name (minimum 2 characters)
  - Valid email format
  - Password (minimum 6 characters)
  - Password confirmation match
- Upon successful signup, you'll receive a JWT token and be redirected to the dashboard

### 2. **Sign In**
- Navigate to `/login` or click "Sign In" from the home page
- Enter your email and password
- Upon successful login, you'll receive a JWT token and be redirected to the dashboard

### 3. **Dashboard**
- Protected route accessible only to authenticated users
- Displays user information and dashboard statistics
- Includes logout functionality
- Auto-redirects to login if token is invalid or expired

### 4. **Logout**
- Click the "Logout" button in the dashboard
- Clears the JWT token from localStorage
- Redirects to the home page

## Technical Implementation

### Redux Store Structure
```javascript
auth: {
  user: null,              // User object (id, name, email)
  token: string,           // JWT token
  isLoading: boolean,      // Loading state for auth operations
  isAuthenticated: boolean, // Authentication status
  error: string           // Error messages
}
```

### API Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/dashboard` - Protected dashboard data (requires Bearer token)

### Security Features
- **Password Hashing**: Passwords are hashed using bcrypt
- **JWT Tokens**: Secure tokens with 24-hour expiration
- **Protected Routes**: Dashboard requires valid authentication
- **Auto Token Validation**: Interceptors check token validity
- **Secure Storage**: Tokens stored in localStorage (consider httpOnly cookies for production)

## File Structure

```
src/
├── components/
│   ├── Login.jsx           # Login form component
│   ├── Signup.jsx          # Registration form component
│   ├── Dashboard.jsx       # Protected dashboard component
│   └── ProtectedRoute.jsx  # Route protection wrapper
├── store/
│   ├── authSlice.js        # Authentication Redux slice
│   └── index.js           # Redux store configuration
├── utils/
│   └── api.js             # Axios instance with interceptors
└── App.jsx                # Main app with routing
```

## Mock Server

The included mock server (`mock-server.js`) provides:
- In-memory user storage
- JWT token generation and validation
- Password hashing with bcrypt
- CORS enabled for development
- RESTful API endpoints

**Note**: This is for development only. In production, replace with a proper backend server.

## Styling

The authentication components use custom CSS classes:
- `.auth-container` - Full-screen authentication layout
- `.auth-card` - Authentication form card
- `.dashboard-container` - Dashboard layout
- `.error-message` - Error display styling
- `.field-error` - Field validation error styling

## Production Considerations

When deploying to production:

1. **Replace Mock Server**: Use a proper backend (Node.js, Python, etc.)
2. **Environment Variables**: Store JWT secrets in environment variables
3. **HTTPS**: Always use HTTPS in production
4. **Token Storage**: Consider httpOnly cookies instead of localStorage
5. **Token Refresh**: Implement refresh token mechanism
6. **Rate Limiting**: Add rate limiting to prevent brute force attacks
7. **Input Validation**: Add server-side validation
8. **Error Handling**: Implement comprehensive error handling

## Testing the Authentication

1. **Sign Up**: Create a new account with any email/password
2. **Sign In**: Use the same credentials to log in
3. **Dashboard**: Access the protected dashboard
4. **Logout**: Test the logout functionality
5. **Protected Route**: Try accessing `/dashboard` without authentication

The mock server stores users in memory, so data will be lost when the server restarts. 