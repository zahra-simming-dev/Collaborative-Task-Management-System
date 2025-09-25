import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UserRole } from "./user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(
    @Body()
    body: {
      email: string;
      password: string;
      name: string;
      role?: UserRole;
    }
  ) {
    const user = await this.authService.register(
      body.email,
      body.password,
      body.name,
      body.role
    );
    return { message: "User registered successfully", userId: user.id };
  }

  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    const result = await this.authService.login(body.email, body.password);
    if (result) {
      return result;
    }
    return { message: "Invalid credentials" };
  }

  @Get("profile")
  @UseGuards(AuthGuard("jwt"))
  async getProfile(@Request() req) {
    return req.user;
  }

  @Get("users")
  @UseGuards(AuthGuard("jwt"))
  async getUsers() {
    return this.authService.getAllUsers();
  }
}
