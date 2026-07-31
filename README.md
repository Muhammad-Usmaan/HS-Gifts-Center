# Gifted Memories

Build a complete, production-ready e-commerce website for a local gift busineft, it’s a memory”

The website should take inspiration from the overall shopping experience, content hierarchy, and functionality of:

https://www.fansygifts.com/

Do not copy the reference website’s logo, written content, photographs, branding, or exact visual design. Create an original HS Gift Shop identity while following a similar gift-store structure, including promotional banners, occasion-based categories, featured products, product detail pages, cart, ordering, customer reviews, contact options, and WhatsApp integration.

## 1. Recommended Technology

Build the application using:

* Next.js with TypeScript

* Tailwind CSS

* Supabase for:

  * PostgreSQL database

  * Admin authentication

  * Product image storage

  * Realtime order notifications

* Vercel-compatible deployment

* React Hook Form and Zod for forms and validation

* Lucide React or another clean icon library

* Next.js Image component for image optimization

The website must be fully functional. Do not create only a frontend mockup.

## 2. Brand Identity

Use the following branding:

* Brand name: HS Gift Shop

* Tagline: Not just a gift, it’s a memory

* Currency: Pakistani Rupees

* Currency display format: Rs. 2,500

* WhatsApp number: +92 342 7010206

* WhatsApp international format: 923427010206

* WhatsApp link format: https://wa.me/923427010206

Create a simple text-based temporary logo for HS Gift Shop that can later be replaced with a real logo through the admin panel or site settings.

## 3. Visual Direction

Create an elegant, warm, memorable, and premium gift-shop design.

Suggested visual direction:

* Warm cream or soft beige main background

* Deep maroon, burgundy, rose, or dark brown as the primary brand color

* Muted gold as an accent

* Dark charcoal text

* White product cards

* Rounded cards and buttons

* Soft shadows

* Clean typography

* Subtle decorative gift, ribbon, heart, flower, or sparkle elements

* Smooth hover effects and restrained animations

The design should feel appropriate for:

* Birthday gifts

* Anniversary gifts

* Wedding and Nikkah gifts

* Gifts for men

* Gifts for women

* Customized gifts

* Gift hampers

* Flowers and chocolates

* Surprise gifts

The interface must not feel crowded or overly colourful.

## 4. Responsive Design

The website must work properly on:

* Mobile phones

* Tablets

* Laptops

* Desktop screens

Mobile responsiveness is especially important because most customers may access the website through social media or WhatsApp.

On mobile:

* Use a compact sticky header

* Show a hamburger navigation menu

* Keep the cart button visible

* Keep a floating WhatsApp button visible

* Display product grids in one or two columns

* Make checkout fields easy to complete

* Use sufficiently large tap targets

## 5. Website Header

Create a responsive header containing:

* HS Gift Shop logo

* Home

* Shop

* Categories

* Customized Gifts

* About Us

* Contact

* Search icon

* Shopping cart icon with item count

Include a top announcement bar such as:

“Beautiful gifts for every special occasion”

The announcement text should be editable from the admin settings.

The header should become sticky when the customer scrolls.

## 6. Homepage Structure

Build the homepage in the following order.

### A. Announcement Bar

Display a short promotional message.

Dummy message:

“Make every occasion unforgettable with HS Gift Shop”

### B. Hero Banner

Create a large premium hero banner containing:

**Heading:**

Gifts Made to Be Remembered

**Supporting text:**

Thoughtfully selected gifts, customized hampers, and beautiful surprises for every special moment.

**Primary button:**

Shop Gifts

**Secondary button:**

Order on WhatsApp

The WhatsApp button must open:

https://wa.me/923427010206

Use a suitable royalty-free or placeholder gift image. Keep the image easy to replace later.

The admin should eventually be able to update the hero title, text, image, and buttons from site settings.

### C. Shop by Occasion

Display visual category cards for:

* Birthday Gifts

* Anniversary Gifts

* Wedding & Nikkah Gifts

* Gifts for Her

* Gifts for Him

* Customized Gifts

Each category card should contain:

* Category image

* Category name

* Short description

* View Collection button

Categories must be loaded dynamically from the database.

### D. Featured Products

Display products marked as featured by the admin.

