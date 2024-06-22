export interface UserData {
  name: string;
  lastname: string;
  role: {
    description: string;
    id: number;
    name: string;
    privileges: Array<{
      id: number;
      name: string;
      description: string;
    }>;
  };
  iat: number;
}
