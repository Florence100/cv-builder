'use client';

import { useActionState } from 'react';
import { Button } from '@/src/shared/ui/button';
import { useTranslations } from 'next-intl';
import { PasswordInput } from '@/src/shared/ui/password-input';
import { FloatingInput } from '@/src/shared/ui/floating-input';
import { validateAuthFields } from '../utils/validate';
import { AuthFormState } from '@/src/model/types';
import { useLogin } from '../api/api';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const t = useTranslations('pages.login');
  const tErr = useTranslations('errors');
  const [loginTrigger] = useLogin();
  const router = useRouter();

  const initialState: AuthFormState = { errors: {}, inputs: { email: '' } };

  async function reducerAction(
    previousState: AuthFormState,
    actionPayload: FormData
  ): Promise<AuthFormState> {
    const email = actionPayload.get('email') as string;
    const password = actionPayload.get('password') as string;

    const validationErrors = validateAuthFields({ email: email, password: password }, tErr);

    if (validationErrors) {
      return {
        errors: validationErrors,
        inputs: { email },
        success: false,
      };
    }

    try {
      const { data } = await loginTrigger({
        variables: {
          auth: {
            email,
            password,
          },
        },
      });

      if (!data) throw Error;

      const {
        access_token: accessToken,
        // user
      } = data.login;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        return { errors: {}, success: true };
      }

      return { errors: {}, success: true };
    } catch (error) {
      if (CombinedGraphQLErrors.is(error)) {
        const graphQLError = error.errors[0];

        if (graphQLError.message.toLocaleLowerCase() === 'invalid credentials') {
          return { errors: { server: tErr('invalidCredentials') }, success: false };
        }
      }
      return { errors: { server: tErr('uninspectedServerError') }, success: false };
    }
  }

  const [state, formAction, isPending] = useActionState(reducerAction, initialState);

  if (state.success) {
    router.replace('/users');
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-5 items-center">
      <div className="w-full flex flex-col gap-1">
        <FloatingInput
          type="email"
          name="email"
          label={t('emailPlaceholder')}
          defaultValue={state?.inputs?.email}
        />
        {state?.errors?.email && (
          <span className="text-red-500 text-xs self-start px-1">{state.errors.email}</span>
        )}
      </div>

      <div className="w-full flex flex-col gap-1">
        <PasswordInput name="password" label={t('passwordPlaceholder')} />
        {state?.errors?.password && (
          <span className="text-red-500 text-xs self-start px-1">{state.errors.password}</span>
        )}
      </div>

      {state?.errors?.server && (
        <div className="text-red-500 text-sm text-center mt-2">{state.errors.server}</div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="cursor-pointer w-55 h-12 rounded-[40px] uppercase text-sm mt-10 shadow-sm hover:bg-btn-hovered"
      >
        {t('button')}
      </Button>
    </form>
  );
}
