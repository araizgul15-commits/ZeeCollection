# Zee Collection - COD Clothing Store (Starter)

This is a minimal Next.js + Prisma (SQLite) starter for a clothing store that ships personally and accepts Cash on Delivery (COD).

Getting started (local)
1. Install:
   - npm install
2. Create a .env.local file with (copy from .env.example):
   - DATABASE_URL="file:./dev.db"
   - ADMIN_SECRET="(pick-a-strong-secret)"
   - NEXT_PUBLIC_APP_URL="http://localhost:3000"
3. Initialize database:
   - npx prisma migrate dev --name init
4. Run dev:
   - npm run dev
5. Open http://localhost:3000

Workflow
- Public: / lists products; /checkout lets customers place COD orders.
- Admin: /admin/login to enter admin secret, then /admin to add products and see product list.
- Orders are saved in the SQLite database and flagged as pending_cod. You will fulfill orders manually.

Notes
- This scaffold uses a simple admin secret header (x-admin-secret). For production, replace with a proper auth solution (NextAuth, passwordless, or OAuth).
- Replace priceCents with your currency appropriate units. Currently shown as PKR in frontend text.
- Configure emails and notifications as needed.

Deployment & temporary URL
- Connect the repository to Vercel and deploy the ZeeCollection branch.
- Vercel will provide a preview URL for the branch (temporary free URL) such as:
  https://zeecollection-git-zeecollection-<hash>.vercel.app
- In Vercel project settings add environment variables: DATABASE_URL, ADMIN_SECRET (replace placeholder), NEXT_PUBLIC_APP_URL.