Each product card should show:

* Product image

* Product name

* Current price

* Original price when the product is on sale

* Sale percentage badge

* Category

* View Product button

* Add to Cart button

* WhatsApp icon button

The WhatsApp product button should open a pre-filled message such as:

“Hello HS Gift Shop, I am interested in [Product Name]. Please share more details.”

### E. Promotional Banner

Create a promotional section with content such as:

**Heading:**

Turn Your Ideas into a Personalized Gift

**Text:**

Send us your photos, names, messages, and gift ideas. We will help you create something special.

**Button:**

Discuss on WhatsApp

### F. Trending Gifts

Display products marked as trending.

Use a responsive grid or horizontal slider.

### G. Why Choose HS Gift Shop

Create four trust points:

* Carefully Selected Gifts

* Customization Available

* Secure Order Processing

* Friendly WhatsApp Support

Do not make unverified claims such as free delivery, nationwide delivery, same-day delivery, or damage replacement unless these are later added by the owner.

### H. How Ordering Works

Show a simple three-step section:

1. Choose Your Gift

2. Add Details and Place Your Order

3. Receive Order Confirmation

### I. Customer Reviews

Display dummy reviews in a slider or card grid.

Use clearly fictional seed names and generic review content. The admin should later be able to add, edit, publish, unpublish, and remove reviews.

Example dummy reviews:

* “The gift was beautifully prepared and looked even better than expected.”

* “Ordering was simple, and the customization made the gift feel very personal.”

* “A lovely experience from selecting the gift to receiving the final order.”

### J. Instagram or Social Section

Create a section titled:

“Stay Connected with HS Gift Shop”

Show Instagram, TikTok, and Facebook cards with placeholder images and social icons.

### K. Footer

Include:

* HS Gift Shop logo

* Tagline

* Short business description

* Quick links

* Product categories

* Contact information

* WhatsApp number

* Social media icons

* Privacy Policy

* Terms and Conditions

* Delivery Information

* Return and Exchange Policy

* Copyright text

Footer text:

“© HS Gift Shop. All rights reserved.”

## 7. Social Media Links

Add Instagram, Facebook, and TikTok icons in:

* Header or mobile menu

* Homepage social section

* Footer

* Contact page

Use temporary placeholder URLs stored in the database or site settings:

* Instagram: https://www.instagram.com/

* Facebook: https://www.facebook.com/

* TikTok: https://www.tiktok.com/

Do not hardcode these links throughout multiple components. Store them in one central settings location so the owner can replace them later.

Open social links in a new tab.

## 8. Floating WhatsApp Button

Add a floating WhatsApp button on every public page.

Requirements:

* Fixed at the bottom-right corner

* Visible on desktop and mobile

* Use the official WhatsApp-style icon

* Include a small tooltip such as “Chat with us”

* Open in a new tab

* Use the number 923427010206

Default message:

“Hello HS Gift Shop, I would like to know more about your gifts.”

For a product page, dynamically include the product name and page URL in the message.

## 9. Shop Page

Create a complete shop page containing:

* Page title

* Product count

* Search

* Category filter

* Price range filter

* Availability filter

* Featured filter

* Sort by newest

* Sort by price, low to high

* Sort by price, high to low

* Sort alphabetically

* Clear filters button

* Responsive product grid

* Pagination or load-more functionality

Only active and published products should appear publicly.

## 10. Category Pages

Create dynamic category pages using clean slugs.

Example URLs:

* /category/birthday-gifts

* /category/anniversary-gifts

* /category/wedding-nikkah-gifts

* /category/gifts-for-her

* /category/gifts-for-him

* /category/customized-gifts

Each category page should include:

* Category name

* Description

* Category banner image

* Product count

* Products belonging to that category

* Search, sorting, and relevant filtering

When an admin creates a new category, its public category page should be generated automatically.

## 11. Product Detail Page

Each product page should contain:

* Product image gallery

* Main image with thumbnails

* Product name

* Product category

* Current price

* Compare-at or original price

* Sale percentage

* Short description

* Full description

* Product features

* Availability status

* Quantity selector

* Add to Cart button

* Buy Now button

* Order on WhatsApp button

* Customization availability

* Personalization instructions

* Related products

