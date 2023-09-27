import { inject, injectable } from 'inversify';
import {
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    QueryParams,
} from 'routing-controllers';
import { API as BookAPI, BookCrudService } from '@itommey/book-service';
import ResponseDto from '@/dtos/response.dto';
import { addBookBodyDto, updateBookBodyDto } from '@/dtos/body.dto';
import { getBookQuery } from '@/dtos/query_param.dto';

@JsonController('/book')
@injectable()
export default class PaymentController {
    constructor(
        @inject(BookAPI.BookQuery)
        private bookCrud: BookCrudService,
    ) {}

    @Get()
    async getBooks(@QueryParams() queryParam: getBookQuery) {
        const ctx = this.bookCrud.createQueryContext();
        ctx.isActive(true);
        if (queryParam.title) ctx.author(queryParam.title);
        if (queryParam.author) ctx.author(queryParam.author);
        const book = await this.bookCrud.find(ctx);

        return ResponseDto.success(book);
    }

    @Get('/:id')
    async getBook(@Param('id') bookId: number) {
        const ctx = this.bookCrud.createQueryContext();
        ctx.bookId(bookId).isActive(true);
        const book = await this.bookCrud.find(ctx);

        return ResponseDto.success(book);
    }

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
