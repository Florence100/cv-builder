'use client';

import type { SkillMastery, SkillCategory, Skill } from 'cv-graphql';
import { SkillList } from '@/src/entities/skill/ui/SkillList';
import { groupSkillsByRootCategory } from '@/src/entities/skill/index';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/dialog';
import { useState } from 'react';
import { RemoveButton } from '@/src/shared/ui/removeButton';
import { AddButton } from '@/src/shared/ui/addButton';
import { Button } from '@/src/shared/ui/button';
import { AddSkillForm } from '@/src/features/add-skill/ui/AddSkillForm';
import { useDeleteProfileSkill } from '@/src/features/remove-skill';
import { useDeleteCvSkill } from '@/src/features/remove-skill';
import { useRouter } from 'next/navigation';
import { SkillsPageMood } from '@/src/shared/types/index';

interface UserSkillsProps {
  userSkills: SkillMastery[];
  skills: Skill[];
  isOwner: boolean;
  categories: SkillCategory[];
  userId: string;
  mood?: SkillsPageMood;
  cvId?: string;
}

export function UserSkills({
  userId,
  userSkills,
  isOwner,
  categories,
  skills,
  mood = 'ProfilePage',
  cvId,
}: UserSkillsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeletedMode, setIsDeletedMode] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [deleteProfileSkill, { loading: deleteProfileSkillLoading }] = useDeleteProfileSkill();
  const [deleteCvSkill, { loading: deleteCvSkillLoading }] = useDeleteCvSkill();
  const router = useRouter();

  const toggleSelectedSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName) ? prev.filter((name) => name !== skillName) : [...prev, skillName]
    );
  };

  const tUI = useTranslations('shared.ui');
  const t = useTranslations('widgets.userSkills');

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const deleteHandler = async () => {
    if (selectedSkills.length === 0) {
      setIsDeletedMode(true);
    } else {
      try {
        if (mood === 'ProfilePage') {
          await deleteProfileSkill({
            variables: {
              skill: {
                userId: userId,
                name: selectedSkills,
              },
            },
          });
        } else if (mood === 'CvPage' && cvId) {
          await deleteCvSkill({
            variables: {
              skill: {
                cvId: cvId,
                name: selectedSkills,
              },
            },
          });
        }

        setSelectedSkills([]);
        router.refresh();
      } catch (e) {
        console.error(e);
      } finally {
        setIsDeletedMode(false);
      }
    }
  };

  const grouped = groupSkillsByRootCategory(categories, userSkills);

  return (
    <div>
      {userSkills.length === 0 && <p className="text-gray-500">{t('noSkills')}</p>}

      {grouped.map((item) => (
        <div key={item.id} className="flex flex-col">
          <h3 className="mt-8">{item.name}</h3>
          <SkillList
            userId={userId}
            userSkills={item.skills}
            isOwner={isOwner}
            isDeletedMode={isDeletedMode}
            selectedSkills={selectedSkills}
            toggleSelectedSkill={toggleSelectedSkill}
            mood={mood}
            cvId={cvId}
          />
        </div>
      ))}

      {isOwner && !isDeletedMode && (
        <div className="mt-10 flex gap-6 justify-end">
          <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <div>
                <AddButton value={tUI('addBtn.skill')} />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-125 p-4 bg-background rounded-sm border-none text-foreground shadow-xl overflow-hidden">
              <DialogHeader>
                <DialogTitle className="text-lg font-normal tracking-wide text-foreground">
                  {t('dialog.title')}
                </DialogTitle>
                <AddSkillForm userId={userId} skills={skills} mood={mood} cvId={cvId} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <RemoveButton value={tUI('removeBtn.skill')} onClick={deleteHandler} />
        </div>
      )}

      {isDeletedMode && (
        <div className="mt-10 flex gap-6 justify-end">
          <div className="flex items-center gap-4 animate-in fade-in zoom-in-95 duration-200">
            <Button
              variant="outline"
              disabled={deleteProfileSkillLoading || deleteCvSkillLoading}
              onClick={() => {
                setIsDeletedMode(false);
                setSelectedSkills([]);
              }}
              className="rounded-full px-10 h-10 bg-transparent border-border hover:border-border-hovered text-muted-foreground hover:bg-gray-150 font-medium tracking-wide uppercase text-sm"
            >
              {t('closeBtn')}
            </Button>

            <Button
              onClick={deleteHandler}
              disabled={
                selectedSkills.length === 0 || deleteProfileSkillLoading || deleteCvSkillLoading
              }
              className="rounded-full px-10 h-10 bg-primary hover:bg-primary/80 text-white border-none font-medium tracking-wide uppercase text-sm"
            >
              {deleteProfileSkillLoading || deleteCvSkillLoading
                ? `${'deleteProcessBtn'}`
                : `${'deleteBtn'}`}
              {selectedSkills.length > 0 && (
                <span className="flex items-center justify-center w-5 h-5 ml-1 bg-white text-primary rounded-full text-xs font-bold">
                  {selectedSkills.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
