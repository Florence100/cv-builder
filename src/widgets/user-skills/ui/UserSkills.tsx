'use client';

import type { SkillMastery, SkillCategory, Skill } from 'cv-graphql';
import { SkillList } from '@/src/entities/skill';
import { groupSkillsByRootCategory } from '@/src/entities/skill/index';
import { useTranslations } from 'next-intl';
import { AddButton } from '@/src/shared/ui/addButton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/dialog';
import { useState } from 'react';
import { RemoveButton } from '@/src/shared/ui/removeButton';
import { AddSkillForm } from '@/src/features/add-skill/ui/AddSkillForm';

interface UserSkillsProps {
  userSkills: SkillMastery[];
  skills: Skill[];
  isOwner: boolean;
  categories: SkillCategory[];
  userId: string;
}

export function UserSkills({ userId, userSkills, isOwner, categories, skills }: UserSkillsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tUI = useTranslations('shared.ui');
  const t = useTranslations('widgets.userSkills');

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const grouped = groupSkillsByRootCategory(categories, userSkills);

  return (
    <div>
      {userSkills.length === 0 && <p className="text-gray-500">No skills added yet.</p>}

      {grouped.map((item) => (
        <div key={item.id} className="flex flex-col">
          <h3 className="mt-8">{item.name}</h3>
          <SkillList userSkills={item.skills} isOwner={isOwner} />
        </div>
      ))}

      {isOwner && (
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
                <AddSkillForm userId={userId} skills={skills} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <RemoveButton value={tUI('removeBtn.skill')} />
        </div>
      )}
    </div>
  );
}
