import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Contact } from '@/models';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Create a new contact entry
    const contact = await Contact.create({
      name,
      email,
      company,
      message,
      isResolved: false,
    });

    // Send notification email to admin
    await sendEmail({
      to: 'phil@arthurbrowns.co.uk',
      subject: 'New Contact Form Submission',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'Thank you for contacting us',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for contacting us</h2>
          <p>Hello ${name},</p>
          <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
          <p>Best regards,</p>
          <p>Phil Handley<br>phil@arthurbrowns.co.uk</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
} 