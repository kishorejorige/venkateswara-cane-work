# Venkateswara Cane Work — Admin Setup Guide

This guide explains how to set up Supabase (Authentication, PostgreSQL Database, and Storage) for the Venkateswara Cane Work admin dashboard and public gallery.

---

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and log in or create an account.
2. Click **New Project**.
3. Enter project details:
   - **Name**: `venkateswara-cane-work`
   - **Database Password**: Choose a secure password (save it safely).
   - **Region**: Choose a region closest to your target audience (e.g. `ap-south-1` Mumbai).
4. Click **Create new project** and wait a couple of minutes for initialization.

---

## 2. Obtain Supabase API Credentials

1. In your Supabase Project Dashboard, click the gear icon (⚙️) for **Project Settings**.
2. Navigate to **API** in the sidebar.
3. Locate:
   - **Project URL** (e.g., `https://xyzcompany.supabase.co`)
   - **Project API Keys** -> `anon` / `publishable` key (e.g., `eyJhbGciOiJKV...`)

> [!WARNING]
> Never copy or expose the `service_role` secret key in your client code or repository.

---

## 3. Create Local Environment Configuration

1. In the root directory of your project, create a file named `.env.local` (this file is ignored by Git).
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-actual-publishable-key
```

---

## 4. Run Database & Storage Setup SQL

1. In your Supabase dashboard, click **SQL Editor** in the left navigation bar.
2. Click **New Query**.
3. Open `supabase/setup.sql` from your local project repository, copy all SQL statements, and paste them into the SQL Editor.
4. Click **Run** (or press Ctrl+Enter).
5. Verify that:
   - `admin_users` table is created with RLS enabled.
   - `products` table is created with RLS enabled.
   - Storage bucket `product-images` and its RLS policies are created.

---

## 5. Seed Initial Products (Optional)

1. In the Supabase **SQL Editor**, click **New Query**.
2. Copy the content of `supabase/seed.sql` and click **Run**.
3. This creates initial records for the classic cane chair and hanging cane swing.

---

## 6. Create an Admin User in Supabase Auth

1. In your Supabase dashboard, click **Authentication** -> **Users**.
2. Click **Add User** -> **Create User**.
3. Enter the shop owner's email address and a strong password.
4. Click **Create User**.
5. Once created, click on the user row or copy the **User UID** (a UUID such as `e4b3a2c1-8765-4321-abcd-1234567890ab`).

---

## 7. Authorize User in `admin_users` Table

1. Open **SQL Editor** in Supabase.
2. Run the following query replacing `<USER_UUID>` with the UUID copied in Step 6:

```sql
INSERT INTO public.admin_users (user_id)
VALUES ('<USER_UUID>');
```

Only user IDs explicitly inserted into `admin_users` are granted admin authorization to upload images and edit products.

---

## 8. Run App Locally & Test Admin Functionality

1. Start the Vite development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to the admin URL:
   `http://localhost:5173/venkateswara-cane-work/#/admin`

3. **Test Admin Login**:
   - Log in using the email and password created in Step 6.
   - Verify that you are redirected to the **Admin Dashboard**.

4. **Test Authorization Block**:
   - Try creating a second user in Supabase Auth without adding them to `admin_users`.
   - Log in with that account and verify that access is blocked with "Access Denied".

5. **Test Product Management**:
   - Click **+ Add Product**.
   - Fill out English Name, Telugu Name, English Description, Telugu Description, and select a JPEG, PNG, or WebP image (< 5 MB).
   - Click **Save Product**.
   - Verify that the new product appears in the list.
   - Click **Show / Hide** toggle to verify product visibility state updates.
   - Click **View Website** to view the public gallery and verify that visible products display accurately in both English and Telugu.

---

## GitHub Pages Deployment Note

The site uses static hash routing (`#/admin`). When deployed to GitHub Pages (at `https://<username>.github.io/venkateswara-cane-work/#/admin`), the admin URL works directly without requiring server-side routing redirects or configuration.
