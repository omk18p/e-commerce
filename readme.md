# NovaMart: Modern E-commerce Platform

![NovaMart Banner](https://github.com/omk18p/e-commerce/blob/main/frontend/src/assets/images/banner3.jpg?raw=true)

## 🚀 Live Demo

- **Frontend**: [https://e-commerce-orpin-alpha.vercel.app](https://e-commerce-orpin-alpha.vercel.app)
- **Backend**: [https://e-commerce-5rkc.onrender.com](https://e-commerce-5rkc.onrender.com)

## ✨ About NovaMart

**NovaMart** is a cutting-edge full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It features a sophisticated dark theme with glassmorphism design, advanced search capabilities, and modern user experience powered by Redux Toolkit and Material UI.

## 🛍️ Features

### 🎯 **Advanced Search & Discovery**
- **Real-time Search**: Instant product filtering as you type
- **Multi-field Search**: Search by product name, brand, and category
- **Price Range Filter**: Interactive slider for price-based filtering
- **URL Synchronization**: Shareable search results with URL parameters
- **Smart Suggestions**: Product recommendations based on user behavior

### 🛒 **Shopping Experience**
- **Product Quick View**: Modal preview without leaving the product grid
- **Floating Cart Widget**: Always-visible cart summary with quick checkout
- **Wishlist Management**: Add/remove products with personalized notes
- **Advanced Cart**: Quantity management, subtotals, and secure checkout
- **Order Tracking**: Complete order history and status updates

### 👤 **User Management**
- **Secure Authentication**: Login, signup, OTP verification, password reset
- **Profile Management**: Update email, username, and multiple addresses
- **Review System**: Write, edit, and delete product reviews with ratings
- **Personalized Experience**: User-specific recommendations and preferences

### 🎨 **Modern UI/UX**
- **Dark Theme**: Sophisticated dark mode with glassmorphism effects
- **Responsive Design**: Optimized for all devices and screen sizes
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **High Contrast**: Excellent readability with modern typography
- **Glassmorphism**: Beautiful frosted glass effects throughout the interface

### 🔧 **Admin Features**
- **Product Management**: Add, edit, delete, and soft-delete products
- **Inventory Control**: Manage stock levels and product attributes
- **Order Management**: View and update order status and details
- **User Management**: Monitor user activities and account status

### 🛡️ **Security & Performance**
- **JWT Authentication**: Secure token-based authentication
- **Email Verification**: OTP-based account verification
- **Password Reset**: Secure password recovery via email
- **CORS Protection**: Cross-origin resource sharing security
- **Health Monitoring**: Dedicated health check endpoints for uptime

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Redux Toolkit** - State management
- **Material UI** - Component library
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Nodemailer** - Email service

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Cloud database

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or later)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/omk18p/e-commerce.git
   cd e-commerce
```

2. **Install dependencies**
```bash
   # Install backend dependencies
   cd backend
npm install
   
   # Install frontend dependencies
   cd ../frontend
npm install
```

3. **Environment Setup**

   **Backend (.env)**
   ```env
   MONGO_URI="mongodb://localhost:27017/novamart"
ORIGIN="http://localhost:3000"
EMAIL="your-email@example.com"
PASSWORD="your-email-password"
   LOGIN_TOKEN_EXPIRATION="30d"
   OTP_EXPIRATION_TIME="120000"
   PASSWORD_RESET_TOKEN_EXPIRATION="2m"
   COOKIE_EXPIRATION_DAYS="30"
SECRET_KEY="your-secret-key"
   PRODUCTION="false"
```

   **Frontend (.env)**
   ```env
REACT_APP_BASE_URL="http://localhost:8000" 
```

4. **Seed the database**
```bash
   cd backend
   npm run seed
   ```

5. **Start development servers**
   ```bash
   # Start backend (Terminal 1)
   cd backend
   npm run dev
   
   # Start frontend (Terminal 2)
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
- Backend: http://localhost:8000

### Demo Account
- **Email**: demo@gmail.com
- **Password**: helloWorld@123

## 📱 Features Showcase

### 🔍 **Advanced Search**
- Real-time product filtering
- Multi-criteria search (name, brand, category)
- Price range slider
- URL-synchronized search results

### 🛍️ **Shopping Features**
- Product quick view modal
- Floating cart summary widget
- Wishlist with notes
- Advanced cart management
- Secure checkout process

### 🎨 **Modern Design**
- Dark theme with glassmorphism
- Responsive layout
- Smooth animations
- High contrast typography
- Professional branding

### 🔧 **Admin Panel**
- Product management dashboard
- Order tracking system
- User management tools
- Inventory control

## 🌟 Key Highlights

- **Real-time Search**: Instant product filtering without page reloads
- **Modern UI**: Sophisticated dark theme with glassmorphism effects
- **Mobile Responsive**: Optimized for all devices
- **Secure Authentication**: JWT-based security with email verification
- **Scalable Architecture**: Built for growth and performance
- **Production Ready**: Deployed on Vercel and Render with health monitoring

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Omkar Patil**
- GitHub: [@omk18p](https://github.com/omk18p)
- Live Demo: [NovaMart](https://e-commerce-orpin-alpha.vercel.app)

## 🙏 Acknowledgments

- Material UI for the component library
- Framer Motion for animations
- Redux Toolkit for state management
- MongoDB for the database
- Vercel and Render for hosting

---

⭐ **Star this repository if you found it helpful!**
