'use client';

import { Button } from '@/src/shared/ui/button';
import { FloatingInput } from '@/src/shared/ui/floating-input';
import { PasswordInput } from '@/src/shared/ui/password-input';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';
import { useSignup } from '../api/signup';
import { accessTokenVar } from '@/src/entities/session/model/session';
import { useRouter } from 'next/navigation';
import { validateAuthFields } from '../../auth-by-email/utils/validate';
import { CombinedGraphQLErrors } from '@apollo/client';

interface SignupFormState {
  errors?: {
    email?: string;
    password?: string;
    server?: string;
  };
  inputs?: {
    email: string;
  };
}

export const SignupForm = () => {
  const t = useTranslations('features.registerByEmail');
  const tErr = useTranslations('errors');
  const [signup] = useSignup();
  const router = useRouter();

  const initialState: SignupFormState = { errors: {}, inputs: { email: '' } };

  const [state, formAction, isPending] = useActionState(reducerAction, initialState);

  async function reducerAction(
    previousState: SignupFormState,
    actionPayload: FormData
  ): Promise<SignupFormState> {
    const email = actionPayload.get('email') as string;
    const password = actionPayload.get('password') as string;

    const validationErrors = validateAuthFields({ email: email, password: password }, tErr);

    if (validationErrors) {
      return {
        errors: validationErrors,
        inputs: { email },
      };
    }

    try {
      const response = await signup({ variables: { auth: { email: email, password: password } } });
      if (!response) throw Error;

      const accessToken = response.data?.signup.access_token;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        accessTokenVar(accessToken);
        router.replace('/users');
      }

      return { errors: {} };
    } catch (error) {
      if (CombinedGraphQLErrors.is(error)) {
        const graphQLError = error.errors[0];

        if (graphQLError.message.toLocaleLowerCase() === 'user already exists') {
          return { errors: { server: tErr('userExists') } };
        }
      }
      return { errors: { server: tErr('uninspectedServerError') } };
    }
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-5 items-center">
      <div className="w-full flex flex-col gap-1">
        <FloatingInput
          type="email"
          name="email"
          label={t('emailPlaceholder')}
          defaultValue={state?.inputs?.email}
          isError={!!state?.errors?.email}
        />
        {state?.errors?.email && (
          <span className="text-primary text-xs self-start px-1">{state.errors.email}</span>
        )}
      </div>
      <div className="w-full flex flex-col gap-1">
        <PasswordInput
          name="password"
          label={t('passwordPlaceholder')}
          isError={!!state?.errors?.email}
        />
        {state?.errors?.password && (
          <span className="text-primary text-xs self-start px-1">{state.errors.password}</span>
        )}
      </div>

      {state?.errors?.server && (
        <div className="text-primary text-sm text-center mt-2">{state.errors.server}</div>
      )}

      <Button
        disabled={isPending}
        className="w-55 h-12 rounded-full uppercase text-sm mt-10 shadow-sm hover:bg-btn-hovered cursor-pointer"
      >
        {t('submitButton')}
      </Button>
    </form>
  );
};
