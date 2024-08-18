import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller()
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get()
    findOwn() {
        return this.accountService.findOwn();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.accountService.findOne(+id);
    }

    @Patch()
    update(@Body() updateAccountDto: UpdateAccountDto) {
        return this.accountService.update(updateAccountDto);
    }

    @Patch('reset-password')
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.accountService.resetPassword(resetPasswordDto);
    }
}
