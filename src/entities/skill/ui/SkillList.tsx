import type { SkillMastery } from 'cv-graphql';
import { SkillCard } from './SkillCard';

interface UserSkillsProps {
  userId: string;
  userSkills: SkillMastery[];
  isOwner: boolean;
  isDeletedMode: boolean;
  selectedSkills: string[];
  toggleSelectedSkill(skillName: string): void;
}

export function SkillList({
  userSkills,
  isOwner,
  isDeletedMode,
  selectedSkills,
  toggleSelectedSkill,
  userId,
}: UserSkillsProps) {
  const clickHandler = (skill: SkillMastery) => {
    if (isDeletedMode) {
      toggleSelectedSkill(skill.name);
    }
  };

  return (
    <div className="mt-6 pl-2">
      {userSkills.length > 0 && (
        <div className="w-full grid grid-cols-2 gap-y-8 lg:grid-cols-3">
          {userSkills.map((skill) => (
            <SkillCard
              userId={userId}
              key={skill.name}
              skill={skill}
              isSelectable={isOwner}
              clickHandler={clickHandler}
              isSelected={selectedSkills.includes(skill.name)}
              isDeletedMode={isDeletedMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}
