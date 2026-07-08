import type { SkillMastery, Skill, User } from 'cv-graphql';
import { gql } from '@apollo/client';

export type ProfileSkillsArgs = {
  userId: string;
};

export type ProfileSkillsResult = {
  profile: {
    skills: SkillMastery[];
  };
};

export type SkillsResult = {
  skills: Skill[];
};

export type CvSkillsArgs = {
  cvId: string;
};

export type CvSkillsResult = {
  cv: {
    user: User;
    skills: SkillMastery[];
  };
};

export const PROFILE_SKILLS_QUERY = gql`
  query Profile($userId: ID!) {
    profile(userId: $userId) {
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const SKILLS_QUERY = gql`
  query Skills {
    skills {
      id
      name
      category {
        id
      }
    }
  }
`;

export const CV_SKILLS_QUERY = gql`
  query CV($cvId: ID!) {
    cv(cvId: $cvId) {
      user {
        id
      }
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;
