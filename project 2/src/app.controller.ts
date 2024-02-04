import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/findAllCategory')
  async getCategoryValue(): Promise<any>
  {
    const data = await this.appService.getCategoryValue();
    return data;
  }
  @Get('/findAllDua')
  async getDuaValue(): Promise<any>
  {
    const data = await this.appService.getDuaValue();
    return data;
  }
  @Get('/findAllSubCategory')
  async getSubCategoryValue(): Promise<any>
  {
    const data = await this.appService.getSubCategoryValue();
    return data;
  }
  @Get('/findAllDuabySubCat/:subcat_id')
  async getDuaValueBySubCat(@Param('subcat_id', ParseIntPipe) subcat_id: number,): Promise<any>
  {
    const data = await this.appService.getDuaValueBySubCat(subcat_id);
    return data;
  }
  @Get('/findAllSubCatbyCat/:cat_id')
  async getSubCategoryValueByCat(@Param('cat_id', ParseIntPipe) cat_id: number,): Promise<any>
  {
    const data = await this.appService.getSubCategoryValueByCat(cat_id);
    return data;
  }
  @Get('/findDuaById/:id')
  async findDuaById(@Param('id', ParseIntPipe) cat_id: number,): Promise<any>
  {
    const data = await this.appService.findDuaById(cat_id);
    return data;
  }

  @Get('/findAllDuabyCat/:cat_id')
  async findAllDuabyCat(@Param('cat_id', ParseIntPipe) cat_id: number,): Promise<any>
  {
    const data = await this.appService.findAllDuabyCat(cat_id);
    return data;
  }
  // @Get('/insert')
  // async insertValue(): Promise<any>
  // {
  //   const data = await this.appService.insertValue();
  //   return data;
  // }
}
