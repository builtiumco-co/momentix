# Momentix Phase 1 PRD — Authentication & Account Setup

---

## 📋 Document Header

| Field | Value |
|-------|-------|
| **Product** | Momentix |
| **Phase** | Phase 1: Authentication & Account Management |
| **Version** | 1.0 |
| **Status** | In Development |
| **Owner** | Product Manager |
| **Audience** | Engineering, QA, Product |
| **Timeline** | 1-2 weeks |

---

## 🎯 Phase 1 Objective

Enable users to **create accounts, authenticate securely, and maintain sessions** with a fully functional signup/login system.

**End State:** Users can sign up with email/password or Google OAuth, log in, and access authenticated features.

---

## 📊 Phase 1 Scope

### ✅ In Scope

1. **User Registration (Signup)**
   - Email + password signup
   - Google OAuth signup
   - Input validation (email format, password strength)
   - Duplicate email prevention
   - Confirmation flow (optional: email verification)

2. **User Login (Signin)**
   - Email + password login
   - Google OAuth login
   - Remember me / persistent login
   - Session management (JWT)

3. **User Logout**
   - Session termination
   - Clear auth tokens
   - Redirect to login page

4. **Account Security**
   - Password hashing (bcrypt)
   - RLS (Row Level Security) policies
   - Rate limiting on auth endpoints
   - Secure HTTP headers (CORS, CSP)

5. **Database Infrastructure**
   - Users table
   - Sessions table
   - Auth-related migrations

6. **API Endpoints**
   - `POST /api/auth/signup`
   - `POST /api/auth/login`
   - `POST /api/auth/logout`
   - `POST /api/auth/google-callback`
   - `GET /api/auth/user` (current user)
   - `GET /api/auth/refresh` (refresh token)

7. **Frontend (Basic)**
   - Login page (minimal, functional UI)
   - Signup page (minimal, functional UI)
   - Navigation bar with logout
   - Protected routes (redirect to login if not authenticated)

8. **Error Handling**
   - Invalid email
   - Weak password
   - Email already exists
   - Incorrect credentials
   - Session expired
   - Rate limit exceeded

### ❌ Out of Scope (Phase 2+)

