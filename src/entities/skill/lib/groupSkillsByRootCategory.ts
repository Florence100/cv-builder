import type { SkillCategory, SkillMastery } from 'cv-graphql';

export interface GroupedCategory {
  id: string;
  name: string;
  order: number;
  skills: SkillMastery[];
}

export function groupSkillsByRootCategory(
  categories: SkillCategory[],
  skills: SkillMastery[]
): GroupedCategory[] {
  const categoryMap = new Map<string, SkillCategory>();
  categories.forEach((cat) => categoryMap.set(cat.id, cat));

  const findRootCategory = (categoryId?: string | null): SkillCategory | null => {
    if (!categoryId) return null;

    let current = categoryMap.get(categoryId);

    while (current && current.parent) {
      current = categoryMap.get(current.parent.id);
    }

    return current || null;
  };

  const groups = new Map<string, GroupedCategory>();

  skills.forEach((skill) => {
    const rootCat = findRootCategory(skill?.categoryId);

    if (!rootCat) return;

    if (!groups.has(rootCat.id)) {
      groups.set(rootCat.id, {
        id: rootCat.id,
        name: rootCat.name,
        order: rootCat.order,
        skills: [],
      });
    }

    groups.get(rootCat.id)!.skills.push(skill);
  });

  return Array.from(groups.values()).sort((a, b) => a.order - b.order);
}
