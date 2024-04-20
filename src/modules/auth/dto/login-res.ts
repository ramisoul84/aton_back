export interface LoginResponse {
  id: number;
  surname: string;
  name: string;
  patronymic?: string;
  username: string;
  isAdmin: boolean;
  access_token: string;
}
