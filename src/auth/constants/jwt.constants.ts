import * as dotenv from 'dotenv';

dotenv.config();

const jwtConstants = {
  secret: process.env.JWT_SECRET,
} as const;

export default jwtConstants;