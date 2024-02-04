import { Injectable } from '@nestjs/common';
import { DuaEntity } from './Entity/dua.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './Entity/category.entity';
import { SubCategoryEntity } from './Entity/sub_category.entity';

@Injectable()
export class AppService {
    constructor(
      @InjectRepository(DuaEntity)
      private DuaRepo: Repository<DuaEntity>,
      @InjectRepository(CategoryEntity)
      private categoryRepo: Repository<CategoryEntity>,
      @InjectRepository(SubCategoryEntity)
      private subCategoryRepo: Repository<SubCategoryEntity>,

    ) {}
  
  getHello(): string {
    return 'Hello !';
  }
  async getCategoryValue(): Promise<any> {
    const data = await this.categoryRepo.find();
    return data;
  }
  async getDuaValue(): Promise<any> {
    const data = await this.DuaRepo.find();
    return data;
  }
  async getSubCategoryValue(): Promise<any> {
    const data = await this.subCategoryRepo.find();
    return data;
  }
  async getDuaValueBySubCat(subcat_id: number): Promise<DuaEntity[]> {
    // Fetch dua values based on subcat_id
    const data = await this.DuaRepo.find({ where: { subcat_id } });
    return data;
}
async getSubCategoryValueByCat(cat_id: number): Promise<SubCategoryEntity[]> {
  const data = await this.subCategoryRepo.find({ where: { cat_id: cat_id} });
  return data;
}
async findDuaById(id: number): Promise<DuaEntity> {
  const data = await this.DuaRepo.findOne({ where: { id: id} });
  return data;
}

async findAllDuabyCat(cat_id: number): Promise<DuaEntity[]> {
  // Fetch dua values based on subcat_id
  const data = await this.DuaRepo.find({ where: { cat_id } });
  return data;
}
  // async insertValue(): Promise<any> {
  //   const obj: CategoryEntity={
  //     id: 0,
  //     // catId: 2, 
  //     catNameBn: "qwer", 
  //     catNameEn: "asdf", 
  //     noOfSubcat: 1, 
  //     noOfDua: 2, 
  //     catIcon: "qwer",
  //   }
  //   const data = await this.categoryRepo.insert(obj);
  //   return data;
  // }
  
  
}
