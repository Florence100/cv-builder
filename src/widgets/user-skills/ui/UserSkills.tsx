import type { SkillMastery, SkillCategory } from 'cv-graphql';
import { SkillList } from '@/src/entities/skill';
import { groupSkillsByRootCategory } from '@/src/entities/skill/index';

interface UserSkillsProps {
  userSkills: SkillMastery[];
  isOwner: boolean;
  categories: SkillCategory[];
}

export function UserSkills({ userSkills, isOwner, categories }: UserSkillsProps) {
  if (userSkills.length === 0) {
    return <p className="text-gray-500">No skills added yet.</p>;
  }

  const grouped = groupSkillsByRootCategory(categories, userSkills);

  return grouped.map((item) => (
    <div key={item.id} className="flex flex-col">
      <h3 className="mt-8">{item.name}</h3>
      <SkillList userSkills={item.skills} isOwner={isOwner} />
    </div>
  ));
}
