import { User } from '@shared/index';

export type UserRegisterDTO = Omit<User, 'id' | 'token'> & { password: string };
export type UserLoginDTO = { email?: string; phoneNumber?: string; password: string };

export type UserAuthorization = {
  accessToken: string;
  refreshToken: string;
};
