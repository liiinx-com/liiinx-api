import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

Injectable();
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async setNormalUserDefaultOptions(user: User): Promise<User> {
    user.roles = ['USER'];
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({
      email,
      isActive: true,
      isDeleted: false,
    });
  }

  async upsertUser(user: User): Promise<User> {
    const existingUser = await this.getUserByEmail(user.email);
    const upsertUser = existingUser
      ? { ...existingUser, ...user }
      : await this.setNormalUserDefaultOptions(user);

    return this.userRepository.save(upsertUser);
  }
}