* Sharing buttons

* Delivery information placeholder

* Return policy summary

For customizable products, provide optional customer fields such as:

* Custom name

* Custom message

* Preferred colour

* Special instructions

* Photo upload requirement notice

The initial version does not need customer photo uploading during checkout unless implemented securely. Customers may be instructed to send customization photos through WhatsApp after placing the order.

WhatsApp message example:

“Hello HS Gift Shop, I am interested in [Product Name]. Product link: [URL]. I would like to discuss customization.”

## 12. Shopping Cart

Create a functional cart with:

* Product image

* Product name

* Selected customization details

* Unit price

* Quantity controls

* Remove item button

* Subtotal

* Delivery fee placeholder

* Total

* Continue Shopping button

* Proceed to Checkout button

Persist the cart using local storage so it is not lost when the customer refreshes the page.

Prevent customers from adding inactive or unavailable products.

## 13. Checkout and Ordering

Create a checkout form with these fields:

* Customer full name

* Phone number

* WhatsApp number

* Email address, optional

* City

* Complete delivery address

* Nearby landmark, optional

* Order notes, optional

* Gift recipient name, optional

* Preferred delivery date, optional

* Special customization instructions, optional

* Payment method

Initially provide:

* Cash on Delivery

* Payment Arrangement Through WhatsApp

Do not add a real payment gateway yet.

Before submission, show:

* Products

* Quantities

* Product totals

* Delivery fee

* Grand total

* Customer information

When the customer submits the order:

1. Validate all required information.

2. Confirm that the cart is not empty.

3. Create the order in Supabase.

4. Create individual order-item records.

5. Generate a readable order number, for example:

   * HSG-1001

   * HSG-1002

6. Set the initial order status to “New”.

7. Set the payment status to “Pending”.

8. Clear the customer’s cart only after successful order creation.

9. Show a confirmation page.

10. Display the order number.

11. Give the customer a button to send the order details through WhatsApp.

12. Trigger the realtime notification in the admin dashboard.

The WhatsApp order summary should include:

* Order number

* Customer name

* Product names

* Quantities

* Total

* City

* Customization notes

## 14. Order Confirmation Page

Create a page such as:

/order-confirmation/[order-number]

Display:

* Thank-you message

* Order number

* Order summary

* Customer contact details

* Current order status

* WhatsApp confirmation button

* Continue Shopping button

Do not expose private order information merely by guessing an order number. Use a secure confirmation token, authenticated lookup, or another safe implementation.

## 15. Admin Authentication

Create a protected admin panel at:

/admin

Requirements:

* Email and password login

* Supabase authentication

* No public admin registration page

* Protected admin routes

* Secure logout

* Session handling

* Redirect unauthenticated users to /admin/login

* Do not hardcode admin credentials into the frontend

* Create the first admin account securely through Supabase or a setup process

## 16. Admin Dashboard

The dashboard should show:

* Total products

* Total categories

* Total orders

* New orders

* Processing orders

* Completed orders

* Cancelled orders

* Total order value

* Recent orders

* Low-stock or unavailable products

* Quick Add Product button

* Quick Add Category button

Use clean cards and simple charts where useful.

## 17. Admin Product Management

The admin must be able to:

* Add a product

* Edit a product

* Delete a product

* Publish or unpublish a product

* Mark a product active or inactive

* Mark a product featured

* Mark a product trending

* Assign a category

* Add multiple images

* Replace product images

* Remove product images

* Set the product name

* Generate or edit the slug

* Add a short description

* Add a full description

* Add product features

* Set the regular price

* Set a compare-at price

* Automatically calculate the sale percentage

* Set stock quantity

* Set stock status

* Enable or disable customization

* Add personalization instructions

* Control display order

Validate prices so that they cannot be negative.

Store uploaded images in Supabase Storage.

Provide an image preview before saving.

## 18. Admin Category Management

The admin must be able to:

* Add a new category

* Edit a category

* Delete a category

* Activate or deactivate a category

* Set category name

* Generate or edit category slug

* Add category description

* Upload category image

* Add an optional banner image

* Set category display order

* Feature a category on the homepage

Before deleting a category that contains products:

* Warn the admin

* Require products to be reassigned, or

