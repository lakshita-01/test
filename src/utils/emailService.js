// src/utils/emailService.js

/**
 * Email Service Utility
 * 
 * This utility handles email-related operations for the application.
 * In a production environment, this would integrate with services like:
 * - SendGrid
 * - AWS SES
 * - Mailgun
 * - Nodemailer with SMTP
 */

// Mock email templates
const EMAIL_TEMPLATES = {
  PASSWORD_RESET: {
    subject: 'Reset Your BlueStock Password',
    getHtmlContent: (resetLink, userEmail) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #673ab7, #3f51b5); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8faff; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: linear-gradient(135deg, #673ab7, #3f51b5); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>BlueStock IPO Platform</h1>
            <p>Password Reset Request</p>
          </div>
          <div class="content">
            <h2>Hello!</h2>
            <p>We received a request to reset the password for your BlueStock account associated with <strong>${userEmail}</strong>.</p>
            
            <p>Click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetLink}" class="button">Reset My Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 4px;">
              ${resetLink}
            </p>
            
            <div class="warning">
              <strong>Security Notice:</strong>
              <ul>
                <li>This link will expire in 1 hour for security reasons</li>
                <li>If you didn't request this password reset, please ignore this email</li>
                <li>Never share this link with anyone</li>
              </ul>
            </div>
            
            <p>If you're having trouble with the button above, copy and paste the URL into your web browser.</p>
            
            <p>Best regards,<br>The BlueStock Team</p>
          </div>
          <div class="footer">
            <p>This email was sent to ${userEmail}</p>
            <p>© 2024 BlueStock IPO Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    getTextContent: (resetLink, userEmail) => `
      BlueStock IPO Platform - Password Reset Request
      
      Hello!
      
      We received a request to reset the password for your BlueStock account associated with ${userEmail}.
      
      Click the link below to reset your password:
      ${resetLink}
      
      Security Notice:
      - This link will expire in 1 hour for security reasons
      - If you didn't request this password reset, please ignore this email
      - Never share this link with anyone
      
      Best regards,
      The BlueStock Team
      
      This email was sent to ${userEmail}
      © 2024 BlueStock IPO Platform. All rights reserved.
    `
  }
};

/**
 * Generate a secure reset token
 * In production, this should be generated on the backend
 */
export const generateResetToken = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

/**
 * Generate password reset link
 */
export const generateResetLink = (email, token) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
};

/**
 * Send password reset email
 * In production, this would make an API call to your backend
 * which would then send the email using a service like SendGrid
 */
export const sendPasswordResetEmail = async (email) => {
  try {
    // Generate reset token (in production, this should be done on backend)
    const token = generateResetToken();
    const resetLink = generateResetLink(email, token);
    
    // Get email template
    const template = EMAIL_TEMPLATES.PASSWORD_RESET;
    const htmlContent = template.getHtmlContent(resetLink, email);
    const textContent = template.getTextContent(resetLink, email);
    
    // In production, you would make an API call like this:
    /*
    const response = await fetch('/api/auth/send-reset-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        subject: template.subject,
        htmlContent,
        textContent,
        token // Backend should store this token with expiration
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send reset email');
    }
    
    return await response.json();
    */
    
    // Mock implementation for demo
    console.log('=== PASSWORD RESET EMAIL ===');
    console.log('To:', email);
    console.log('Subject:', template.subject);
    console.log('Reset Link:', resetLink);
    console.log('Token:', token);
    console.log('HTML Content:', htmlContent);
    console.log('============================');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store token in localStorage for demo (in production, store on backend)
    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    resetTokens[email] = {
      token,
      expires: Date.now() + (60 * 60 * 1000), // 1 hour
      used: false
    };
    localStorage.setItem('resetTokens', JSON.stringify(resetTokens));
    
    return {
      success: true,
      message: 'Password reset email sent successfully',
      token // Don't return token in production
    };
    
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

/**
 * Validate reset token
 * In production, this would validate against backend storage
 */
export const validateResetToken = async (email, token) => {
  try {
    // In production, make API call to validate token
    /*
    const response = await fetch('/api/auth/validate-reset-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, token }),
    });
    
    if (!response.ok) {
      throw new Error('Invalid or expired token');
    }
    
    return await response.json();
    */
    
    // Mock implementation for demo
    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    const tokenData = resetTokens[email];
    
    if (!tokenData) {
      throw new Error('Token not found');
    }
    
    if (tokenData.token !== token) {
      throw new Error('Invalid token');
    }
    
    if (tokenData.used) {
      throw new Error('Token already used');
    }
    
    if (Date.now() > tokenData.expires) {
      throw new Error('Token expired');
    }
    
    return {
      valid: true,
      email,
      token
    };
    
  } catch (error) {
    console.error('Error validating reset token:', error);
    throw error;
  }
};

/**
 * Reset password with token
 * In production, this would make an API call to your backend
 */
export const resetPasswordWithToken = async (email, token, newPassword) => {
  try {
    // Validate token first
    await validateResetToken(email, token);
    
    // In production, make API call to reset password
    /*
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        token,
        newPassword
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to reset password');
    }
    
    return await response.json();
    */
    
    // Mock implementation for demo
    console.log('=== PASSWORD RESET ===');
    console.log('Email:', email);
    console.log('Token:', token);
    console.log('New Password:', '***hidden***');
    console.log('======================');
    
    // Mark token as used
    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    if (resetTokens[email]) {
      resetTokens[email].used = true;
      localStorage.setItem('resetTokens', JSON.stringify(resetTokens));
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Password reset successfully'
    };
    
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

/**
 * Check if email exists in the system
 * In production, this would check against your user database
 */
export const checkEmailExists = async (email) => {
  try {
    // In production, make API call to check if email exists
    /*
    const response = await fetch('/api/auth/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    return await response.json();
    */
    
    // Mock implementation - accept any valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return { exists: false, message: 'Invalid email format' };
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo, accept any email that looks valid
    return { 
      exists: true, 
      message: 'Email found in system' 
    };
    
  } catch (error) {
    console.error('Error checking email:', error);
    throw new Error('Failed to check email');
  }
};

export default {
  sendPasswordResetEmail,
  validateResetToken,
  resetPasswordWithToken,
  checkEmailExists,
  generateResetToken,
  generateResetLink
};