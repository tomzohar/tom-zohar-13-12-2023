import {Injectable} from "@angular/core";
import {AppColors, AppColorsDarkMode, AppColorsLightMode, AppCssVariables} from "../const/colors.const";

@Injectable({providedIn: 'root'})
export class AppLayoutThemeService {
  setThemeStyles(isDarkMode: boolean): void {

    this.setStyle(AppColors.primary, isDarkMode
      ? AppColorsDarkMode[AppColors.primary]
      : AppColorsLightMode[AppColors.primary]
    );

    this.setStyle(AppColors.textPrimary, isDarkMode
      ? AppColorsDarkMode[AppColors.textPrimary]
      : AppColorsLightMode[AppColors.textPrimary]
    );

    this.setStyle(AppColors.bgColor, isDarkMode
      ? AppColorsDarkMode[AppColors.bgColor]
      : AppColorsLightMode[AppColors.bgColor]
    )

    this.setStyle(AppCssVariables.homepageBg, `url("clear-sky${isDarkMode ? '-night' : ''}.jpg")`);

  }

  private setStyle(property: string, value: string): void {
    document.documentElement.style.setProperty(property, value);
  }
}
