
import { Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class ProductEntity implements Product {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    storage: string;

    @ApiProperty()
    ram: string;

    @ApiProperty()
    conditon: string;

    @ApiProperty()
    ownerName: string;

    @ApiProperty()
    ownerEmail: string;

    @ApiProperty()
    ownerPhone: string;

    @ApiProperty({ required: false })
    approved: boolean = false;  // Set default value to false

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ required: false, nullable: true })
    authorId: number | null;

    @ApiProperty({ required: false, type: UserEntity })
    author?: UserEntity;

    constructor({ author, ...data }: Partial<ProductEntity>) {
        Object.assign(this, data);

        if (author) {
            this.author = new UserEntity(author);
        }
    }
}
