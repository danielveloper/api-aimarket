//authService.ts
import { validate } from 'class-validator';

import { User } from '../entities/user';
import { BcryptUtil } from '../utils/bcrypt ';
import { AppDataSource } from '../utils/database';

export class UserService {

  static async findUserByEmail(email: string) {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOneBy({ email });
  }

  static async createUser(userData: { email: string; password: string }) {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = userData;

    const existingUser = await UserService.findUserByEmail(email);
    // const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const user = new User();
    user.email = email;
    user.password = await BcryptUtil.hashPassword(password);
    user.userType = user.userType || 'CUSTOMER';

    const errors = await validate(user);

    if (errors.length > 0) {
      return errors;
    }

    return await userRepository.save(user);
  }

  static async comparePassword(password: string, userPassword: string) {
    return await BcryptUtil.comparePassword(password, userPassword);
  }
}
