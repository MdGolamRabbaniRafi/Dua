// src/dua/dua.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, IsNull, JoinColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { SubCategoryEntity } from './sub_category.entity';

@Entity({name:"dua"})
export class DuaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cat_id: number;

  @Column()
  subcat_id: number;

  @Column()
  dua_id: number;

  @Column()
  dua_name_bn: string;

  @Column()
  dua_name_en: string;

  @Column()
  top_bn: string;

  @Column()
  top_en: string;

  @Column()
  dua_arabic: string;

  @Column()
  dua_indopak: string;

  @Column()
  clean_arabic: string;

  @Column()
  transliteration_bn: string;

  @Column()
  transliteration_en: string;

  @Column()
  translation_bn: string;

  @Column()
  translation_en: string;

  @Column()
  bottom_bn: string;

  @Column()
  bottom_en: string;

  @Column()
  refference_bn: string;

  @Column()
  refference_en: string;

  @Column()
  audio: string;

  @ManyToOne(() => CategoryEntity, category => category.subCategories)
  @JoinColumn({ name: "cat_id" })
  category: CategoryEntity;

  @ManyToOne(() => SubCategoryEntity, subCategory => subCategory.duas)
  @JoinColumn({ name: "subcat_id" })
  subCategory: SubCategoryEntity;
}
