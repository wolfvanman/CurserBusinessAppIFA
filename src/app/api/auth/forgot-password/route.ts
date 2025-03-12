import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import { User } from '@/models';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find the user by email
    const user = await User.findOne({ email });

    // If no user is found, we still return a success response for security reasons
    if (!user) {
      return NextResponse.json(
        { success: true, message: 'If an account exists with this email, you will receive password reset instructions.' },
        { status: 200 }
      );
    }

    // Generate a reset token and expiry
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Update the user with the reset token and expiry
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Create the reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;

    // Send the reset email
    await sendEmail({
      to: email,
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reset Your Password</h2>
          <p>You requested a password reset for your Financial Advisor Portal account.</p>
          <p>Click the button below to reset your password. This link is valid for 1 hour.</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 20px 0;">Reset Password</a>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,</p>
          <p>Financial Advisor Portal Team</p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'If an account exists with this email, you will receive password reset instructions.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in forgot password:', error);
    return NextResponse.json(
      { error: 'Failed to process forgot password request' },
      { status: 500 }
    );
  }
} 