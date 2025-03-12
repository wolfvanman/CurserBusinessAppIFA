'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Alert, FormField } from './ui';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      methods.reset();
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
      
      {submitSuccess && (
        <Alert 
          variant="success" 
          title="Message Sent"
          className="mb-4"
        >
          Thank you for your message. We will get back to you soon.
        </Alert>
      )}
      
      {submitError && (
        <Alert 
          variant="error" 
          title="Error"
          className="mb-4"
          onClose={() => setSubmitError(null)}
        >
          {submitError}
        </Alert>
      )}
      
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="name"
            label="Name"
            placeholder="Your name"
            required
          />
          
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="Your email"
            required
          />
          
          <FormField
            name="company"
            label="Company"
            placeholder="Your company"
            required
          />
          
          <FormField
            name="message"
            label="Message"
            type="textarea"
            placeholder="Your message"
            required
            rows={4}
          />
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}; 