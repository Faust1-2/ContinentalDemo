export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isConfirmed: boolean;
}

export type LogUser = Pick<User, 'email'> & { password: string };
export type RegisterUser = Pick<User, 'email'>;
export type ConfirmUserDto = Pick<User, 'isConfirmed'>
  & { lastName: string; firstName: string; password: string; rePassword: string; };
