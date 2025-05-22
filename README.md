# Cascadia E-Commerce Website 🌲

Cascadia is a mock e-commerce website for outdoor gear. It allows users to browse products, register/login, add items to their cart, and check out — all with a clean, minimal design.

##  Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** SQLite (local file-based)
- **Auth:** Registration/Login with password hashing (bcrypt)

## Core Features

- Storefront displaying all products (12+)
- Search functionality by keyword or category
- Product detail pages with images and descriptions
- Shopping cart with quantity and totals
- Mock checkout with payment form (no real payment processing)
- Register/Login pages with hashed passwords
- Per-user cart using `localStorage` (e.g., `cart_user@example.com`)
- About, FAQ, and Profile pages
- Responsive, mobile-friendly layout

## Important Notes

- Cart and login state are stored in `localStorage` (no sessions).
- Cart is isolated per user using a unique localStorage key.
- Checkout is simulated only (no payment gateway integration).

## How To Run Locally

1. Clone this repo  
   ```bash
   git clone https://github.com/jacobRobles/termProject.git
   cd termProject
2. Install Dependencies
   ```bash
   npm install
3. Start the server
   ```bash
   node app.js
4. Open browser and go to
   http://localhost:3000
## Team Members and Responsibilities

- **Jacob Robles** – helped in development of core backend routes (authentication, product API), implemented HTML pages, integrated frontend logic (cart, search, user flow), and ensured smooth UI.

- **Antony Biju** – helped in backend development (Express routes, database queries, and API structure), contributed to user authentication logic, and supported data handling across the app.

- **Rachapoom Phanchotong (Mark)** – helped in CSS and frontend styling; created clean, responsive layouts across pages, styled components for consistency, and ensured mobile-friendliness and modern aesthetics throughout the site.


add link to glitch here soon



