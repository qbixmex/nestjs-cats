import { applyDecorators, UseGuards } from "@nestjs/common";
import Role from "../enums/role.enum";
import Roles from "./roles.decorator";
import AuthGuard from "../guard/auth.guard";
import RolesGuard from "../guard/roles.guard";

const Auth = (role: Role) => {
  return applyDecorators(
    Roles(role),
    UseGuards(AuthGuard, RolesGuard),
  );
};

export default Auth;
