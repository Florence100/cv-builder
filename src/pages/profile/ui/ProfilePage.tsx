'use client';

import { GET_DEPARTMENTS, GET_POSITIONS, GET_USER } from '@/src/entities/user/api/queries';
import { ProfileForm } from '@/src/features/update-profile';
import { useQuery } from '@apollo/client/react';
import { useTranslations } from 'next-intl';

type ProfilePageProps = {
  userId: string;
  loggedInUserId?: string;
};

export const ProfilePage = ({ userId, loggedInUserId }: ProfilePageProps) => {
  const t = useTranslations('pages.profile');

  const { data: userData, loading: loadingUser } = useQuery(GET_USER, {
    variables: { userId },
    fetchPolicy: 'cache-and-network',
  });
  const { data: deptData, loading: loadingDepts } = useQuery(GET_DEPARTMENTS);
  const { data: posData, loading: loadingPos } = useQuery(GET_POSITIONS);

  if (loadingUser || loadingDepts || loadingPos) {
    return <div className="flex justify-center items-center min-h-dvh">{t('loading')}</div>;
  }
  const departments = deptData?.departments || [];
  const positions = posData?.positions || [];
  const user = userData?.user || null;

  const isOwner = loggedInUserId === userId;

  return (
    <ProfileForm
      user={user || null}
      departments={departments}
      positions={positions}
      isOwner={isOwner}
    />
  );
};
