'use-client';

import type { SkillMastery } from 'cv-graphql';
import { Progress } from '@/src/shared/ui/progress';

interface SkillCardProps {
  skill: SkillMastery;
  isSelected?: boolean;
  isSelectable?: boolean;
  onClick?: () => void;
}

enum SkillProgress {
  Novice = 20,
  Advanced = 40,
  Competent = 60,
  Proficient = 80,
  Expert = 100,
}

export function SkillCard({ skill, isSelected, isSelectable, onClick }: SkillCardProps) {
  const skillName = skill.name;
  const skillMastery = skill.mastery;
  const progressValue = SkillProgress[skillMastery];

  return (
    <div
      className={`w-70 p-2 rounded-full flex gap-4 items-center text-neutral-default ${isSelectable && 'cursor-pointer hover:bg-neutral-subtle'}`}
    >
      <Progress value={progressValue} />
      {skillName}
    </div>
  );
}
