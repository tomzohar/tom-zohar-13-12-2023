import {ThemePalette} from "@angular/material/core";
import {AppColors} from "../types/enum/app-colors.enum";

export type ThemeColors = ThemePalette & string;

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
