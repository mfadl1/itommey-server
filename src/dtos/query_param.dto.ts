import { IsOptional, IsString } from 'class-validator';

export class getBookQuery {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    author: string;
}
