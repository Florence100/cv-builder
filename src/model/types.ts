export interface AuthFormState {
  errors?: {
    email?: string;
    password?: string;
    server?: string;
  };
  inputs?: {
    email?: string;
  };
  success?: boolean;
}

export interface AuthFormData {
  email?: string;
  password?: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
}