* Allow moving them to an “Uncategorized” category

New categories must automatically become available in product forms and public category pages.

## 19. Admin Order Management

Create an order management screen containing:

* Order number

* Order date

* Customer name

* Phone number

* City

* Total

* Payment method

* Payment status

* Order status

* Read or unread state

Allow the admin to:

* Open full order details

* Search by order number

* Search by customer name

* Search by phone number

* Filter by date

* Filter by city

* Filter by order status

* Filter by payment status

* Mark an order as read

* Add internal admin notes

* Update order status

* Update payment status

* Contact the customer through WhatsApp

* Print an order

* Export orders to CSV

* Cancel an order

* Delete an order only after a clear confirmation

Order statuses:

* New

* Confirmed

* Processing

* Ready

* Dispatched

* Delivered

* Cancelled

Payment statuses:

* Pending

* Paid

* Partially Paid

* Failed

* Refunded

## 20. New Order Notification Sound

Implement realtime order notifications using Supabase Realtime.

When a new order is inserted:

* The admin dashboard should receive it without refreshing.

* Play a short, pleasant notification chime.

* Show a toast notification.

* Display the order number and customer name.

* Increase the unread-order badge.

* Add the new order to the top of the recent-orders list.

* Update dashboard statistics.

Add a visible control:

“Enable Order Sounds”

Because browsers may block automatic audio before interaction, request the admin to enable order sounds after logging in or clicking the enable button.

Store the sound preference locally.

Provide:

* Sound on/off control

* Test notification sound button

* Visual notification even when sound is disabled

Play the sound only once for each new order. Prevent duplicate sounds when the realtime connection reconnects.

The notification should work while the admin dashboard is open in a browser tab.

Also use the browser document title to indicate unread orders, for example:

“(3) New Orders — HS Gift Shop Admin”

## 21. Admin Review Management

Allow the admin to:

* Add reviews

* Edit reviews

* Delete reviews

* Publish or unpublish reviews

* Set customer name

* Add customer city

* Add rating from 1 to 5

* Add review content

* Add an optional customer image

* Set review display order

## 22. Site Settings

Create an admin settings page for:

* Business name

* Tagline

* Logo

* Favicon

* WhatsApp number

* WhatsApp default message

* Instagram URL

* Facebook URL

* TikTok URL

* Business phone

* Business email

* Business address

* Announcement bar

* Hero heading

* Hero description

* Hero image

* Delivery fee

* Minimum order amount

* Currency

* Footer description

* Order notification sound preference

Store these values centrally so that components do not contain duplicated hardcoded information.

## 23. Contact Page

Create a contact page containing:

* HS Gift Shop heading

* Short friendly introduction

* WhatsApp contact card

* Instagram card

* Facebook card

* TikTok card

* Contact form

* Business address placeholder

* Business hours placeholder

* Map placeholder, optional

Contact form fields:

* Name

* Phone number

* Email, optional

* Inquiry type

* Message

Inquiry types:

* Product Question

* Custom Gift

* Existing Order

* Bulk Order

* General Inquiry

The primary contact method should be WhatsApp.

## 24. About Page

Create an original About Us page for HS Gift Shop.

Suggested content direction:

“HS Gift Shop helps people celebrate meaningful relationships through carefully selected and personalized gifts. We believe a thoughtful gift is more than an item—it becomes part of a memory.”

Include:

* Brand story

* Mission

* Personalization focus

* Customer care section

* Call-to-action to explore gifts

* WhatsApp contact button

Do not claim a specific founding date, number of customers, physical location, or delivery coverage unless supplied by the owner.

## 25. Policy Pages

Create editable pages for:

* Privacy Policy

* Terms and Conditions

* Delivery Information

* Return and Exchange Policy

* Custom Order Policy

Use reasonable placeholder content and clearly mark business-specific details that the owner needs to review before launch.

## 26. Search

Implement product search that searches:

* Product name

* Category

* Short description

* Full description

* Product tags

Display:

* Search suggestions

* Product image

* Product name

* Price

* Category

* No-results message

## 27. Dummy Categories

Seed the database with these initial categories:

1. Birthday Gifts

2. Anniversary Gifts

3. Wedding & Nikkah Gifts

