'use client';

import { Input } from '@/src/shared/ui/input';
import { Label } from '@/src/shared/ui/label';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/ui/select';
import { Button } from '@/src/shared/ui/button';
import { Department, Position, User } from 'cv-graphql';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client/react';
import { UPDATE_PROFILE, UPDATE_USER, UPLOAD_AVATAR } from '../api/mutations';
import { useRouter } from 'next/navigation';
import { fileToBase64 } from '@/src/shared/lib/file-to-base64';
import { useTransition } from 'react';

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  avatar?: FileList;
};

type ProfileFormProps = {
  user: User | null;
  departments: Department[];
  positions: Position[];
};

export const ProfileForm = ({ user, departments, positions }: ProfileFormProps) => {
  const avatarUrl = user?.profile?.avatar;
  const fullName = user?.profile?.full_name || 'User Name';
  const email = user?.email || 'email@example.com';
  const initial = fullName.charAt(0).toUpperCase();

  let date = new Date().toDateString();
  if (user?.created_at) {
    const isTimestamp = /^\d+$/.test(user.created_at);
    const parsedDate = new Date(isTimestamp ? Number(user.created_at) : user.created_at);

    if (!isNaN(parsedDate.getTime())) {
      date = parsedDate.toDateString();
    }
  }

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { isSubmitting, isDirty },
  } = useForm<ProfileFormValues>({
    values: {
      firstName: user?.profile?.first_name || '',
      lastName: user?.profile?.last_name || '',
      department: user?.department?.id || '',
      position: user?.position?.id || '',
    },
  });

  const [updateProfile, { loading: loadingProfile }] = useMutation(UPDATE_PROFILE);
  const [updateUser, { loading: loadingUser }] = useMutation(UPDATE_USER);
  const [uploadAvatar, { loading: loadingAvatar }] = useMutation(UPLOAD_AVATAR);

  const isBusy = isSubmitting || loadingProfile || loadingUser || loadingAvatar || isPending;
  const router = useRouter();

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user?.id) return;

    try {
      const promises = [];

      promises.push(
        updateProfile({
          variables: {
            profile: {
              userId: user.id,
              first_name: data.firstName,
              last_name: data.lastName,
            },
          },
        })
      );

      if (data.department || data.position) {
        promises.push(
          updateUser({
            variables: {
              user: {
                userId: user.id,
                ...(data.department ? { departmentId: data.department } : {}),
                ...(data.position ? { positionId: data.position } : {}),
              },
            },
          })
        );
      }

      if (data.avatar && data.avatar.length > 0) {
        const file = data.avatar[0];
        const base64 = await fileToBase64(file);

        promises.push(
          uploadAvatar({
            variables: {
              avatar: {
                userId: user.id,
                base64,
                size: file.size,
                type: file.type,
              },
            },
          })
        );
      }

      await Promise.all(promises);

      startTransition(() => {
        router.refresh();
      });

      if (data.avatar && data.avatar.length > 0) {
        resetField('avatar');
      }

      router.refresh();
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-dvh flex flex-col gap-8 items-center">
      <div className="flex gap-16 items-center justify-center">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={120}
            height={120}
            className="rounded-full h-30 w-30 object-cover"
          />
        ) : (
          <div className="flex rounded-full w-30 h-30 bg-table-avatar text-background items-center justify-center text-4xl font-normal">
            {initial}
          </div>
        )}

        <div className="flex flex-col items-center text-center justify-center gap-1">
          <label className="cursor-pointer flex items-center gap-4 group hover:opacity-80 transition-opacity">
            <Upload className="w-7 h-7 text-foreground" strokeWidth={2.5} />
            <span className="text-xl font-medium text-foreground">Upload avatar image</span>
            <input
              type="file"
              className="hidden"
              accept=".png, .jpg, .gif"
              {...register('avatar')}
            />
          </label>
          <p className="text-muted-foreground">png, jpg or gif no more than 0.5MB</p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl text-foreground font-normal">{fullName}</h2>
        <p className="text-muted-foreground mt-2">{email}</p>
        <p className="text-foreground">{`A member since ${date}`}</p>
      </div>

      <div className="w-full max-w-3xl pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-9">
          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
              First Name
            </Label>
            <Input
              type="text"
              className="h-12 bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused"
              {...register('firstName')}
            />
          </div>
          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
              Last Name
            </Label>
            <Input
              type="text"
              className="h-12 bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused"
              {...register('lastName')}
            />
          </div>
          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
              Department
            </Label>
            <Controller
              control={control}
              name="department"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-12 w-full bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
              Position
            </Label>
            <Controller
              control={control}
              name="position"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-12 w-full bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((pos) => (
                      <SelectItem key={pos.id} value={pos.id}>
                        {pos.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="lg:col-start-2">
            <Button
              type="submit"
              disabled={isBusy || !isDirty}
              className="w-full h-12 bg-primary disabled:opacity-100 disabled:bg-black/12 hover:opacity-90 text-primary-foreground disabled:text-black/26 font-medium tracking-wide rounded-full"
            >
              {isBusy ? 'UPDATING...' : 'UPDATE'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
