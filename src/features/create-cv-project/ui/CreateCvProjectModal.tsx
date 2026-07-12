'use client';

import { Button } from '@/src/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/dialog';
import { Label } from '@/src/shared/ui/label';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/src/shared/ui/input';
import { Textarea } from '@/src/shared/ui/textarea';
import { CreateButton } from '@/src/shared/ui/create-button';
import { useAddCvProject } from '../api/mutations';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/shared/ui/popover';
import { Calendar } from '@/src/shared/ui/calendar';
import { MultiSelect } from '@/src/shared/ui/multiSelect';
import type { Project, Skill } from 'cv-graphql';
import { format } from 'date-fns';
import { Controller } from 'react-hook-form';

interface CreateCvProjectFormValues {
  name: string;
  domain: string;
  start_date: string;
  end_date: string;
  description: string;
  environment: string[];
  responsibilities: string;
}

interface CreateCvProjectModalProps {
  projectList: Project[];
  skills: Skill[];
  cvId: string;
}

export const CreateCvProjectModal = ({ projectList, skills, cvId }: CreateCvProjectModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations('features.createCvProject');
  const router = useRouter();
  const [addCvProject] = useAddCvProject();

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<CreateCvProjectFormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      domain: '',
      start_date: '',
      end_date: '',
      description: '',
      environment: [],
      responsibilities: '',
    },
  });

  const clearForm = () => {
    reset({
      name: '',
      domain: '',
      start_date: '',
      end_date: '',
      description: '',
      environment: [],
      responsibilities: '',
    });
  };

  const onSubmit = async (data: CreateCvProjectFormValues) => {
    const responsibilities = data.responsibilities
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      cvId: cvId,
      projectId: data.name,
      start_date: data.start_date,
      end_date: data.end_date || undefined,
      roles: [],
      responsibilities: responsibilities,
    };

    if (!data.end_date) {
      delete payload.end_date;
    }

    try {
      await addCvProject({
        variables: {
          project: payload,
        },
      });
      router.refresh();
      clearForm();
      setIsOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      clearForm();
    }
  };

  const projectItems = projectList.map((project) => {
    return { label: project.name, value: project.id };
  });

  const technologyItems = skills.map((skill) => {
    return { label: skill.name, value: skill.name };
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="w-55">
          <CreateButton value={t('createButton').toUpperCase()} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125 md:max-w-200 py-4 px-6 bg-background rounded-sm border-none text-foreground shadow-xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal tracking-wide text-foreground">
            {t('header')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="py-2 flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="relative w-[50%]">
              <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
                {t('modal.inputLabels.project')}
              </Label>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: t('modal.errors.projectRequired'),
                }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);

                      const project = projectList.find((p) => p.id === value);

                      if (!project) return;

                      reset({
                        name: project.id,
                        domain: project.domain,
                        start_date: project.start_date,
                        end_date: project.end_date ?? '',
                        description: project.description,
                        environment: project.environment,
                        responsibilities: '',
                      });
                    }}
                  >
                    <SelectTrigger className="h-12 w-full bg-background border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectGroup>
                        {projectItems.map((item) => (
                          <SelectItem
                            key={item.value}
                            value={item.value}
                            className="bg-background focus:bg-select-item"
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.name && <p className="mt-1 text-sm text-primary">{errors.name.message}</p>}
            </div>

            <div className="relative w-[50%]">
              <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
                {t('modal.inputLabels.domain')}
              </Label>
              <Input
                type="text"
                disabled
                {...register('domain')}
                className="h-12 bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="relative w-[50%]">
              <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
                {t('modal.inputLabels.startDate')}
              </Label>
              <Controller
                control={control}
                name="start_date"
                rules={{
                  required: t('modal.errors.startDateRequired'),
                  validate: (value) => {
                    const end = getValues('end_date');

                    if (!end) return true;

                    return new Date(value) <= new Date(end) || t('modal.errors.dateError');
                  },
                }}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Input
                        className="h-12"
                        readOnly
                        value={field.value ? format(new Date(field.value), 'dd/MM/yyyy') : ''}
                      />
                    </PopoverTrigger>

                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                          field.onChange(date?.toISOString() ?? '');
                        }}
                      />
                    </PopoverContent>

                    {errors.start_date && (
                      <p className="mt-1 text-sm text-primary">{errors.start_date.message}</p>
                    )}
                  </Popover>
                )}
              />
            </div>
            <div className="relative w-[50%]">
              <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
                {t('modal.inputLabels.endDate')}
              </Label>
              <Controller
                control={control}
                name="end_date"
                rules={{
                  validate: (value) => {
                    const start = getValues('start_date');

                    if (!value) return true;

                    return new Date(value) >= new Date(start) || t('modal.errors.dateError');
                  },
                }}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Input
                        className="h-12"
                        readOnly
                        value={field.value ? format(new Date(field.value), 'dd/MM/yyyy') : ''}
                      />
                    </PopoverTrigger>

                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                          field.onChange(date?.toISOString() ?? '');
                        }}
                      />
                    </PopoverContent>
                    {errors.end_date && (
                      <p className="mt-1 text-sm text-primary">{errors.end_date.message}</p>
                    )}
                  </Popover>
                )}
              />
            </div>
          </div>

          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
              {t('modal.inputLabels.description')}
            </Label>
            <div className="h-40 p-3 bg-transparent border border-border rounded-none focus-within:border-border-focused hover:border-border-hovered transition-colors">
              <Textarea
                disabled
                id="description-textarea"
                {...register('description')}
                placeholder=""
                className="h-full w-full p-0 border-none bg-transparent outline-none rounded-none resize-none focus-visible:ring-0 focus-visible:border-transparent scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              />
            </div>
          </div>

          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
              {t('modal.inputLabels.environment')}
            </Label>
            <Controller
              control={control}
              name="environment"
              render={({ field }) => (
                <MultiSelect
                  options={technologyItems}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
              {t('modal.inputLabels.responsibilities')}
            </Label>
            <Input
              type="text"
              {...register('responsibilities', {
                required: t('modal.errors.responsibilitiesRequired'),
              })}
              placeholder="Develop UI components, Optimize performance, Write unit tests"
              className="h-12 bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused"
            />
          </div>

          <div className="flex justify-center sm:justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="rounded-full px-10 h-10 bg-transparent border-border hover:border-border-hovered text-muted-foreground hover:bg-gray-150 font-medium tracking-wide uppercase text-sm"
            >
              {t('modal.cancelButton')}
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="rounded-full px-10 h-10 bg-primary hover:bg-primary/80 text-white border-none font-medium tracking-wide uppercase text-sm"
            >
              {t('modal.confirmButton')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
