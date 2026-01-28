import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import express from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 1) Redirect user to Discord or Google
   */

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async discordLogin() {
    // Passport handles the redirect to Discord.
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Passport handles the redirect to Google.
  }

  /**
   * 2) Handle Discord or Google callback
   */

  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  async handleDiscordCallback(@Req() req: express.Request, @Res() res: express.Response) {
    return this.authService.handleCallback(req, res);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async handleGoogleCallback(@Req() req: express.Request, @Res() res: express.Response) {
    return this.authService.handleCallback(req, res);
  }
}
