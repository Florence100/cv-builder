'use client';

import { useTranslations } from 'next-intl';
import { useForgotPasswordHook } from '../api/forgot-password';
import { useRouter } from 'next/navigation';
import { ForgotPasswordInput } from '../model/types';
import { useForm } from 'react-hook-form';
import { CombinedGraphQLErrors } from '@apollo/client';
import { EMAIL_REGEXP } from '@/src/shared/lib/validation';
import { FloatingInput } from '@/src/shared/ui/floating-input';
import { Button } from '@/src/shared/ui/button';

export const PasswordRecoveryForm = () => {
  const t = useTranslations('features.passwordRecovery');
  const tErr = useTranslations('shared.validation.errors');
  const [forgotPassword, { loading }] = useForgotPasswordHook();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordInput>();

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      const response = await forgotPassword({
        variables: { auth: { email: data.email } },
      });
      if (!response) throw Error(tErr('uninspectedServerError'));

      router.replace('/auth/login');
    } catch (error) {
      if (CombinedGraphQLErrors.is(error)) {
        const graphQLError = error.errors[0];

        if (graphQLError.message.toLocaleLowerCase().includes('failed to send email')) {
          setError('root.server', { message: tErr('noEmail') });
          return null;
        }
      }
      setError('root.server', { message: tErr('uninspectedServerError') });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 items-center">
      <div className="w-full flex flex-col gap-1">
        <FloatingInput
          label={t('emailPlaceholder')}
          isError={!!errors.email}
          {...register('email', {
            required: tErr('emailRequired'),
            pattern: {
              value: EMAIL_REGEXP,
              message: tErr('emailInvalid'),
            },
          })}
        />
        {errors.email && (
          <span className="text-primary text-xs self-start px-1">{errors.email.message}</span>
        )}
      </div>

      {errors.root?.server && (
        <div className="text-primary text-sm text-center mt-2">{errors.root?.server.message}</div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-55 h-12 rounded-full uppercase text-sm mt-10 shadow-sm hover:bg-btn-hovered cursor-pointer"
      >
        {t('submitButton')}
      </Button>
    </form>
  );
};
