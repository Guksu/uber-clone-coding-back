import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/entities/user.entity';

// keyof는 object타입을 받으므로 typeof를 먼저 사용하여 object형태로 변환시켜야한다.
export type AllowedRole = keyof typeof UserRole | 'Any';

export const Role = (role: AllowedRole[]) => SetMetadata('role', role);
