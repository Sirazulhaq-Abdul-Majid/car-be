import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./database/users.entity";
import { Repository } from "typeorm";
import { ModifyUserDto, SignupDTO } from "./dto";
import { VerifyEmail } from "src/auth/database/verify-email.entity";
import { SendgridService } from "src/sendgrid/sendgrid.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    @InjectRepository(VerifyEmail)
    private verifyEmailRepo: Repository<VerifyEmail>,
    private mailService: SendgridService
  ) {}

  async signUp(signupDto: SignupDTO) {
    try {
      const user = this.userRepo.create({
        full_name: signupDto.full_name,
        email: signupDto.email,
        login_id: signupDto.login_id,
        password_hash: signupDto.password,
        state: signupDto.state,
        city: signupDto.city,
      });
      const savedUser = await this.userRepo.save(user);
      if (!savedUser) {
        throw new BadRequestException();
      }
      const OTP = await this.generateRandomInt();
      const verifyEmail = this.verifyEmailRepo.create({
        token: OTP,
        user: savedUser,
      });
      await this.verifyEmailRepo.save(verifyEmail);
      const { full_name, email, login_id, ...rest } = savedUser;
      try {
        this.mailService.sendMail(verifyEmail.token, savedUser.email);
      } catch (error) {
        return { statusCode: 400, message: "email failed to send" };
      }
      return { full_name, email, login_id };
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Username or email is taken");
    }
  }

  async verifyEmail(email: string, otp: number) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      const token = await this.verifyEmailRepo.findOne({
        where: { token: otp },
        relations: ["user"],
      });
      const currentTimeStamp: any = Date.now();
      const tokenTimeStamp: any = token.createdDate;
      const diffInMinutes = Math.floor(
        Math.abs(currentTimeStamp - tokenTimeStamp) / (1000 * 60)
      );
      if (
        !user ||
        user.role !== 1 ||
        !token ||
        token.user.email !== user.email
      ) {
        throw new BadRequestException();
      }
      if (diffInMinutes > 5) {
        throw new BadRequestException("token timed out");
      }
      user.role = 2;
      await this.userRepo.update(user.id, user);
      await this.verifyEmailRepo.delete(token.id);
      return {
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async modifyUser(user: any, modifyUserDto: ModifyUserDto) {
    try {
      const currentUser: any = await this.userRepo.findOne({
        where: { id: user.id },
      });
      for (const key of Object.keys(modifyUserDto)) {
        if (key === "password_hash") {
          modifyUserDto[key] = await this.hashPassword(modifyUserDto[key]);
        }
        currentUser[key] = modifyUserDto[key];
      }
      const newUser = await this.userRepo.update(currentUser.id, currentUser);
      if (newUser) {
        return {
          statusCode: 200,
        };
      } else {
        return {
          statusCode: 400,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async likedId(user: any) {
    const userLiked = await this.userRepo.findOne({
      where: { id: user.id },
      relations: ["review"],
    });
    const liked = userLiked.review;
    const likesId = [];
    liked.forEach((like) => {
      likesId.push(like.id);
    });
    return likesId;
  }

  async likedObject(user: any) {
    const userLiked = await this.userRepo.findOne({
      where: { id: user.id },
      relations: ["review"],
    });
    return userLiked.review;
  }

  //worker function
  async hashPassword(password: any) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async findOne(username: string) {
    try {
      if (!username) {
        return null;
      }
      const user = await this.userRepo.findOne({
        where: { login_id: username },
      });
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findOneById(id: number) {
    try {
      const user = await this.userRepo.findOneBy({ id });
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async save(user: Users) {
    try {
      await this.userRepo.save(user);
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async findOneReview(id: number) {
    try {
      const user = await this.userRepo.findOne({
        where: { id },
        relations: ["review"],
      });
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async generateRandomInt() {
    return Number(Math.floor(Math.random() * 900000) + 100000);
  }

  async update(user: Users) {
    try {
      const updatedUser = await this.userRepo.update(user.id, user);
      if (!updatedUser) {
        throw new BadRequestException();
      }
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  }
}
