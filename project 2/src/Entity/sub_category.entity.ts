import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { DuaEntity } from './dua.entity';
import { CategoryEntity } from './category.entity';

@Entity({name: "sub_category"})
export class SubCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cat_id: number;

  @Column()
  subcat_id: number;

  @Column()
  subcat_name_bn: string;

  @Column()
  subcat_name_en: string;

  @Column()
  no_of_dua: number;

  @ManyToOne(() => CategoryEntity, category => category.subCategories)
  @JoinColumn({ name: "cat_id" })
  category: CategoryEntity;

  @OneToMany(() => DuaEntity, dua => dua.subCategory)
  duas: DuaEntity[];
}
