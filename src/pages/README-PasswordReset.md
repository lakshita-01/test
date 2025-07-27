# Password Reset Feature Documentation

## Overview
This document describes the password reset functionality implemented for the BlueStock IPO Platform.

## Features
- **Forgot Password Page**: Allows users to request a password reset by entering their email
- **Email Validation**: Checks if the email exists in the system before sending reset link
- **Reset Password Page**: Secure page for users to set a new password using a reset token
- **Email Service**: Utility service for handling email operations (mock implementation)
- **Security Features**: Token expiration, one-time use tokens, password strength validation

## Pages Added

### 1. ForgotPasswordPage (`/forgot-password`)
- Clean, user-friendly interface for password reset requests
- Email validation and error handling
- Success state showing confirmation message
- Resend email functionality
- Navigation back to sign-in page

### 2. ResetPasswordPage (`/reset-password`)
- Token validation on page load
- Password strength indicator
- Confirm password validation
- Security notices and error handling
- Success state with redirect to sign-in

## Routes Added
```javascript
<Route path="/forgot-password" element={<ForgotPasswordPage />} />
<Route path="/reset-password" element={<ResetPasswordPage />} />
```

## Email Service (`src/utils/emailService.js`)

### Functions
- `sendPasswordResetEmail(email)`: Sends password reset email
- `validateResetToken(email, token)`: Validates reset token
- `resetPasswordWithToken(email, token, newPassword)`: Resets password
- `checkEmailExists(email)`: Checks if email exists in system
- `generateResetToken()`: Generates secure reset token
- `generateResetLink(email, token)`: Creates reset link

### Mock Implementation
The current implementation is a mock for demonstration purposes. In production, you would:

1. **Backend Integration**: Replace mock functions with actual API calls
2. **Email Service**: Integrate with services like SendGrid, AWS SES, or Mailgun
3. **Database Storage**: Store reset tokens securely in your database
4. **Security**: Implement proper token encryption and validation

## Security Features

### Token Security
- **Expiration**: Tokens expire after 1 hour
- **One-time Use**: Tokens can only be used once
- **Secure Generation**: 64-character random tokens
- **Validation**: Comprehensive token validation

### Password Security
- **Strength Validation**: Real-time password strength indicator
- **Requirements**: Minimum 8 characters, uppercase, lowercase, numbers
- **Confirmation**: Password confirmation field
- **Visibility Toggle**: Show/hide password functionality

## Usage Flow

1. **User clicks "Forgot Password?" on sign-in page**
2. **User enters email on forgot password page**
3. **System validates email exists**
4. **System sends reset email with secure token**
5. **User clicks reset link in email**
6. **System validates token and shows reset form**
7. **User enters new password with strength validation**
8. **System resets password and shows success message**
9. **User redirected to sign-in page**

## Integration with Sign-In Page
- Added "Forgot Password?" link below password field
- Link navigates to `/forgot-password` route
- Maintains consistent styling with existing design

## Styling
- Consistent with existing Material-UI theme
- Responsive design for mobile and desktop
- Gradient backgrounds and modern styling
- Smooth animations using Framer Motion
- Loading states and progress indicators

## Testing the Feature

### Demo Flow
1. Go to sign-in page (`/signin`)
2. Click "Forgot Password?" link
3. Enter any valid email address
4. Check browser console for generated reset link
5. Copy the reset link and paste in browser
6. Set new password and complete the flow

### Mock Data
- Any valid email format is accepted
- Reset tokens are stored in localStorage for demo
- Console logs show email content and reset details

## Production Considerations

### Backend Requirements
```javascript
// Example API endpoints needed
POST /api/auth/send-reset-email
POST /api/auth/validate-reset-token  
POST /api/auth/reset-password
POST /api/auth/check-email
```

### Email Service Integration
```javascript
// Example SendGrid integration
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendResetEmail = async (email, resetLink) => {
  const msg = {
    to: email,
    from: 'noreply@bluestock.com',
    subject: 'Reset Your BlueStock Password',
    html: getEmailTemplate(resetLink),
  };
  
  await sgMail.send(msg);
};
```

### Database Schema
```sql
-- Reset tokens table
CREATE TABLE password_reset_tokens (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Error Handling
- Invalid email addresses
- Expired tokens
- Used tokens
- Network errors
- Validation errors
- User-friendly error messages

## Accessibility
- Proper ARIA labels
- Keyboard navigation
- Screen reader support
- High contrast support
- Focus management

## Mobile Responsiveness
- Touch-friendly interface
- Responsive layouts
- Mobile-optimized forms
- Proper viewport handling