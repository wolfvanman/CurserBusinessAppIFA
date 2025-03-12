'use client';

import React from 'react';
import { useForm, FormProvider, UseFormProps, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './Button';

interface FormProps<T extends z.ZodType<any, any>> {
  schema: T;
  onSubmit: SubmitHandler<z.infer<T>>;
  defaultValues?: UseFormProps<z.infer<T>>['defaultValues'];
  children: React.ReactNode;
  submitText?: string;
  isSubmitting?: boolean;
  className?: string;
}

export const Form = <T extends z.ZodType<any, any>>({
  schema,
  onSubmit,
  defaultValues,
  children,
  submitText = 'Submit',
  isSubmitting = false,
  className,
}: FormProps<T>) => {
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
        noValidate
      >
        <div className="space-y-4">{children}</div>
        <div className="mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Submitting...' : submitText}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}; 