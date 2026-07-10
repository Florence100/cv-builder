import { CvProject, Skill } from 'cv-graphql';

export interface FormattedSkill {
  id: string;
  name: string;
  experienceInYears: number;
  lastUsed: number;
}

export function formatSkillsForTable(skills: Skill[], projects: CvProject[]) {
  const skillMetrics: Record<string, { totalYears: number; lastUsedYear: number }> = {};

  projects.forEach((project) => {
    const startDate = new Date(project.start_date);
    const endDate = project.end_date ? new Date(project.end_date) : new Date();

    const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
    const durationInYears = (endDate.getTime() - startDate.getTime()) / msPerYear;

    const endYear = endDate.getFullYear();

    project.environment.forEach((skillName) => {
      if (!skillMetrics[skillName]) {
        skillMetrics[skillName] = { totalYears: 0, lastUsedYear: 0 };
      }

      skillMetrics[skillName].totalYears += durationInYears;
      skillMetrics[skillName].lastUsedYear = Math.max(
        skillMetrics[skillName].lastUsedYear,
        endYear
      );
    });
  });

  const groupedCategories: Record<string, FormattedSkill[]> = {};

  skills.forEach((skill) => {
    const metrics = skillMetrics[skill.name];

    if (!metrics) return;

    const safeCategoryName = skill.category_name || 'Uncategorized';

    if (!groupedCategories[safeCategoryName]) {
      groupedCategories[safeCategoryName] = [];
    }

    groupedCategories[safeCategoryName].push({
      id: skill.id,
      name: skill.name,
      experienceInYears: Math.max(1, Math.round(metrics.totalYears)),
      lastUsed: metrics.lastUsedYear,
    });
  });

  return Object.entries(groupedCategories).map(([categoryName, skillsList]) => ({
    categoryName,
    skills: skillsList,
  }));
}
