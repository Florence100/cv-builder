'use client';

import { useTranslations } from 'next-intl';
import { useResetPasswordHook } from '../api/reset-password';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CombinedGraphQLErrors } from '@apollo/client';
import { Button } from '@/src/shared/ui/button';
import { ResetPasswordInput } from '../model/types';
import { PasswordInput } from '@/src/shared/ui/password-input';

export const PasswordResetForm = () => {
  const t = useTranslations('features.passwordReset');
  const tErr = useTranslations('shared.validation.errors');
  const [resetPassword, { loading }] = useResetPasswordHook();
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordInput>();

  const onSubmit = async (data: ResetPasswordInput) => {
    if (!token) {
      setError('root.server', { message: tErr('actionExpired') });
      return null;
    }

    try {
      const response = await resetPassword({
        variables: { auth: { newPassword: data.newPassword } },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      if (!response) throw Error(tErr('uninspectedServerError'));

      router.replace('/auth/login');
    } catch (error) {
      if (CombinedGraphQLErrors.is(error)) {
        const graphQLError = error.errors[0];

        if (graphQLError.message.toLocaleLowerCase().includes('action expired')) {
          setError('root.server', { message: tErr('actionExpired') });
          return null;
        }
      }
      setError('root.server', { message: tErr('uninspectedServerError') });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 items-center">
      <div className="w-full flex flex-col gap-1">
        <PasswordInput
          label={t('passwordPlaceholder')}
          isError={!!errors.newPassword}
          {...register('newPassword', {
            required: tErr('passwordRequired'),
            minLength: {
              value: 8,
              message: tErr('passwordTooShort'),
            },
          })}
        />
        {errors.newPassword && (
          <span className="text-primary text-xs self-start px-1">{errors.newPassword.message}</span>
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
