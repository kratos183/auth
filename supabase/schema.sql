-- ==============================================================================
-- SUPABASE POSTGRESQL RBAC SCHEMA & PROFILE SETUP
-- Run this SQL in your Supabase Project -> SQL Editor
-- ==============================================================================

-- 1. Create a custom ENUM for user roles (optional check constraint approach)
CREATE TYPE public.app_role AS ENUM ('admin', 'user', 'moderator');

-- 2. Create the `public.profiles` table linked to `auth.users`
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role public.app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS) on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Helper function to check if the current authenticated user is an admin
-- SECURITY DEFINER ensures the function runs with the privileges of the creator to avoid recursive RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Helper function to get current user role
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS public.app_role AS $$
DECLARE
    user_role public.app_role;
BEGIN
    SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();
    RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Row Level Security Policies
-- Profiles: Any authenticated user can read their own profile, Admins can read all profiles
CREATE POLICY "Users can view own profile or admins view all"
    ON public.profiles
    FOR SELECT
    USING (
        auth.uid() = id OR public.is_admin()
    );

-- Profiles: Users can update their own personal info (excluding role)
CREATE POLICY "Users can update own name/avatar"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id AND 
        (role = (SELECT role FROM public.profiles WHERE id = auth.uid()))
    );

-- Profiles: Admins can update any profile (including changing roles)
CREATE POLICY "Admins can update any profile"
    ON public.profiles
    FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Profiles: Admins can delete profiles if needed
CREATE POLICY "Admins can delete profiles"
    ON public.profiles
    FOR DELETE
    USING (public.is_admin());

-- 7. Trigger to automatically create a profile when a new user signs up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    assigned_role public.app_role := 'user';
    meta_role TEXT;
BEGIN
    -- Allow initial signup role override from user_metadata (e.g. for initial testing/dev)
    meta_role := new.raw_user_meta_data->>'role';
    IF meta_role = 'admin' THEN
        assigned_role := 'admin';
    ELSIF meta_role = 'moderator' THEN
        assigned_role := 'moderator';
    ELSE
        assigned_role := 'user';
    END IF;

    INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        new.raw_user_meta_data->>'avatar_url',
        assigned_role
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
        updated_at = NOW();

    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT OR UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Helper function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at_trigger ON public.profiles;
CREATE TRIGGER profiles_updated_at_trigger
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ==============================================================================
-- CONVENIENCE QUERIES (Run manually when needed):
--
-- To promote a user to admin by email:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-email@example.com';
--
-- To view all registered profiles and their roles:
-- SELECT id, email, full_name, role, created_at FROM public.profiles ORDER BY created_at DESC;
-- ==============================================================================
