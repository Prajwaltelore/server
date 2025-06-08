import { IsDate, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class Attendance{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee, (employee) => employee.id)
    employee: Employee;

    @Column({nullable: false})
    month: string;

    @Column({type: "enum",nullable: false, enum: ["employee","hr","admin"]})
    role: string;

    @Column({nullable: false})
    @IsNumber()
    hoursWorked: number;

    @Column({default: false})
    isHalfDay: boolean;

}