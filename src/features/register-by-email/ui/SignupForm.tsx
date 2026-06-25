'use client';

import { Button } from '@/src/shared/ui/button';
import { FloatingInput } from '@/src/shared/ui/floating-input';
import { PasswordInput } from '@/src/shared/ui/password-input';
import { useTranslations } from 'next-intl';
import { useSignup } from '../api/signup';
import { accessTokenVar } from '@/src/entities/session/model/session';
import { useRouter } from 'next/navigation';
import { CombinedGraphQLErrors } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { SignupFormData } from '../model/types';
import { EMAIL_REGEXP } from '@/src/shared/lib/validation';

export const SignupForm = () => {
  const t = useTranslations('features.registerByEmail');
  const tErr = useTranslations('shared.validation.errors');
  const [signup, { loading }] = useSignup();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signup({
        variables: { auth: { email: data.email, password: data.password } },
      });
      if (!response) throw Error;

      const accessToken = response.data?.signup.access_token;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        accessTokenVar(response.data?.signup.access_token);
        router.replace('/users');
      }
    } catch (error) {
      if (CombinedGraphQLErrors.is(error)) {
        const graphQLError = error.errors[0];

        if (graphQLError.message.toLocaleLowerCase() === 'user already exists') {
          setError('root.server', { message: tErr('userExists') });
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
      <div className="w-full flex flex-col gap-1">
        <PasswordInput
          label={t('passwordPlaceholder')}
          isError={!!errors.password}
          {...register('password', {
            required: tErr('passwordRequired'),
            minLength: {
              value: 8,
              message: tErr('passwordTooShort'),
            },
          })}
        />
        {errors.password && (
          <span className="text-primary text-xs self-start px-1">{errors.password.message}</span>
        )}
      </div>

      {errors.root?.server && (
        <div className="text-primary text-sm text-center mt-2">{errors.root?.server.message}</div>
      )}

      <Button
        disabled={loading}
        type="submit"
        className="w-55 h-12 rounded-full uppercase text-sm mt-10 shadow-sm hover:bg-btn-hovered cursor-pointer"
      >
        {t('submitButton')}
      </Button>
    </form>
  );
};
