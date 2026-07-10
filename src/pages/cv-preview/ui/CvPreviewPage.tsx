import { getCategories } from '@/src/entities/categories';
import { fetchCv } from '@/src/entities/cv/api/server';
import { groupSkillsByRootCategory } from '@/src/entities/skill';
import { getSkills } from '@/src/entities/skill/api/server';

import { getTranslations } from 'next-intl/server';
import { formatSkillsForTable } from '../lib/formatSkillsForTable';
import { CvPreviewWidget } from '@/src/widgets/cv-preview-widget';

export const CvPreviewPage = async ({ cvId }: { cvId: string }) => {
  const cv = await fetchCv(cvId);
  const t = await getTranslations('pages.cvDetails');

  if (!cv) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>{t('noCv')}</p>
      </div>
    );
  }

  const profile = cv.user?.profile;
  const cvSkills = cv?.skills || [];
  const skills = (await getSkills()) || [];
  const categories = (await getCategories()) || [];

  const cvData = {
    fullName:
      profile?.full_name ||
      [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') ||
      'User Name',
    position: cv.user?.position_name || 'Position',
    education: cv.education || '',
    languages: cv.languages || [],
    projects: cv.projects || [],
    cvName: cv.name || 'CV Name',
    cvDescription: cv.description || 'Your CV description',
    cvSkillGroups: groupSkillsByRootCategory(categories, cvSkills),
    tableSKillGroups: formatSkillsForTable(skills, cv.projects || []),
  };

  return <CvPreviewWidget cvData={cvData} />;
};
