/**
 * Form Builder Types
 *
 * Types for the dynamic form builder system
 */

export type FormFieldType = 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio';

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select, radio
  helpText?: string;
}

export interface CustomForm {
  id: string;
  name: string;
  heading: string;
  description: string;
  fields: FormField[];
  submitButtonText: string;
  successMessage: string;
  emailRecipient: string; // Where to send submissions
  enabled: boolean;
}

export interface FormSubmission {
  formId: string;
  submittedAt: string;
  data: Record<string, string | string[]>;
  ipAddress?: string;
}

export interface FormsConfig {
  forms: CustomForm[];
  submissions?: FormSubmission[];
}
