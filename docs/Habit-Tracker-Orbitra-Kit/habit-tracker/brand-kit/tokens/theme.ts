// Habit Tracker by Orbitra — React Native theme (generated from design-tokens.json)
// Drop into src/theme/theme.ts

export const brand = {
  navy: '#14213D',
  coral: '#FF6B4A',
  teal: '#2EC4B6',
  sun: '#FFC857',
  cream: '#FFF8F0',
  ink: '#0B1220',
  slate: '#5C6B7A',
} as const;

const light = {
  background: '#FFF8F0',
  surface: '#FFFFFF',
  surfaceMuted: '#F4ECE2',
  border: '#E8DED2',
  textPrimary: '#14213D',
  textSecondary: '#5C6B7A',
  textOnPrimary: '#0B1220',
  primary: '#FF6B4A',
  primaryPressed: '#E8553A',
  success: '#158A7F',
  planned: '#8C99A6',
  danger: '#D64545',
};

const dark: typeof light = {
  background: '#0B1220',
  surface: '#14213D',
  surfaceMuted: '#1C2B4D',
  border: '#26365C',
  textPrimary: '#FFF8F0',
  textSecondary: '#A9B4C2',
  textOnPrimary: '#0B1220',
  primary: '#FF7A5C',
  primaryPressed: '#FF6B4A',
  success: '#2EC4B6',
  planned: '#6B7A8C',
  danger: '#F06A6A',
};

export const topicPalette = [
  '#FF6B4A', '#2EC4B6', '#FFC857', '#6C8CFF', '#B07CFF', '#FF7EB6',
  '#34C26B', '#FF9F43', '#3DB2FF', '#E85D75', '#8BC34A', '#A1887F',
] as const;

export const fonts = {
  display: 'InterDisplay-ExtraBold',
  heading: 'Inter-Bold',
  semibold: 'Inter-SemiBold',
  medium: 'Inter-Medium',
  body: 'Inter-Regular',
};

export const type = {
  display: { fontSize: 40, lineHeight: 44, fontFamily: fonts.display },
  h1: { fontSize: 28, lineHeight: 34, fontFamily: fonts.heading },
  h2: { fontSize: 22, lineHeight: 28, fontFamily: fonts.heading },
  h3: { fontSize: 18, lineHeight: 24, fontFamily: fonts.semibold },
  body: { fontSize: 16, lineHeight: 22, fontFamily: fonts.body },
  label: { fontSize: 14, lineHeight: 18, fontFamily: fonts.medium },
  caption: { fontSize: 12, lineHeight: 16, fontFamily: fonts.body },
} as const;

export const space = { xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 } as const;
export const radius = { sm: 8, md: 12, lg: 16, xl: 24, pill: 999 } as const;
export const size = { touchTarget: 48, fab: 56, iconSm: 20, iconMd: 24, dayCell: 44 } as const;

export const themes = { light, dark };
export type ThemeColors = typeof light;
