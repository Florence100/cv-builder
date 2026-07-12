import { getCategories } from '@/src/entities/categories';
import { fetchCv } from '@/src/entities/cv/api/server';
import { groupSkillsByRootCategory } from '@/src/entities/skill';
import { getSkills } from '@/src/entities/skill/api/server';
import { formatSkillsForTable } from '../lib/formatSkillsForTable';
import { CvPreviewWidget } from '@/src/widgets/cv-preview-widget';
import { getTranslations } from 'next-intl/server';

export const CvPreviewPage = async ({ cvId }: { cvId: string }) => {
  const t = await getTranslations('pages.cvPreview');
  const cv = await fetchCv(cvId);

  if (!cv) {
    throw new Error(`Failed to load CV for ID: ${cvId}`);
  }

  const profile = cv.user?.profile;
  const cvSkills = cv?.skills || [];
  const skills = (await getSkills()) || [];
  const categories = (await getCategories()) || [];

  const cvData = {
    fullName:
      profile?.full_name ||
      [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') ||
      t('userNamePlaceholder'),
    position: cv.user?.position_name || t('position'),
    education: cv.education || '',
    languages: cv.languages || [],
    projects: cv.projects || [],
    cvName: cv.name || t('cvName'),
    cvDescription: cv.description || t('cvDescription'),
    cvSkillGroups: groupSkillsByRootCategory(categories, cvSkills),
    tableSKillGroups: formatSkillsForTable(skills, cv.projects || []),
  };

  return <CvPreviewWidget cvData={cvData} />;
};
