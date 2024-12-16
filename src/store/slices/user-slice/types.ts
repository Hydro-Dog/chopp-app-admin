import { ACTIVITY_STATUS } from '@shared/enum';
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

export type CallsTableParams = SearchRequestParams & {
  userId?: string;
};

export type CallsTableRecord = {
  id: string;
  date: string;
  status: ACTIVITY_STATUS;
  address: string;
  comment: string;
};
