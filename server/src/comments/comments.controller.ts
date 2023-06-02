import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './comments.dto';
import { JwtAuthGuard } from '../authentication/authentication.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get('get-comments')
  async getComments() {
    return await this.commentsService.getComments();
  }

  @Post('add-comment')
  async addComment(@Body() dto: CommentDto) {
    const comment = await this.commentsService.addComment(dto);
    return { message: 'Comment add',comment };
  }
  @UseGuards(JwtAuthGuard)
  @Post('delete-comment')
  async deleteComment(@Body() { id }: { id: string }) {
    await this.commentsService.deleteComment({ id });
    return { message: 'Comment delete' };
  }
}
