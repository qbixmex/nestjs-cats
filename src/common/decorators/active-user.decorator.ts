import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const ActiveUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }
);

export default ActiveUser;
