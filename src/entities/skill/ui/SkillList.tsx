import type { SkillMastery } from 'cv-graphql';
import { SkillCard } from './SkillCard';
import { SetStateAction, Dispatch } from 'react';

interface UserSkillsProps {
  userSkills: SkillMastery[];
  isOwner: boolean;
  isDeletedMode: boolean;
  selectedSkills: string[];
  setSelectedSkills: Dispatch<SetStateAction<string[]>>;
}

export function SkillList({
  userSkills,
  isOwner,
  isDeletedMode,
  selectedSkills,
  setSelectedSkills,
}: UserSkillsProps) {
  const clickHandler = (skillName: string) => {
    if (isDeletedMode) {
      setSelectedSkills((prev) =>
        prev.includes(skillName) ? prev.filter((name) => name !== skillName) : [...prev, skillName]
      );
    } else {
    }
  };

  return (
    <div className="mt-6 pl-2">
      {userSkills.length > 0 && (
        <div className="w-full grid grid-cols-2 gap-y-8 lg:grid-cols-3">
          {userSkills.map((skill) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              isSelectable={isOwner}
              clickHandler={clickHandler}
              isSelected={selectedSkills.includes(skill.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
