import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/Users.entity';
import { Office } from './entities/Offices.entity';
import { Reservation } from './entities/Reservations.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './Config/typeorm';
import { OfficeModule } from './offices/offices.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ReservationsModule } from './reservations/reservations.module';
import { FileUploadModule } from './file-upload/file-upload.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('typeorm');
      },
    }),
    TypeOrmModule.forFeature([User, Office, Reservation]),
    OfficeModule,
    ReservationsModule,
    UserModule,
    ReservationsModule,
    FileUploadModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    // AuthModule,
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     const jwtSecret = configService.get<string>('JWT_SECRET');

    //     return {
    //       secret: jwtSecret,
    //       signOptions: { expiresIn: '1h' },
    //     };
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
