# 🐾 PawFit VER1

A virtual pet apparel fitting prototype built with React, Vite, Tailwind CSS, and Three.js. The original Figma prototype is available at https://www.figma.com/design/ks5jZE8rUOhE1oIrD92EAX/PAWFIT-VER1.

## 🛠️ Prerequisites

Before running the project, make sure you have **Node.js** installed.

1. Go to https://nodejs.org
2. Download the **LTS version** (recommended)
3. Run the installer and follow the steps
4. Restart your terminal or VS Code after installing

To verify the installation, run:
```bash
node -v
npm -v
```
Both should return a version number.

## 🚀 Running the Project

**Step 1 — Install dependencies:**
```bash
npm install --legacy-peer-deps
```

**Step 2 — Install React (required separately):**
```bash
npm install react@18.3.1 react-dom@18.3.1 --legacy-peer-deps
```

**Step 3 — Start the development server:**
```bash
npm run dev
```

**Step 4 — Open your browser and go to:**
http://localhost:5173

## ⚠️ Notes

- Always use `--legacy-peer-deps` when installing packages — this project has peer dependency conflicts between React 18 and `@react-three/fiber` that require it.
- `node_modules/` is not included in this repository. You must run the install commands above before running the project.


# 🐾 PawFit Backend

REST API backend for **PawFit: An Interactive 3D Virtual Fitting and E-Commerce Platform for Dog Apparel**.

Built with Node.js, Express.js, and MongoDB Atlas.

---

## 📋 Prerequisites

Before running the backend, make sure you have the following installed:

- **Node.js** (v18 or higher) — download at https://nodejs.org
- **npm** (comes with Node.js)
- A **MongoDB Atlas** account — sign up at https://mongodb.com/atlas

To verify your installations, run:
```bash
node -v
npm -v
```

---

## ⚙️ Setup Instructions

### Step 1 — Clone the repository
```bash
git clone https://github.com/Astrazee2/PawFit-An-Interactive-3D-Virtual-Fitting-and-E-Commerce-Platform-for-Dog-Apparel.git
cd PawFit-An-Interactive-3D-Virtual-Fitting-and-E-Commerce-Platform-for-Dog-Apparel
git checkout Backend
```

### Step 2 — Navigate to the backend folder
```bash
cd PAWFIT-Backend
```

### Step 3 — Install dependencies
```bash
npm install
```

### Step 4 — Set up MongoDB Atlas
1. Go to https://mongodb.com/atlas and create a free account
2. Create a new cluster (M0 Free Tier)
3. Select **Singapore** as the region (closest to Philippines)
4. Create a database user with a username and password
5. Under **Network Access**, click **"Add IP Address"** → **"Allow Access from Anywhere"** (0.0.0.0/0)
6. Click **"Connect"** → **"Drivers"** → copy the connection string

### Step 5 — Create the `.env` file
Create a `.env` file in the root of the `PAWFIT-Backend` folder:

MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/pawfit?retryWrites=true&w=majority&family=4
JWT_SECRET=pawfit_super_secret_key_2026
PORT=5000

Replace `<username>`, `<password>`, and `<cluster>` with your actual MongoDB Atlas credentials.

> ⚠️ **Important:** Never share or push your `.env` file to GitHub. It contains sensitive credentials.

### Step 6 — Run the backend
```bash
npm run dev
```

You should see:

✅ Connected to MongoDB Atlas
🚀 Server running on port 5000

---

## 📁 Project Structure
```
PAWFIT-Backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js      # Register and login logic
│   │   ├── petController.js       # Pet profile CRUD
│   │   ├── productController.js   # Product catalog CRUD
│   │   ├── cartController.js      # Cart management
│   │   └── orderController.js     # Order processing
│   ├── middleware/
│   │   └── auth.js                # JWT authentication middleware
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Pet.js                 # Pet profile schema
│   │   ├── Product.js             # Product schema
│   │   ├── Cart.js                # Cart schema
│   │   └── Order.js               # Order schema
│   ├── routes/
│   │   ├── auth.js                # Auth routes
│   │   ├── pets.js                # Pet routes
│   │   ├── products.js            # Product routes
│   │   ├── cart.js                # Cart routes
│   │   └── orders.js              # Order routes
│   └── server.js                  # Main server entry point
├── .env                           # Environment variables (not in GitHub)
├── .gitignore
└── package.json
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login and get JWT token | ❌ |

### Pets
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/pets` | Get all pets of logged in user | ✅ |
| POST | `/api/pets` | Create a new pet profile | ✅ |
| PUT | `/api/pets/:id` | Update a pet profile | ✅ |
| DELETE | `/api/pets/:id` | Delete a pet profile | ✅ |

### Products
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/products` | Get all products | ❌ |
| GET | `/api/products/:id` | Get a single product | ❌ |
| POST | `/api/products` | Create a product | ✅ |
| PUT | `/api/products/:id` | Update a product | ✅ |
| DELETE | `/api/products/:id` | Delete a product | ✅ |

### Cart
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/cart` | Get user's cart | ✅ |
| POST | `/api/cart` | Add item to cart | ✅ |
| DELETE | `/api/cart/:itemId` | Remove item from cart | ✅ |
| DELETE | `/api/cart/clear` | Clear entire cart | ✅ |

### Orders
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/orders` | Create an order | ✅ |
| GET | `/api/orders` | Get user's orders | ✅ |
| GET | `/api/orders/:id` | Get a single order | ✅ |
| PUT | `/api/orders/:id/status` | Update order status (admin) | ✅ |

---

## 🔐 Authentication

Protected routes require a **JWT token** in the request header:
Authorization: Bearer <your_token_here>

You get the token when you register or login. It expires after **7 days**.

---

## 🧪 Testing with Postman

### Register a user
- Method: `POST`
- URL: `http://localhost:5000/api/auth/register`
- Body (JSON):
```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "password": "password123"
}
```

### Login
- Method: `POST`
- URL: `http://localhost:5000/api/auth/login`
- Body (JSON):
```json
{
  "email": "you@example.com",
  "password": "password123"
}
```

### Create Admin Account
1. Register normally via Postman
2. Go to MongoDB Atlas → Browse Collections → users
3. Find your user document and change `"role": "user"` to `"role": "admin"`

---

## ⚠️ Common Issues

| Issue | Fix |
|---|---|
| `querySrv ECONNREFUSED` | Add `&family=4` at the end of your MONGO_URI in `.env` |
| `bad auth: authentication failed` | Wrong password in MONGO_URI — reset it in Atlas Database Access |
| `Cannot use import statement` | Make sure `"type": "module"` is in `package.json` |
| `MONGO_URI is undefined` | Make sure `.env` is in the root of `PAWFIT-Backend/`, not inside `src/` |
| Port already in use | Change `PORT=5000` to `PORT=5001` in `.env` |

---

## 📌 Notes

- This backend is part of the PawFit thesis project
- The frontend runs on port `5173` (Vite)
- The backend runs on port `5000` (Express)
- Both must be running at the same time for the full system to work
