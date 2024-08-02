import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/Users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUserDto,
  LoginUserDto,
  LoginUserGoogleDto,
  RegisterUserGoogleDto,
  UpdateUserDto,
} from './user.dto';
import { transporter } from '../Config/mailer';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getuserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['reservations'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }

    return user;
  }

  async createUser(user: CreateUserDto) {
    const newUser = await this.userRepository.save(user);

    const dbUser = await this.userRepository.findOne({
      where: { id: newUser.id },
      relations: { reservations: true },
    });

    return dbUser;
  }

  async updateUser(id: string, user: UpdateUserDto) {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }
    await this.userRepository.update(id, user);

    const dbUser = await this.userRepository.findOneBy({
      email: foundUser.email,
    });

    const { password: _, ...userNoPassword } = dbUser;

    return userNoPassword;
  }

  async deleteById(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }

    await this.userRepository.remove(user);
    return `User with id ${id} was deleted successfully`;
  }

  async register(user: CreateUserDto) {
    const { email, password } = user;

    const foundUser = await this.userRepository.findOne({ where: { email } });

    if (foundUser)
      throw new BadRequestException(
        `Email ${email} is already a registered account`,
      );

    if (!password) {
      throw new BadRequestException('Password is required');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.createUser({ ...user, password: hashedPassword });

    const { password: _, ...userNoPassword } = user;

    try {
      await transporter.sendMail({
        from: '"Redux team"', // sender address
        to: userNoPassword.email, // list of receivers
        subject: 'Confirmacion de cuenta', // Subject line
        html: '<b>Hola, bienvenido a Relux!</b>', // html body
      });
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong. No emails were sent ',
      );
    }

    return userNoPassword;
  }

  async login(credentials: LoginUserDto) {
    const { email, password } = credentials;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new BadRequestException('Wrong credentials');
    }

    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    const { password: _, ...userNoPassword } = user;

    return {
      message: `Successfully signed in. Welcome ${user.name}`,
      token,
      userNoPassword,
    };
  }

  async registerGoogle(credentials: RegisterUserGoogleDto) {
    const { name, lastname, email } = credentials;

    const foundUser = await this.userRepository.findOne({ where: { email } });
    if (foundUser)
      throw new BadRequestException(
        `Email ${email} is already a registered account`,
      );

    const newUser = await this.userRepository.save({ name, lastname, email });

    const { password: _, ...userNoPassword } = newUser;

    return userNoPassword;
  }

  async loginGoogle(credentials: LoginUserGoogleDto) {
    const { email } = credentials;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new BadRequestException('Wrogn credentials');

    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    const { password: _, ...userNoPassword } = user;

    return {
      message: `Successfully signed in. Welcome ${user.name}`,
      token,
      userNoPassword,
    };
  }
}

