'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { 
  Form, 
  FormField, 
  PageHeader, 
  Card, 
  CardContent, 
  Alert 
} from '@/components/ui';

const companySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postcode: z.string().min(1, 'Postcode is required'),
  country: z.string().min(1, 'Country is required'),
  notes: z.string().optional(),
});

type CompanyFormValues = z.infer<typeof companySchema>;

export default function NewCompanyPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: CompanyFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create company');
      }

      router.push('/dashboard/companies');
    } catch (error) {
      console.error('Error creating company:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Add New Company"
        description="Create a new company account"
        action={{
          label: "Back to Companies",
          href: "/dashboard/companies"
        }}
      />

      {error && (
        <Alert 
          variant="error" 
          title="Error"
          className="mb-6"
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      <Card>
        <CardContent className="p-6">
          <Form
            schema={companySchema}
            onSubmit={handleSubmit}
            submitText="Create Company"
            isSubmitting={isSubmitting}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                name="name"
                label="Company Name"
                placeholder="Enter company name"
                required
              />
              
              <FormField
                name="contactName"
                label="Contact Name"
                placeholder="Enter primary contact name"
                required
              />
              
              <FormField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter contact email"
                required
              />
              
              <FormField
                name="phone"
                label="Phone"
                placeholder="Enter contact phone"
                required
              />
              
              <FormField
                name="address"
                label="Address"
                placeholder="Enter company address"
                required
              />
              
              <FormField
                name="city"
                label="City"
                placeholder="Enter city"
                required
              />
              
              <FormField
                name="postcode"
                label="Postcode"
                placeholder="Enter postcode"
                required
              />
              
              <FormField
                name="country"
                label="Country"
                placeholder="Enter country"
                required
              />
              
              <div className="md:col-span-2">
                <FormField
                  name="notes"
                  label="Notes"
                  type="textarea"
                  placeholder="Enter any additional notes about this company"
                  rows={4}
                />
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 