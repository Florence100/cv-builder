import { getCvSkills, getSkills } from '@/src/entities/skill/api/server';
import { getCategories } from '@/src/entities/categories';
import { UserSkills } from '@/src/widgets/user-skills/ui/UserSkills';

type CvSkillsPageProps = {
  cvId: string;
  loggedInUserId?: string;
};

export const CvSkillsPage = async ({ cvId, loggedInUserId }: CvSkillsPageProps) => {
  const cvSkills = await getCvSkills(cvId);
  const categories = (await getCategories()) || [];
  const allSkills = (await getSkills()) || [];

  const userId = cvSkills?.user.id || '';
  const skills = cvSkills?.skills || [];
  const cvSkillNames = skills.map((skill) => skill.name);
  const remainedSkills = allSkills.filter((skill) => !cvSkillNames.includes(skill.name));
  const isOwner = loggedInUserId === userId;

  return (
    <UserSkills
      userId={userId}
      userSkills={skills}
      isOwner={isOwner}
      categories={categories}
      skills={remainedSkills}
      cvId={cvId}
      mood="CvPage"
    />
  );
};