- ❌ Email verification
- ❌ Password reset
- ❌ Multi-factor authentication (MFA)
- ❌ User profile customization
- ❌ Account recovery
- ❌ Social logins beyond Google
- ❌ Beautiful/polished UI (that's Phase 2)

---

## 🏗️ Technical Architecture

### **Database Schema**

#### **users table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT,
  full_name TEXT,
  avatar_url TEXT,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  role TEXT DEFAULT 'user',
  is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_users_email ON users(email);
```

#### **sessions table**
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(token);
```

#### **RLS Policies**
```sql
-- Users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Sessions table
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions"
  ON sessions FOR DELETE
  USING (auth.uid() = user_id);
```

---

## 🔌 API Specification

### **1. POST /api/auth/signup**

**Purpose:** Register a new user account

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "user": {
    "id": "uuid-xxx",
    "email": "user@example.com",
    "fullName": "John Doe",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "session": {
    "token": "jwt-token-xxx",
    "refreshToken": "refresh-token-xxx",
    "expiresAt": "2024-01-16T10:30:00Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "error": "email_already_exists",
  "message": "An account with this email already exists"
}
```

**Error Codes:**
- `invalid_email` → Email format invalid
- `weak_password` → Password doesn't meet requirements
- `email_already_exists` → Email already registered
- `internal_error` → Server error

---

### **2. POST /api/auth/login**

**Purpose:** Authenticate user and create session

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid-xxx",
    "email": "user@example.com",
    "fullName": "John Doe"
  },
  "session": {
    "token": "jwt-token-xxx",
    "refreshToken": "refresh-token-xxx",
    "expiresAt": "2024-01-16T10:30:00Z"
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "error": "invalid_credentials",
  "message": "Email or password is incorrect"
}
```

**Error Codes:**
- `invalid_credentials` → Wrong email/password
- `account_not_found` → Email not registered
- `account_inactive` → Account disabled
- `too_many_attempts` → Rate limited

---

### **3. POST /api/auth/logout**

**Purpose:** End user session and clear tokens

**Request:**
```json
{
  "token": "jwt-token-xxx"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### **4. POST /api/auth/google-callback**

**Purpose:** Handle Google OAuth callback

**Request:**
```json
{
  "googleToken": "google-id-token-xxx"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {...},
  "session": {...}
}
```

**Flow:**
1. User clicks "Sign in with Google"
2. Redirected to Google login
3. Google returns ID token
4. Backend verifies token
5. User created or found
6. Session created
7. User redirected to dashboard

---

### **5. GET /api/auth/user**

**Purpose:** Get current authenticated user

**Headers:**
```
Authorization: Bearer jwt-token-xxx
```

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid-xxx",
    "email": "user@example.com",
    "fullName": "John Doe",
    "avatarUrl": null,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "error": "unauthorized",
  "message": "Authentication token missing or invalid"
}
```

---

### **6. POST /api/auth/refresh**

**Purpose:** Refresh expired JWT token

**Request:**
```json
{
  "refreshToken": "refresh-token-xxx"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "token": "new-jwt-token-xxx",
  "expiresAt": "2024-01-17T10:30:00Z"
}
```

---

## 🔐 Security Requirements

### **Password Policy**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character
- No common passwords (e.g., "password123")

### **Token Security**
- JWT tokens: 24-hour expiry
- Refresh tokens: 7-day expiry
- Tokens stored in HTTP-only cookies (not localStorage)
- CSRF protection enabled

### **Rate Limiting**
- Signup: 5 attempts per hour per IP
- Login: 10 failed attempts per hour per IP (then 5 min lockout)
- Password reset: 3 attempts per hour per email

### **CORS & Headers**
```
Access-Control-Allow-Origin: https://createmomentix.com
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
```

### **Data Protection**
- Passwords hashed with bcrypt (10 salt rounds)
- No passwords logged or exposed
- Sessions tied to user_id (not transferable)
- IP address logged for security audit

---

## 📱 Frontend Pages & Components

### **Pages**

#### **1. /auth/login**
- Email input
- Password input
- "Remember me" checkbox
- Sign in button
- "Sign in with Google" button
- "Don't have an account? Sign up" link
- Error messages display
- Loading state

#### **2. /auth/signup**
- Email input
- Password input
- Confirm password input
- Full name input
- Terms & conditions checkbox
- Sign up button
- "Sign up with Google" button
- "Already have an account? Sign in" link
- Password strength indicator
- Error messages display
- Loading state

#### **3. /dashboard (Protected)**
- Welcome message: "Hi, [Full Name]!"
- Navigation bar with logout button
- Redirect to /auth/login if not authenticated

### **Components**

#### **ProtectedRoute Component**
```typescript
// components/ProtectedRoute.tsx
If user is not authenticated:
  → Redirect to /auth/login
Else:
  → Render component
```

#### **AuthContext**
```typescript
// context/AuthContext.tsx
Provides:
- currentUser (user object or null)
- isLoading (boolean)
- login(email, password)
- signup(email, password, fullName)
- logout()
- loginWithGoogle(googleToken)
```

---

## 🧪 Testing & Acceptance Criteria

### **Signup Flow**
```
✅ User can sign up with email + password
✅ Signup form validates email format
✅ Signup form validates password strength
✅ Duplicate email shows error
✅ User cannot signup with weak password
✅ User receives confirmation (or auto-login)
✅ User is redirected to dashboard on success
✅ Invalid form shows clear error messages
✅ Google OAuth signup works end-to-end
```

### **Login Flow**
```
✅ User can login with email + password
✅ Wrong password shows "Invalid credentials"
✅ Non-existent email shows "Account not found"
✅ User is redirected to dashboard on success
✅ User session is created and persists
✅ Google OAuth login works end-to-end
✅ Rate limiting blocks excessive login attempts
✅ Session expires after 24 hours
```

### **Logout Flow**
```
✅ User can logout from dashboard
✅ Session is terminated on backend
✅ User is redirected to /auth/login
✅ User cannot access protected routes after logout
✅ All tokens are cleared
```

### **Security**
```
✅ Passwords are hashed (never stored plaintext)
✅ JWT tokens are validated on each request
✅ RLS policies prevent users from seeing other users' data
✅ Rate limiting works on auth endpoints
✅ CORS headers are set correctly
✅ No sensitive data leaked in error messages
✅ SQL injection attempts are blocked
```

### **Edge Cases**
```
✅ User tries to access /dashboard without login → redirected to /auth/login
✅ User tries to signup with existing email → error shown
✅ User tries to login with unverified email → email verification sent
✅ Session expires → user redirected to login
✅ Refresh token invalid → user must re-login
✅ Multiple concurrent sessions → all logged out on logout
✅ User disables/deletes account → all sessions invalidated
```

---

## 📈 Success Metrics

| Metric | Target |
|--------|--------|
| **Signup completion rate** | >80% (users who start signup complete it) |
| **Login success rate** | >95% (valid credentials work) |
| **Page load time** | <2s (login/signup pages) |
| **API response time** | <500ms (auth endpoints) |
| **Error rate** | <1% (failed auth attempts from valid users) |
| **Security incidents** | 0 (no unauthorized access) |

---

## 🚀 Deployment & Rollout

### **Pre-Deployment Checklist**
```
✅ All unit tests passing
✅ All integration tests passing
✅ Security audit completed
✅ Rate limiting tested
✅ RLS policies verified
✅ Environment variables configured
✅ Vercel deployment configured
✅ Database backups enabled
✅ Monitoring/logging enabled
```

### **Deployment Steps**
1. Push code to GitHub main branch
2. Vercel auto-deploys to staging
3. Run smoke tests on staging
4. Deploy to production (Vercel)
5. Monitor error rates & performance
6. Be ready to rollback if issues

### **Rollback Plan**
- If auth endpoints fail → rollback last commit
- If database migration fails → restore from backup
- If security issue found → immediate patch + redeploy

---

## 📞 Stakeholder Communication

### **For Users**
- "Welcome to Momentix! Sign up to start creating beautiful stories."
- Clear instructions on signup/login
- Error messages that explain what went wrong

### **For Team**
- Daily standup: progress on Phase 1 tasks
- Code review before merging
- QA testing before production deploy

### **For Support/Operations**
- Document common error messages
- Create runbook for account recovery
- Document backup/restore procedures

---

## 🔄 Phase 1 → Phase 2 Handoff

**At end of Phase 1:**
- ✅ Users can create accounts
- ✅ Users can log in securely
- ✅ Sessions are managed properly
- ✅ Data is protected with RLS

**Phase 2 starts with:**
- Story creation UI
- Photo upload functionality
- Story form/inputs
- Basic dashboard

---

## 📋 Deliverables Checklist

### **By End of Phase 1**

**Backend**
- [ ] Supabase project configured
- [ ] Database schema created (users, sessions)
- [ ] RLS policies enabled
- [ ] Auth API routes implemented
- [ ] Error handling in place
- [ ] Rate limiting configured
- [ ] Google OAuth configured

**Frontend**
- [ ] Login page built
- [ ] Signup page built
- [ ] Protected routes setup
- [ ] Auth context/hooks created
- [ ] Navigation bar with logout
- [ ] Error message display
- [ ] Loading states

**Testing**
- [ ] Unit tests for auth functions
- [ ] Integration tests for API
- [ ] E2E tests for signup/login flows
- [ ] Security tests (RLS, rate limiting)

**Documentation**
- [ ] API docs (endpoint specs)
- [ ] Setup instructions
- [ ] Database schema docs
- [ ] Environment variables guide

**Deployment**
- [ ] Vercel deployment setup
- [ ] Environment variables configured
- [ ] Database backups enabled
- [ ] Monitoring enabled

---

## 🎯 Definition of Done (DoD)

A task is complete when:

1. ✅ Code is written and reviewed
2. ✅ Tests are passing (unit + integration)
3. ✅ Code is merged to main branch
4. ✅ Deployed to Vercel staging
5. ✅ QA testing passed
6. ✅ Deployed to production
7. ✅ Monitored for errors (24 hours)
8. ✅ Documentation updated
9. ✅ No known bugs or security issues

---

## 📅 Timeline

| Week | Task | Status |
|------|------|--------|
| **Week 1** | Setup (Supabase, Next.js, database schema) | In Progress |
| **Week 1** | Auth API routes implementation | In Progress |
| **Week 1** | Signup/login pages (basic) | In Progress |
| **Week 1** | Testing & security audit | In Progress |
| **Week 2** | Deployment & monitoring | In Progress |
| **Week 2** | Phase 2 planning | Ready |

---

## 🤔 Open Questions & Decisions

| Question | Answer | Decision Owner |
|----------|--------|-----------------|
| Email verification required? | TBD (likely no for MVP) | Product |
| Password reset in MVP? | No (Phase 2) | Product |
| MFA required? | No (Phase 2) | Product |
| Social logins beyond Google? | No (Phase 2) | Product |
| Email notifications on signup? | No (Phase 2) | Product |

---

## 📝 Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| **Product Manager** | [Your Name] | [Date] | ✓ |
| **Engineering Lead** | [Dev Name] | [Date] | ✓ |
| **Design Lead** | [Designer Name] | [Date] | ✓ |

---

## 📎 Appendices

### **Appendix A: Password Strength Requirements**
```
✅ Valid:  SecurePass123!
✅ Valid:  MyStory@2024
❌ Invalid: password123 (no uppercase/special char)
❌ Invalid: Pass123 (too short)
❌ Invalid: PASSWORD123! (no lowercase)
```

### **Appendix B: Error Messages**
```
"Invalid email format" → User entered invalid email
"Password too weak" → Password doesn't meet requirements
"Email already exists" → Account already registered
"Invalid credentials" → Wrong email/password
"Account inactive" → Account has been disabled
"Too many login attempts. Try again in 5 minutes." → Rate limited
```

### **Appendix C: Environment Variables**
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... # Backend only
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxx # Backend only
JWT_SECRET=xxxxx # Backend only
```

---

**End of Phase 1 PRD**
