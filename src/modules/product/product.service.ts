import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ConfigService } from '@nestjs/config';
import { AdminRepo, CustomerRepo, SellerRepo } from 'src/models';

@Injectable()
export class ProductService {
  constructor(
    private readonly ConfigService : ConfigService,
    private readonly SellerRepo : SellerRepo,
    private readonly AdminRepo : AdminRepo,
    private readonly customerRepo : CustomerRepo
  ){}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
