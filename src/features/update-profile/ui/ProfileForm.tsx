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
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useMutation } from '@apollo/client/react';
import { UPDATE_PROFILE, UPDATE_USER, UPLOAD_AVATAR } from '../api/mutations';
import { fileToBase64 } from '@/src/shared/lib/file-to-base64';
import { useRouter } from 'next/navigation';
import { GET_USER } from '@/src/entities/user/api/queries';
import { useState } from 'react';

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
  isOwner: boolean;
};

export const ProfileForm = ({ user, departments, positions, isOwner }: ProfileFormProps) => {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    resetField,
    reset,
    setValue,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      firstName: user?.profile?.first_name || '',
      lastName: user?.profile?.last_name || '',
      department: user?.department?.id || '',
      position: user?.position?.id || '',
      avatar: undefined,
    },
  });

  const serverFirstName = user?.profile?.first_name || '';
  const serverLastName = user?.profile?.last_name || '';
  const fullName = `${serverFirstName} ${serverLastName}`.trim() || 'User Name';
  const initial = fullName.charAt(0).toUpperCase();

  const avatarFiles = useWatch({
    control,
    name: 'avatar',
  });

  const previewUrl =
    avatarFiles && avatarFiles.length > 0 ? URL.createObjectURL(avatarFiles[0]) : null;
  const displayAvatarUrl = previewUrl || user?.profile?.avatar;
  const email = user?.email || 'email@example.com';

  let date = new Date().toDateString();
  if (user?.created_at) {
    const isTimestamp = /^\d+$/.test(user.created_at);
    const parsedDate = new Date(isTimestamp ? Number(user.created_at) : user.created_at);

    if (!isNaN(parsedDate.getTime())) {
      date = parsedDate.toDateString();
    }
  }

  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [updateUser] = useMutation(UPDATE_USER);
  const [uploadAvatar] = useMutation(UPLOAD_AVATAR, {
    refetchQueries: [GET_USER],
  });
  const isBusy = isSubmitting;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOwner) return;

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (!isOwner) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(e.dataTransfer.files[0]);
      setValue('avatar', dataTransfer.files, { shouldValidate: true, shouldDirty: true });
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user?.id) return;

    console.log('--- SUBMIT TRIGGERED ---');
    console.log('Entire Form Data:', data);

    try {
      await updateProfile({
        variables: {
          profile: {
            userId: user.id,
            first_name: data.firstName,
            last_name: data.lastName,
          },
        },
      });

      if (data.department || data.position) {
        await updateUser({
          variables: {
            user: {
              userId: user.id,
              ...(data.department ? { departmentId: data.department } : {}),
              ...(data.position ? { positionId: data.position } : {}),
            },
          },
        });
      }

      if (data.avatar && data.avatar.length > 0) {
        const file = data.avatar[0];
        const base64 = await fileToBase64(file);

        try {
          await uploadAvatar({
            variables: {
              avatar: {
                userId: user.id,
                base64,
                size: file.size,
                type: file.type,
              },
            },
          });
        } catch (avatarError) {
          console.error('Avatar Mutation FAILED:', avatarError);
        }
      }

      resetField('avatar');

      reset({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        department: data.department || '',
        position: data.position || '',
        avatar: undefined,
      });

      router.refresh();
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-dvh flex flex-col gap-8 items-center">
      <div className="flex gap-16 items-center justify-center">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative rounded-full transition-all duration-200 ${
            dragActive ? 'scale-105 ring-4 ring-primary ring-offset-4 ring-offset-background' : ''
          }`}
        >
          {/* [8] Wrapped the avatar image/placeholder in a label pointing to 'avatar-upload' so clicking it opens the file picker */}
          <label
            htmlFor={isOwner ? 'avatar-upload' : undefined}
            className={`block ${isOwner ? 'cursor-pointer hover:opacity-90' : ''}`}
          >
            {displayAvatarUrl ? (
              <Image
                src={displayAvatarUrl}
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
          </label>
        </div>

        {isOwner && (
          <div className="flex flex-col items-center text-center justify-center gap-1">
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer flex items-center gap-4 group hover:opacity-80 transition-opacity"
            >
              <Upload className="w-7 h-7 text-foreground" strokeWidth={2.5} />
              <span className="text-xl font-medium text-foreground">Upload avatar image</span>
            </label>
            <p className="text-muted-foreground">png, jpg or gif no more than 0.5MB</p>
            {errors.avatar && (
              <p className="text-destructive text-sm mt-1 font-medium">{errors.avatar.message}</p>
            )}
            <input
              id="avatar-upload"
              type="file"
              className="hidden"
              accept=".png, .jpg, .jpeg, .gif"
              {...register('avatar', {
                validate: {
                  lessThan500KB: (files) => {
                    if (!files || files.length === 0) return true;
                    return files[0].size <= 500 * 1024 || 'Maximum file size is 500 Kb';
                  },
                  acceptedFormats: (files) => {
                    if (!files || files.length === 0) return true;
                    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
                    return (
                      validTypes.includes(files[0].type) ||
                      'Supported file formats are png, jpg, jpeg and gif'
                    );
                  },
                },
              })}
            />
          </div>
        )}
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
              disabled={!isOwner}
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
              disabled={!isOwner}
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
                <Select onValueChange={field.onChange} value={field.value} disabled={!isOwner}>
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
                <Select onValueChange={field.onChange} value={field.value} disabled={!isOwner}>
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
          {isOwner && (
            <div className="lg:col-start-2">
              <Button
                type="submit"
                disabled={isBusy || !isDirty}
                className="w-full h-12 bg-primary disabled:opacity-100 disabled:bg-black/12 hover:opacity-90 text-primary-foreground disabled:text-black/26 font-medium tracking-wide rounded-full"
              >
                {isBusy ? 'UPDATING...' : 'UPDATE'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
