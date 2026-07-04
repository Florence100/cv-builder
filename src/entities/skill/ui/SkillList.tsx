import type { SkillMastery } from 'cv-graphql';
import { SkillCard } from './SkillCard';

interface UserSkillsProps {
  userSkills: SkillMastery[];
  isOwner: boolean;
}

export function SkillList({ userSkills, isOwner }: UserSkillsProps) {
  return (
    <div className="mt-6 pl-2">
      {userSkills.length > 0 && (
        <div className="w-full grid grid-cols-2 gap-y-8 lg:grid-cols-3">
          {userSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} isSelectable={isOwner} />
          ))}
        </div>
      )}
    </div>
  );
}
