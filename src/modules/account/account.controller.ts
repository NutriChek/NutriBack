import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UploadedFile
} from '@nestjs/common';
import { AccountService } from './account.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SingleFileUploadDecorator } from '../../common/decorators/single-file-upload.decorator';

@Controller()
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post('picture')
    @SingleFileUploadDecorator
    updatePicture(@UploadedFile() file: Express.Multer.File) {
        return this.accountService.updatePicture(file);
    }

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
