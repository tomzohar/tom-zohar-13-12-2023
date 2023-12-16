import {Injectable} from "@angular/core";
import {AppColorsDarkMode, AppColorsLightMode} from "../const/colors.const";
import {AppColors} from "../types/enum/app-colors.enum";
import {AppCssVariables} from "../types/enum/css-variables.enum";

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
