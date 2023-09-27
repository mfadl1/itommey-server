import { inject, injectable } from 'inversify';
import {
    Body,
    Delete,
    JsonController,
    Param,
    Post,
    Put,
} from 'routing-controllers';
import { API as BookAPI, BookCrudService } from '@itommey/book-service';
import ResponseDto from '@/dtos/response.dto';
import { addBookBodyDto, updateBookBodyDto } from '@/dtos/body.dto';

@JsonController('/book')
@injectable()
export default class PaymentController {
    constructor(
        @inject(BookAPI.BookQuery)
        private bookCrud: BookCrudService,
    ) {}

    @Post()
    async createBook(@Body() body: addBookBodyDto) {
        const book = await this.bookCrud.create({
            author: body.author,
            title: body.title,
            publishDate: new Date(body.publish_date),
        });

        return ResponseDto.success(book);
    }

    @Put('/:id')
    async updateBook(
        @Body() body: updateBookBodyDto,
        @Param('id') bookId: number,
    ) {
        const book = await this.bookCrud.update({
            id: bookId,
            bookDetail: {
                title: body.title,
                author: body.author,
                publishDate: body.publish_date
                    ? new Date(body.publish_date)
                    : null,
            },
        });

        return ResponseDto.success(book);
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') bookId: number) {
        const book = await this.bookCrud.delete(bookId);

        return ResponseDto.success(book);
    }
}