4. Gifts for Her

5. Gifts for Him

6. Customized Gifts

7. Gift Hampers

8. Flowers & Chocolates

## 28. Dummy Products

Add at least 16 dummy products across the categories.

Suggested products:

1. Personalized Birthday Gift Box

2. Chocolate and Flower Hamper

3. Customized Photo Frame

4. Anniversary Memory Box

5. Wedding Couple Gift Hamper

6. Nikkah Keepsake Tray

7. Personalized Mug and Chocolate Set

8. Luxury Gift Box for Her

9. Premium Gift Set for Him

10. Teddy and Chocolate Surprise Box

11. Customized Name Frame

12. Rose and Chocolate Bouquet

13. Birthday Balloon Gift Hamper

14. Personalized Candle Set

15. Wedding Gift Basket

16. Mini Celebration Hamper

Each dummy product should include:

* Product name

* Slug

* Category

* Short description

* Full description

* Price in PKR

* Optional compare-at price

* Placeholder product image

* Featured status

* Trending status

* Stock status

* Customization status

Use royalty-free generic gift images or clearly replaceable placeholders. Do not copy product photographs from the reference website.

## 29. Suggested Dummy Prices

Use realistic temporary PKR prices such as:

* Rs. 1,500

* Rs. 2,200

* Rs. 2,800

* Rs. 3,500

* Rs. 4,200

* Rs. 5,500

* Rs. 6,800

* Rs. 8,500

These are dummy prices and must be editable from the admin panel.

## 30. Database Structure

Create a proper relational database.

### categories

* id

* name

* slug

* description

* image_url

* banner_url

* is_active

* is_featured

* sort_order

* created_at

* updated_at

### products

* id

* category_id

* name

* slug

* short_description

* full_description

* features

* price

* compare_at_price

* stock_quantity

* stock_status

* customization_available

* personalization_instructions

* is_featured

* is_trending

* is_active

* sort_order

* created_at

* updated_at

### product_images

* id

* product_id

* image_url

* alt_text

* sort_order

* created_at

### orders

* id

* order_number

* confirmation_token

* customer_name

* phone

* whatsapp_number

* email

* city

* delivery_address

* landmark

* recipient_name

* preferred_delivery_date

* customer_notes

* admin_notes

* subtotal

* delivery_fee

* total

* payment_method

* payment_status

* order_status

* is_read

* created_at

* updated_at

### order_items

* id

* order_id

* product_id

* product_name_snapshot

* product_price_snapshot

* quantity

* customization_details

* line_total

* created_at

Store product names and prices as snapshots inside order items so historical orders remain correct even when a product is later edited.

### reviews

* id

* customer_name

* customer_city

* rating

* review_text

* customer_image_url

* is_published

* sort_order

* created_at

* updated_at

### site_settings

* id

* setting_key

* setting_value

* updated_at

### admin_profiles

* id

* auth_user_id

* full_name

* role

* created_at

* updated_at

## 31. Security

Implement proper security:

* Use Supabase Row Level Security.

* Public visitors may read only active categories, active products, and published reviews.

* Public visitors must not read other customers’ orders.

* Orders should be submitted through a secure server-side route or server action.

* Only authenticated admins may access product, category, review, order, and settings management.

* Never expose the Supabase service-role key in client-side code.

* Validate and sanitize all form fields.

* Add basic rate limiting or abuse protection to order and contact forms.

* Validate uploaded image file type and size.

* Do not trust prices sent by the browser.

* Recalculate order totals on the server using database prices.

* Prevent customers from changing product prices through browser tools.

## 32. SEO

Implement:

* Unique page titles

* Meta descriptions

* Open Graph metadata

* Product image alt text

* Canonical URLs

* robots.txt

* sitemap.xml

* Clean product and category slugs

* Product structured data

* Breadcrumbs

* Organization structured data

* Local business structured data only after real business details are provided

Example homepage title:

“HS Gift Shop | Personalized Gifts and Gift Hampers”

Example homepage description:

“Discover personalized gifts, beautiful hampers, and memorable surprises for birthdays, anniversaries, weddings, and special occasions.”

## 33. Accessibility

Ensure:

* Proper heading hierarchy

* Keyboard-accessible navigation

