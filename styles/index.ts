import { DefaultTheme, Theme } from 'react-native-paper';

interface ExtraTheme {
  spacing: {
    atomic: number
    tiny: number
    tight: number
    cozy: number
    spacious: number
    extravagant: number
  }
}

export const theme: Theme & ExtraTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
  spacing: {
    atomic: 4,
    tiny: 8,
    tight: 16,
    cozy: 24,
    spacious: 32,
    extravagant: 64,
  },
};
