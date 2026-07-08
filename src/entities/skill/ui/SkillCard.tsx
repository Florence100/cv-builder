'use client';

import type { SkillMastery } from 'cv-graphql';
import { Progress } from '@/src/shared/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/src/shared/ui/dialog';
import { UpdateSkillForm } from '@/src/features/update-skill/ui/UpdateSkillForm';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SkillsPageMood } from '@/src/shared/types/index';

interface SkillCardProps {
  userId: string;
  skill: SkillMastery;
  isSelected?: boolean;
  isSelectable: boolean;
  isDeletedMode: boolean;
  mood?: SkillsPageMood;
  cvId?: string;
  clickHandler(skill: SkillMastery): void;
}

enum SkillProgress {
  Novice = 20,
  Advanced = 40,
  Competent = 60,
  Proficient = 80,
  Expert = 100,
}

export function SkillCard({
  userId,
  skill,
  isSelectable,
  isSelected,
  isDeletedMode,
  mood = 'ProfilePage',
  cvId,
  clickHandler,
}: SkillCardProps) {
  const t = useTranslations('entities.skill.skillCard');
  const [isUpdatedMode, setIsUpdatedMode] = useState(false);

  const skillName = skill.name;
  const skillMastery = skill.mastery;
  const progressValue = SkillProgress[skillMastery];

  const skillClickHandler = () => {
    if (isDeletedMode) {
      clickHandler(skill);
    } else {
      setIsUpdatedMode(true);
    }
  };

  return (
    <div>
      <div
        onClick={skillClickHandler}
        className={`w-70 p-2 rounded-full flex gap-4 items-center text-neutral-default ${isSelectable && 'cursor-pointer hover:bg-neutral-subtle'} ${isSelected && 'bg-neutral-subtle'}`}
      >
        <Progress value={progressValue} />
        {skillName}
      </div>
      <Dialog open={isUpdatedMode} onOpenChange={setIsUpdatedMode}>
        <DialogContent className="sm:max-w-125 p-4 bg-background rounded-sm border-none text-foreground shadow-xl overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-lg font-normal tracking-wide text-foreground">
              {t('dialog.title')}
            </DialogTitle>
            <UpdateSkillForm
              userId={userId}
              skill={skill}
              setIsUpdatedMode={setIsUpdatedMode}
              mood={mood}
              cvId={cvId}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