* Visible focus states

* Form labels

* Error messages

* Alternative text for images

* Good text contrast

* Accessible modal behaviour

* Accessible buttons instead of clickable div elements

* Reduced-motion support where appropriate

## 34. Performance

Optimize:

* Product images

* Lazy loading

* Component loading

* Database queries

* Fonts

* Client-side JavaScript

* Caching where appropriate

Avoid loading full-resolution images in product-card grids.

## 35. Loading and Error States

Add polished states for:

* Page loading

* Product loading

* Empty categories

* Empty cart

* No search results

* Failed image upload

* Failed order submission

* Realtime connection failure

* Admin authentication failure

* Database errors

* Offline network state

Use skeleton loaders where suitable.

## 36. User Experience Details

Add:

* Toast confirmations

* Delete confirmations

* Form validation messages

* Cart success animation

* Scroll-to-top button

* Breadcrumb navigation

* Mobile-friendly filters

* Empty-state illustrations

* Unsaved-changes warning in admin forms

* Confirmation before leaving a product form with unsaved changes

Do not use excessive popups.

## 37. Required Routes

Create at least these routes:

### Public

* /

* /shop

* /category/[slug]

* /product/[slug]

* /cart

* /checkout

* /order-confirmation/[token]

* /about

* /contact

* /privacy-policy

* /terms-and-conditions

* /delivery-information

* /return-exchange-policy

* /custom-order-policy

### Admin

* /admin/login

* /admin

* /admin/products

* /admin/products/new

* /admin/products/[id]/edit

* /admin/categories

* /admin/categories/new

* /admin/categories/[id]/edit

* /admin/orders

* /admin/orders/[id]

* /admin/reviews

* /admin/settings

## 38. Environment Variables

Create an `.env.example` file containing names only, not real secrets.

Include variables such as:

* NEXT_PUBLIC_SUPABASE_URL

* NEXT_PUBLIC_SUPABASE_ANON_KEY

* SUPABASE_SERVICE_ROLE_KEY

* NEXT_PUBLIC_SITE_URL

* NEXT_PUBLIC_WHATSAPP_NUMBER

Use server-only variables correctly.

## 39. Development Deliverables

Provide:

* Complete working source code

* Supabase SQL migration files

* Row Level Security policies

* Database seed script

* Dummy categories and products

* Image storage bucket configuration

* Realtime order subscription

* Admin authentication

* `.env.example`

* README with setup instructions

* Local development commands

* Supabase setup steps

* Initial admin creation steps

* Vercel deployment instructions

## 40. Acceptance Criteria

The website is complete only when all of the following work:

1. Customers can browse products and categories.

2. Customers can search and filter products.

3. Customers can open a product page.

4. Customers can add products to the cart.

5. Cart quantities and totals update correctly.

6. Customers can complete the checkout form.

7. A successful checkout creates a database order.

8. Each order receives a unique HSG order number.

9. The order appears in the admin panel without refreshing.

10. A notification sound plays for a new order after sounds are enabled.

11. The unread-order badge updates.

12. The admin can open and update an order.

13. The admin can add, edit, publish, and delete products.

14. The admin can add, edit, activate, and delete categories.

15. New categories automatically appear in product forms and on the public website.

16. Product images can be uploaded and replaced.

17. The floating WhatsApp button uses +92 342 7010206.

18. Product WhatsApp messages include the selected product.

19. Instagram, Facebook, and TikTok placeholder links are editable.

20. The website is responsive on mobile and desktop.

21. Public visitors cannot access admin pages.

22. Public visitors cannot view other customers’ orders.

23. Order totals are securely calculated on the server.

24. Dummy products and categories are included.

25. No important button leads to a dead or unfinished page.

## 41. Final Build Standard

Create a polished, maintainable, and production-ready website rather than a simple demo.

Use reusable components, clean TypeScript types, organized folders, secure database access, helpful comments only where necessary, and consistent error handling.

Do not leave core features as TODO comments.

The only intentional placeholders should be:

* Real logo

* Real social media account URLs

* Final policy wording

* Final business address

* Final delivery charges

* Final product photographs and information

Everything else should be implemented and functional.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7a69215d-124c-4db6-ac04-c62162ce73df).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
