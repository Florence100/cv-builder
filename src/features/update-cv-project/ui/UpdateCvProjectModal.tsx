'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import type { CvProject, Skill, Project } from 'cv-graphql';
import { Button } from '@/src/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/src/shared/ui/dialog';
import { Input } from '@/src/shared/ui/input';
import { Label } from '@/src/shared/ui/label';
import { Textarea } from '@/src/shared/ui/textarea';
import { MultiSelect } from '@/src/shared/ui/multiSelect';
import { useUpdateCvProject } from '../api/mutations';
import { useRouter } from 'next/navigation';

interface UpdateCvProjectFormValues {
  responsibilities: string;
}

interface UpdateCvProjectModalProps {
  open: boolean;
  project: CvProject | null;
  skills: Skill[];
  cvId: string;
  projectList: Project[];
  onOpenChange(open: boolean): void;
}

export const UpdateCvProjectModal = ({
  open,
  project,
  projectList,
  skills,
  cvId,
  onOpenChange,
}: UpdateCvProjectModalProps) => {
  const t = useTranslations('features.updateCvProject');
  const [updateCvProject] = useUpdateCvProject();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<UpdateCvProjectFormValues>({
    mode: 'onChange',
    defaultValues: {
      responsibilities: '',
    },
  });

  useEffect(() => {
    if (!project) {
      reset({ responsibilities: '' });
      return;
    }

    reset({
      responsibilities: project.responsibilities.join(', '),
    });
  }, [project, reset]);

  const technologyItems = skills.map((skill) => ({
    label: skill.name,
    value: skill.name,
  }));

  const onSubmit = async (data: UpdateCvProjectFormValues) => {
    if (!project) return;

    const curProject = projectList.filter((item) => item.name === project.name)[0];

    const responsibilities = data.responsibilities
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      cvId: cvId,
      projectId: curProject.id,
      start_date: project.start_date,
      end_date: project.end_date || undefined,
      roles: [],
      responsibilities: responsibilities,
    };

    if (!project.end_date) {
      delete payload.end_date;
    }

    try {
      await updateCvProject({
        variables: {
          project: payload,
        },
      });
      router.refresh();
      onOpenChange(false);
    } catch (e) {
      console.error(e);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125 md:max-w-200 py-4 px-6 bg-background rounded-sm border-none text-foreground shadow-xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal tracking-wide text-foreground">
            {t('header')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="py-2 flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="relative w-1/2">
              <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
                {t('modal.inputLabels.project')}
              </Label>

              <Input
                className="h-12 bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused"
                disabled
                value={project?.name ?? ''}
              />
            </div>

            <div className="relative w-1/2">
              <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
                {t('modal.inputLabels.domain')}
              </Label>

              <Input
                className="h-12 bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused"
                disabled
                value={project?.domain ?? ''}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="relative w-1/2">
              <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
                {t('modal.inputLabels.startDate')}
              </Label>

              <Input
                className="h-12 bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused"
                disabled
                value={
                  project?.start_date ? format(new Date(project.start_date), 'dd/MM/yyyy') : ''
                }
              />
            </div>

            <div className="relative w-1/2">
              <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
                {t('modal.inputLabels.endDate')}
              </Label>

              <Input
                className="h-12 bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused"
                disabled
                value={project?.end_date ? format(new Date(project.end_date), 'dd/MM/yyyy') : ''}
              />
            </div>
          </div>

          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
              {t('modal.inputLabels.description')}
            </Label>

            <div className="h-40 p-3 border">
              <Textarea
                disabled
                value={project?.description ?? ''}
                className="h-full resize-none border-none shadow-none focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
              {t('modal.inputLabels.environment')}
            </Label>

            <MultiSelect
              options={technologyItems}
              value={project?.environment ?? []}
              onChange={() => {}}
            />
          </div>

          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
              {t('modal.inputLabels.responsibilities')}
            </Label>

            <Input
              {...register('responsibilities', {
                required: t('modal.errors.responsibilitiesRequired'),
              })}
              placeholder="Develop UI components, Optimize performance, Write unit tests"
              className="h-12 bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused"
            />

            {errors.responsibilities && (
              <p className="mt-1 text-sm text-primary">{errors.responsibilities.message}</p>
            )}
          </div>

          <div className="flex justify-center sm:justify-end gap-4">
            <Button
              className="rounded-full px-10 h-10 bg-transparent border-border hover:border-border-hovered text-muted-foreground hover:bg-gray-150 font-medium tracking-wide uppercase text-sm"
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t('modal.cancelButton')}
            </Button>

            <Button
              className="rounded-full px-10 h-10 bg-primary hover:bg-primary/80 text-white border-none font-medium tracking-wide uppercase text-sm"
              type="submit"
              disabled={!isValid}
            >
              {t('modal.confirmButton')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
