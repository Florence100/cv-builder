import { getUserSkills, getSkills } from '@/src/entities/skill/api/server';
import { getCategories } from '@/src/entities/categories';
import { UserSkills } from '@/src/widgets/user-skills';

type SkillsPageProps = {
  userId: string;
  loggedInUserId?: string;
};

export async function SkillsPage({ userId, loggedInUserId }: SkillsPageProps) {
  const isOwner = loggedInUserId === userId;

  const userSkills = (await getUserSkills(userId)) || [];
  const categories = (await getCategories()) || [];
  const skills = (await getSkills()) || [];
  const userSkillNames = userSkills.map((skill) => skill.name);
  const remainedSkills = skills.filter((skill) => !userSkillNames.includes(skill.name));

  return (
    <UserSkills
      userId={userId}
      userSkills={userSkills}
      isOwner={isOwner}
      categories={categories}
      skills={remainedSkills}
    />
  );
}
