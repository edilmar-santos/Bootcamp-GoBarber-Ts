import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const findEmail = await userRepository.findOne({
      where: { email },
    });

    if (findEmail) {
      throw Error('Email already in use');
    }

    const hashedPassord = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassord,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
