import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['.next/**', 'node_modules/**', 'coverage/**', '.data/**']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off'
    }
  }
);
