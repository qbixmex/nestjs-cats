import { SetMetadata } from "@nestjs/common";
import Role from '../enums/role.enum';

export const ROLES_KEY = 'roles';

const Roles = (role: Role) => {
  return SetMetadata(ROLES_KEY, role);
};

export default Roles;
