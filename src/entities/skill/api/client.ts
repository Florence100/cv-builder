import { useLazyQuery } from '@apollo/client/react';
import {
  PROFILE_SKILLS_QUERY,
  SKILLS_QUERY,
  CV_SKILLS_QUERY,
  ProfileSkillsArgs,
  ProfileSkillsResult,
  SkillsResult,
  CvSkillsArgs,
  CvSkillsResult,
} from './queries';

export const useUserSkills = () => {
  return useLazyQuery<ProfileSkillsResult, ProfileSkillsArgs>(PROFILE_SKILLS_QUERY);
};

export const useSkills = () => {
  return useLazyQuery<SkillsResult>(SKILLS_QUERY);
};

export const useCVSkills = () => {
  return useLazyQuery<CvSkillsResult, CvSkillsArgs>(CV_SKILLS_QUERY);
};
