# Login Credentials for Affinity Tax Services Application

## Overview
This document contains the login credentials for testing the Affinity Tax Services application. The application uses a mock authentication system for development and testing purposes.

## Authentication System
The application currently uses a **mock authentication system** that accepts any email address and password combination. The user role is determined by the email address format.

## Test Accounts

### 1. Admin Account
- **Email**: `admin@affinitytax.com` or any email containing "admin"
- **Password**: Any password (e.g., `password123`)
- **Role**: Admin
- **Access**: Full administrative dashboard with user management, task management, and system analytics

### 2. Tax Professional Account
- **Email**: `taxpro@affinitytax.com` or `steve.rogers@affinitytax.com`
- **Password**: Any password (e.g., `password123`)
- **Role**: Tax Professional
- **Access**: Preparer dashboard with task management features

### 3. Preparer Account
- **Email**: `preparer@affinitytax.com`
- **Password**: Any password (e.g., `password123`)
- **Role**: Preparer
- **Access**: Preparer dashboard with task management features

### 4. Client Account
- **Email**: `client@example.com` or any email not containing "admin"
- **Password**: Any password (e.g., `password123`)
- **Role**: Client
- **Access**: Client dashboard with limited features

## Mock Employee Accounts (Available in Task Management)
The following employees are available in the task management system:

1. **Steve Rogers**
   - Email: `steve.rogers@affinitytax.com`
   - Role: Tax Professional
   - Department: Tax Preparation

2. **Natasha Romanoff**
   - Email: `natasha.romanoff@affinitytax.com`
   - Role: Tax Professional
   - Department: Tax Preparation

3. **Bruce Banner**
   - Email: `bruce.banner@affinitytax.com`
   - Role: Tax Professional
   - Department: Audit Support

4. **Tony Stark**
   - Email: `tony.stark@affinitytax.com`
   - Role: Manager
   - Department: Management

5. **Wanda Maximoff**
   - Email: `wanda.maximoff@affinitytax.com`
   - Role: Admin
   - Department: Administration

## How to Login

1. Navigate to the application at `http://localhost:3000`
2. Click on "Login" or go directly to `/login`
3. Enter any of the email addresses listed above
4. Enter any password (the system doesn't validate passwords in mock mode)
5. Click "Sign In"

## Role-Based Access Control

The application automatically redirects users based on their role:

- **Admin users**: Redirected to `/admin` dashboard
- **Tax Professionals/Preparers**: Redirected to `/preparer-dashboard`
- **Clients**: Redirected to `/client-dashboard`

## Database Credentials (For Reference)
If connecting to the actual database, the setup script includes these test accounts:

- **Admin**: `admin@affinitytax.com` / `password123` (hashed)
- **Tax Professional**: `taxpro@affinitytax.com` / `password123` (hashed)
- **Client**: `client@example.com` / `password123` (hashed)

## Notes

- The current implementation uses **mock authentication** for development purposes
- Passwords are not validated in the current mock system
- User roles are determined by email patterns (emails containing "admin" become admin users)
- All authentication data is stored in localStorage for session persistence
- For production deployment, implement proper password hashing and validation

## Quick Test Credentials

For quick testing, use:
- **Admin**: `admin@test.com` / `password`
- **Preparer**: `preparer@test.com` / `password`
- **Client**: `client@test.com` / `password`

---

*Last Updated: January 2025*
*Application Version: Development*