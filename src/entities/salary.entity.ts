import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";
import { IsNumber, IsString, Min } from "class-validator";

@Entity()
export class Salary{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee, (employee) => employee.id)
    employee: Employee;

    @Column({nullable : false})
    @Min(3)
    @IsString()
    month: string;

    @Column({type: "enum",nullable: false, enum: ["employee","hr","admin"]})
    role: string;

    @Column()
    @IsNumber()
    tax: number;

    @Column()
    @IsNumber()
    pf: number;

    @Column()
    @IsNumber()  
    totalSalary: number;

    @Column()
    @IsNumber() 
    netSalary: number;
}