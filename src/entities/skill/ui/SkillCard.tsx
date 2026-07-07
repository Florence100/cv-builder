'use-client';

import type { SkillMastery } from 'cv-graphql';
import { Progress } from '@/src/shared/ui/progress';

interface SkillCardProps {
  skill: SkillMastery;
  isSelected?: boolean;
  isSelectable: boolean;
  clickHandler: (skillName: string) => void;
}

enum SkillProgress {
  Novice = 20,
  Advanced = 40,
  Competent = 60,
  Proficient = 80,
  Expert = 100,
}

export function SkillCard({ skill, isSelectable, isSelected, clickHandler }: SkillCardProps) {
  const skillName = skill.name;
  const skillMastery = skill.mastery;
  const progressValue = SkillProgress[skillMastery];

  return (
    <div
      onClick={() => clickHandler(skillName)}
      className={`w-70 p-2 rounded-full flex gap-4 items-center text-neutral-default ${isSelectable && 'cursor-pointer hover:bg-neutral-subtle'} ${isSelected && 'bg-neutral-subtle'}`}
    >
      <Progress value={progressValue} />
      {skillName}
    </div>
  );
}
