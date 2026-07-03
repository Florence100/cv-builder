import { useLazyQuery } from '@apollo/client/react';
import { SKILLS_QUERY, SkillsArgs, SkillsResult } from './queries';

export const useSkills = () => {
  return useLazyQuery<SkillsResult, SkillsArgs>(SKILLS_QUERY);
};
