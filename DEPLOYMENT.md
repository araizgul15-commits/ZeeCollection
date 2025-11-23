# Deployment Guide

## Steps to Deploy on Vercel

1. Go to your Vercel dashboard.
2. Create a new project and link it to your GitHub repository.
3. Set the environment variables:
   - `ADMIN_SECRET`
   - `SENDGRID_API_KEY` (required)
   - `ADMIN_NOTIFICATION_EMAIL` (optional)
4. Deploy your app.
5. Run migration:
   ```bash
   npx prisma migrate deploy
   ```  
   (or `npx prisma migrate dev` for development)
6. Verify that the admin login and order email notifications are functioning correctly.

## Important Notes
- Ensure that you always keep your secrets secure and not hardcoded into your application.

This guide provides step-by-step instructions on how to deploy your application using Vercel.