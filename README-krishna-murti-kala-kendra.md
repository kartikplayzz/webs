# Krishna Murti Kala Kendra Website

Modern React + Tailwind frontend and Node.js + Express + Firebase backend for the Krishna Murti Kala Kendra catalog.

## Local Setup

1. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   copy .env.example .env
   npm run dev
   ```

3. Add Firebase Admin credentials in `backend/.env`.

## Firebase Collections

`products`

```json
{
  "name": "Ganpati Murti",
  "price": "Rs. 5,000",
  "category": "Clay Model",
  "image": "image-url",
  "description": "Handmade premium clay murti",
  "featured": true
}
```

`inquiries`

```json
{
  "name": "Customer Name",
  "phone": "+91 ...",
  "email": "customer@example.com",
  "service": "Custom Orders",
  "message": "Inquiry text",
  "status": "new"
}
```

## Admin

Open `/admin`, then log in with `ADMIN_PASSWORD` from the backend `.env` file.

The backend stores product images in Firebase Storage and stores products/inquiries in Firestore.
