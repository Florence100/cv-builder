import { TranslationValues } from 'next-intl';
import { AuthFormData, ValidationErrors } from '@/src/model/types';

type TFunction = (key: string, values?: TranslationValues) => string;

const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function validateAuthFields(data: AuthFormData, t: TFunction): ValidationErrors | null {
  const errors: ValidationErrors = {};

  const email = data.email?.trim();
  const password = data.password?.trim();

  if (!email) {
    errors.email = t('emailRequired');
  } else if (!EMAIL_REGEXP.test(email)) {
    errors.email = t('emailInvalid');
  }

  if (!password) {
    errors.password = t('passwordRequired');
  } else if (password.length < 8) {
    errors.password = t('passwordTooShort');
  }

  return Object.keys(errors).length > 0 ? errors : null;
}
