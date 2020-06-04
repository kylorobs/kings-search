export interface Result {
  title: string;
  link: string;
  description?: string;
}

export enum SearchResultForm {
  News,
  Event,
  StudentGroup,
  Page,
  Organisation
}


export interface FilterMap {
  [key: string]: boolean;
}
