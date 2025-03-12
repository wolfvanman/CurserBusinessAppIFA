import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import { User } from '@/models';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find the user by reset token and check if it's still valid
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    // Send a confirmation email
    await sendEmail({
      to: user.email,
      subject: 'Your Password Has Been Reset',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Successful</h2>
          <p>Your password for the Financial Advisor Portal has been successfully reset.</p>
          <p>If you did not make this change, please contact us immediately.</p>
          <p>Best regards,</p>
          <p>Financial Advisor Portal Team</p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Password has been reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in reset password:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
} 