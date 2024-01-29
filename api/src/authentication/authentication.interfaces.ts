import { UserContinental } from '../users/entities/user.entity';

export interface RequestWithUser extends Request {
  user: UserContinental;
}

export interface TokenPayload {
  userId: string;
}
