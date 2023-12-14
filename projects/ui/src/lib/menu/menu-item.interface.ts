export interface MenuItem<T = any> {
  id: string | number;
  label: string;
  icon?: string;
  data?: T;
}
