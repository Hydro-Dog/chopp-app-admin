import { z } from 'zod';

export enum SIGN_IN_TYPE {
    EMAIL = 'email',
    PHONE_NUMBER = 'phone_number',
    PASSWORD = 'password',
};

export type ZodShapeType = { email?: z.ZodString, phoneNumber?: z.ZodString, password: z.ZodString }