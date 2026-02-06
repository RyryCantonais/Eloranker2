import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryColumn()
  id: string; // On utilise le pseudo comme ID (comme dans ton mock)

  @Column({ default: 1000 })
  rank: number;
}