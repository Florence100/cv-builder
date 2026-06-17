import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-plugin-prettier/recommended';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  globalIgnores(['validator.ts', 'routes.d.ts', '.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
]);

export default eslintConfig;
