export type Country = {
  name: {
    common: string;
    official: string;
  }
  area: number
  capital: string[]
  languages: Record<string, string>
  flag: string
  latlng: number[]
};
