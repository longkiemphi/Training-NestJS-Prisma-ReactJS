import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseGuards
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  async create(@Body() createProductDto: CreateProductDto) {
    return new ProductEntity(
      await this.productsService.create(createProductDto),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findAll() {
    const products = await this.productsService.findAll();
    return products.map((product) => new ProductEntity(product));
  }

  // @Get('promotions')
  // @ApiOkResponse({ type: ProductEntity, isArray: true })
  // async findPromotions() {
  //   const products = await this.productsService.findPromotions();
  //   return products.map((product) => new ProductEntity(product));
  // }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getExistingProduct(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return new ProductEntity(
      await this.productsService.update(id, updateProductDto),
    );
  }

  // @Delete(':id')
  // @ApiCreatedResponse({ type: ProductEntity })
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.productsService.remove(+id);
  // }

  // Temp Helper (TODO: refactor) method to check existence
  private async getExistingProduct(id: number): Promise<ProductEntity> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException(`product with ID ${id} does not exist.`);
    }
    return new ProductEntity(await this.productsService.findOne(id));
  }
}
