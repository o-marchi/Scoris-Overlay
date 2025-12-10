import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import express from 'express';
import { AuthPlayer, AuthService } from './auth.service';

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

  // 2) Discord callback
  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  async discordCallback(
    @Req() req: express.Request,
    @Res() res: express.Response,
  ) {
    const authPlayer = req.user as AuthPlayer;
    const clientUrl: string =
      this.config.getOrThrow<string>('PUBLIC_CLIENT_URL');

    if (!authPlayer) {
      return res.redirect(302, `${clientUrl}?authentication_error=true`);
    }

    const token: string = await this.authService.signToken(authPlayer);
    const redirectUrl = new URL('/auth/callback', clientUrl);
    redirectUrl.searchParams.append('jwt', token);
    redirectUrl.searchParams.append('access_token', authPlayer.accessToken);

    return res.redirect(302, redirectUrl.toString());
  }
}
