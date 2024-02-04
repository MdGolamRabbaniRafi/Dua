// src/category/category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubCategoryEntity } from './sub_category.entity'; 

@Entity({name:"category"})
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cat_id: number;

  @Column()
  cat_name_bn: string;

  @Column()
  cat_name_en: string;

  @Column()
  no_of_subcat: number;

  @Column()
  no_of_dua: number;

  @Column()
  cat_icon: string;

  @OneToMany(() => SubCategoryEntity, subCategory => subCategory.category)
  subCategories: SubCategoryEntity[];
}
