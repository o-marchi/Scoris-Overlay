import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import express from 'express';
import { AuthUser, AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {}

  // 1) Redirect user to Discord
  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async discordLogin() {
    // Passport handles the redirect to Discord.
  }

  // Google callback
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Passport handles the redirect to Google.
  }
  
  // 2) Discord callback
  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  async handleCallback(@Req() req: express.Request, @Res() res: express.Response) {
    const authUser = req.user as AuthUser;
    const clientUrl: string = this.config.getOrThrow<string>('PUBLIC_CLIENT_URL');

    if (!authUser) {
      return res.redirect(302, `${clientUrl}?authentication_error=true`);
    }

    const token: string = await this.authService.signToken(authUser);
    const redirectUrl = new URL('/auth/callback', clientUrl);
    redirectUrl.searchParams.append('jwt', token);
    redirectUrl.searchParams.append('access_token', authUser.accessToken);

    return res.redirect(302, redirectUrl.toString());
  }
}
