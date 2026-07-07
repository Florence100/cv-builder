import { useLazyQuery } from '@apollo/client/react';
import {
  USER_SKILLS_QUERY,
  SKILLS_QUERY,
  UserSkillsArgs,
  UserSkillsResult,
  SkillsResult,
} from './queries';

export const useUserSkills = () => {
  return useLazyQuery<UserSkillsResult, UserSkillsArgs>(USER_SKILLS_QUERY);
};

export const useSkills = () => {
  return useLazyQuery<SkillsResult>(SKILLS_QUERY);
};
