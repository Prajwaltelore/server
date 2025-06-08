import {
  Collection,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Salary } from "./salary.entity";
import { IsBoolean, IsString, Min } from "class-validator";

@Entity()
export class Payroll {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Salary, (salary) => salary.id)
  salary: Salary;

  @Column()
  @Min(3)
  @IsString()
  month: string;

  @Column({ type: "enum", nullable: false, enum: ["employee", "hr", "admin"] })
  role: string;

  @Column()
  @IsBoolean()
  distributed: boolean;
}
