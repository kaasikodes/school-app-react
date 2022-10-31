export interface ISchoolCardEntry {
  item: {
    id: number;
    name: string;
    description?: string;
  };
  selected?: boolean;
}
