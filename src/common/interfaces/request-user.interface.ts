import UserActive from "./user-active.interface";

interface RequestWithActiveUser extends Request {
  user: UserActive;
}

export default RequestWithActiveUser;
