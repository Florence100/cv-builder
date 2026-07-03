import { getSkills } from '@/src/entities/skill';
import { getCategories } from '@/src/entities/categories';
import { UserSkills } from '@/src/widgets/user-skills';

type SkillsPageProps = {
  userId: string;
  loggedInUserId?: string;
};

export async function SkillsPage({ userId, loggedInUserId }: SkillsPageProps) {
  const userSkills = (await getSkills(userId)) || [];
  const categories = (await getCategories()) || [];
  const isOwner = loggedInUserId === userId;

  return <UserSkills userSkills={userSkills} isOwner={isOwner} categories={categories} />;
}
