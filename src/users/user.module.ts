import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserMappingProfile } from './user.mapping';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserMappingProfile],
  exports: [UserService],
})
export class UsersModule {}
