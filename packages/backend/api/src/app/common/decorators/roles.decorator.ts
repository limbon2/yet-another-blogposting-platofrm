import { UserRole } from '@blogposting-platform/entities';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLE_KEY, roles);
