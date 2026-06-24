'use client';

import { Button } from '@/src/shared/ui/button';
import { FloatingInput } from '@/src/shared/ui/floating-input';
import { PasswordInput } from '@/src/shared/ui/password-input';
import { useTranslations } from 'next-intl';
import { SubmitEvent, useState } from 'react';
import { useSignup } from '../api/signup';
import { accessTokenVar } from '@/src/entities/session/model/session';
import { useRouter } from 'next/navigation';

export const SignupForm = () => {
  const t = useTranslations('features.registerByEmail');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signup, { data, error, loading }] = useSignup();

  const router = useRouter();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const response = await signup({ variables: { auth: { email: email, password: password } } });

    setEmail('');
    setPassword('');

    const accessToken = response.data?.signup.access_token;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      accessTokenVar(response.data?.signup.access_token);
      router.replace('/users');
      console.log(accessTokenVar());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 items-center">
      <FloatingInput
        type="email"
        label={t('emailPlaceholder')}
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        label={t('passwordPlaceholder')}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        disabled={loading}
        className="w-55 h-12 rounded-full uppercase text-sm mt-10 shadow-sm hover:bg-btn-hovered cursor-pointer"
      >
        {t('submitButton')}
      </Button>
    </form>
  );
};
