import { IsNumber, IsOptional, IsString } from 'class-validator';

export class addBookBodyDto {
    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsString()
    publish_date: string;
}

export class updateBookBodyDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    author: string;

    @IsOptional()
    @IsString()
    publish_date: string;
}
