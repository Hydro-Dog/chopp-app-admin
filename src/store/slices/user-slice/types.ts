import { ORDER_STATUS } from '@shared/enum';
import { SearchRequestParams } from '@shared/index';

export type User = {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
};

export type UserRegisterDTO = Omit<User, 'id' | 'token'> & { password: string };
export type UserLoginDTO = { email?: string; phoneNumber?: string; password: string };

export type UserAuthorization = {
  accessToken: string;
  refreshToken: string;
};
