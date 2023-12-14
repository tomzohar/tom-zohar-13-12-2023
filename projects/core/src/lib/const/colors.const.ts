import {ThemePalette} from "@angular/material/core";

export type ThemeColors = ThemePalette & string;

export enum AppColors {
  primary = '--clr-primary',
  textPrimary = '--clr-text',
  bgColor = '--clr-bg'
}

export enum AppCssVariables {
  homepageBg = '--homepage-bg-img',
}

export const AppColorsLightMode = {
  [AppColors.primary]: '#85add8',
  [AppColors.bgColor]: '#85add8',
  [AppColors.textPrimary]: '#002041',
}

export const AppColorsDarkMode = {
  [AppColors.primary]: '#002041',
  [AppColors.bgColor]: '#002041',
  [AppColors.textPrimary]: '#ffffff',
}
