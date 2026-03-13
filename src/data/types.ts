export enum Service_Category {
  Wax = 'Wax',
  StraighRazor = 'Straight Razor',
  Color = 'Color',
}

export type Service = {
  label: string;
  alternateLabel?: string;
  category: Service_Category;
  note?: string;
};

export type Employee = {
  name: string;
  services: Service[];
  isPickUpOnly?: boolean;
};
