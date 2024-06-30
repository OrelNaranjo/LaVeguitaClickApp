export interface User {
  name: string;
  lastname: string;
  role: {
    description: string;
    id: number;
    name: string;
    privileges: {
      id: number;
      name: string;
      description: string;
    }[];
  };
}
