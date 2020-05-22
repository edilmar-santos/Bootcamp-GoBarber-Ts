import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import auth from '../config/auth';

interface RequestDTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<Response> {
    /**
     * validate user by email
     * validate pass with bcrypt
     * create token and return user
     * /
     *
     */

    const user = await getRepository(User).findOne({
      where: { email },
    });

    if (!user) {
      throw Error(
        'Invalid email/password. Please check your credentials and try again.',
      );
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw Error(
        'Invalid email/password. Please check your credentials and try again.',
      );
    }

    delete user.password;

    return {
      user,
      token: sign({}, auth.secret, {
        subject: user.id,
        expiresIn: auth.expireIn,
      }),
    };
  }
}

export default AuthenticateUserService;
