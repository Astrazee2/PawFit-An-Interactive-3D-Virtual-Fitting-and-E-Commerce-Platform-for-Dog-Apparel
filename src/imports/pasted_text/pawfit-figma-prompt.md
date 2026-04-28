Here's your full Figma Make prompt — copy-paste ready:

---

**PROMPT:**

> Design a complete, high-fidelity UI/UX prototype for **PawFit** — an interactive 3D virtual fitting and e-commerce web platform for dog apparel. This is an undergraduate IT thesis project from Mapúa University. The design must follow HCI principles (real-time visual feedback, affordance-based interface, user-controlled interaction) and implement the three VFR design dimensions: **visual vividness, interactive control, and personalized provision.**
>
> ---
>
> **BRAND & AESTHETIC**
> - Name: PawFit
> - Tone: Clean, modern, friendly, and tech-forward. Think pet-tech startup — not cutesy, not corporate.
> - Color palette: Suggest a warm neutral base (whites/creams) with one strong brand accent color (e.g. deep teal, warm coral, or forest green). Use it consistently.
> - Typography: Modern sans-serif. Clear hierarchy between headings, labels, and body text.
> - Design for both **desktop (1440px)** and **mobile (375px)** viewports.
>
> ---
>
> **USER TYPES & ACCESS LEVELS**
> Design screens for all three user types:
> 1. **Guest User** — limited access, no login required
> 2. **Registered User** — full access after login
> 3. **Admin/Seller** — separate dashboard interface
>
> ---
>
> **SCREENS TO DESIGN**
>
> **🔓 GUEST & SHARED SCREENS**
>
> 1. **Home / Landing Page**
>    - Hero section with PawFit tagline and CTA ("Try It On Your Dog", "Shop Now")
>    - Brief feature highlights: 3D Virtual Fitting, Breed-Specific Sizing, Easy Checkout
>    - Featured products section
>    - How It Works section (3-step visual: Select Breed → Enter Measurements → Try On & Shop)
>    - Navigation bar with: Logo, Home, Products, Try On (3D Fitting), Login/Sign Up
>
> 2. **Product Catalog Page**
>    - Grid layout of product cards (image, name, price, size availability, breed compatibility tag)
>    - Filter sidebar or top filter bar: filter by **Apparel Type** (Shirts, Coats, Sweaters, Hoodies), **Breed** (Labrador Retriever, Shih Tzu, Dachshund, Pomeranian, Aspin/Mixed), **Size** (XS, S, M, L, XL)
>    - Search bar
>    - Sort options (price, newest, etc.)
>
> 3. **Product Detail Page**
>    - Product images (multi-angle)
>    - Product name, description, price
>    - Size selector (XS to XL) with size chart button
>    - Breed compatibility indicator
>    - **"Try On in 3D" CTA button** — prominent, leads to 3D fitting module
>    - Add to Cart button
>    - Product details section (apparel type, material, fit notes)
>
> 4. **3D Virtual Fitting Module Page** ← MOST IMPORTANT SCREEN
>    - Left/center panel: **3D viewer area** — large canvas showing a 3D dog avatar wearing the selected apparel. Include UI controls for:
>      - 360° rotation (orbit)
>      - Zoom in/out
>      - Multi-angle view buttons (Front, Side, Back, Top)
>    - Right panel: **Fitting Configuration**
>      - Step 1 — **Select Breed**: dropdown or card selector with breed icons for: Labrador Retriever, Shih Tzu, Dachshund, Pomeranian, Aspin/Mixed Breed
>      - Step 2 — **Enter Measurements**: three input fields with labels and helper icons:
>        - Back Length (cm) — base of neck to base of tail
>        - Neck Girth (cm) — circumference around base of neck
>        - Chest Girth (cm) — circumference around widest part of chest
>      - Step 3 — **Size Recommendation Result**: display a result card showing:
>        - Recommended size (XS / S / M / L / XL)
>        - Confidence indicator badge — three states with distinct colors:
>          - ✅ **Good Fit** (green) — measurements fall within center range
>          - ⚠️ **Check Fit** (yellow/amber) — within 5% of a size boundary
>          - 📏 **Custom Fit Recommended** (red/orange) — exceeds max range for breed
>      - "Add to Cart" button below result
>      - Note: Guest users can still access this module — no login required
>
> 5. **Login Page**
>    - Email and password fields
>    - Login CTA, link to Register
>    - "Continue as Guest" option
>
> 6. **Registration / Sign Up Page**
>    - Full name, email, password, confirm password
>    - Submit CTA
>
> ---
>
> **🔐 REGISTERED USER SCREENS**
>
> 7. **Pet Profile Management Page**
>    - List of saved pet profiles (pet name, breed, avatar thumbnail)
>    - "Add New Pet" button
>    - **Add/Edit Pet Profile Form:**
>      - Pet name input
>      - Breed selector (dropdown): Labrador Retriever, Shih Tzu, Dachshund, Pomeranian, Aspin/Mixed Breed
>      - Measurement inputs: Back Length (cm), Neck Girth (cm), Chest Girth (cm)
>      - 3D avatar preview thumbnail (breed-specific silhouette) that updates on breed selection
>      - Save Profile button
>
> 8. **Shopping Cart Page**
>    - List of cart items: product image, name, size, breed compatibility, quantity selector, remove button
>    - Order summary sidebar: subtotal, estimated total
>    - Proceed to Checkout CTA
>    - Empty cart state design
>
> 9. **Checkout Page**
>    - Shipping information form: name, address, contact number
>    - Order summary (items, sizes, total)
>    - Payment method selector (placeholder/simulated — e.g. COD, GCash, Card)
>    - Place Order CTA
>    - Note: This is checkout simulation — no real payment processing
>
> 10. **Order Confirmation Page**
>     - Success state: confirmation message, order number
>     - Order summary recap
>     - "View Order History" and "Continue Shopping" buttons
>
> 11. **Order History Page**
>     - List of past orders: order number, date, items, status, total
>     - Order status tags (e.g. Processing, Shipped, Delivered)
>     - View details per order
>
> 12. **Account Settings Page**
>     - Edit personal info (name, email, password)
>     - Linked pet profiles summary with edit shortcut
>     - Logout button
>
> ---
>
> **🛠️ ADMIN/SELLER SCREENS**
>
> 13. **Admin Dashboard**
>     - Summary cards: Total Products, Total Orders, Pending Orders, Registered Users
>     - Recent orders table
>     - Quick links to Product Management, Order Management, 3D Asset Management
>     - Sidebar navigation
>
> 14. **Product Management Page**
>     - Table of all products: name, apparel type, breed compatibility, sizes available, price, status
>     - Add New Product button
>     - **Add/Edit Product Form:**
>       - Product name, description, price
>       - Apparel type selector (Shirt, Coat, Sweater, Hoodie)
>       - Breed compatibility checkboxes (Labrador, Shih Tzu, Dachshund, Pomeranian, Aspin)
>       - Size availability checkboxes (XS, S, M, L, XL)
>       - Image upload
>       - Link to 3D GLB asset
>       - Save / Publish button
>
> 15. **Order Management Page**
>     - Orders table: order ID, customer name, items, total, date, status
>     - Status update dropdown per order (Processing → Shipped → Delivered)
>     - Filter by status
>
> 16. **3D Asset Management Page**
>     - List of uploaded GLB/glTF 3D assets: breed avatar models and apparel assets
>     - Asset name, type (avatar or apparel), associated breed, file size, upload date
>     - Upload New Asset button
>     - Preview thumbnail per asset
>
> ---
>
> **UX FLOWS TO MAKE CLEAR IN THE DESIGN**
> - Guest → browses catalog → opens product → clicks "Try On in 3D" → selects breed, enters measurements → gets size recommendation → prompted to log in to add to cart
> - Registered User → logs in → goes to pet profile → saved measurements auto-fill the fitting module → tries on → adds to cart → checks out
> - New User → registers → lands on home → guided to create pet profile → starts shopping
> - Admin → logs into separate admin view → manages products, orders, and 3D assets
>
> ---
>
> **COMPONENT NOTES**
> - Navigation bar: persistent across all pages, shows login/profile state
> - Responsive mobile nav: hamburger menu
> - Consistent product card component used across catalog and related sections
> - Empty states for: cart, order history, no pet profiles yet, no products found
> - Loading state placeholder for the 3D viewer canvas
> - Breed selector should use visual breed icons/illustrations, not just a text dropdown
> - Size recommendation result card should be visually prominent with color-coded confidence badge
> - All forms should show field validation states (error, success)
>
> ---
>
> **DO NOT INCLUDE:**
> - Real payment gateway UI
> - LIDAR or camera-based measurement features
> - Photo auto-measurement
> - Accessories (collars, leashes, footwear, harnesses)
> - Breeds outside the 5 supported ones
> - Dynamic cloth physics simulation UI
> - Business analytics or profitability dashboards

---

That covers every feature, user type, page, and constraint from your thesis. Paste that into Figma Make and it should generate a pretty complete prototype. Let me know if you want me to tweak the tone, add more specifics to any screen, or write a shorter version! 🐾