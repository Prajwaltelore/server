import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, JoinTable, ManyToMany, OneToMany, } from "typeorm";

import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
    IsString,
    IsNumber,
} from "class-validator"

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @Min(3)
    @IsString()
    name: string;

    @Column({ unique: true, nullable: false })
    @Min(3)
    @IsEmail()
    email: string;

    @Column({ nullable: false })
    @IsString()
    @Min(5)
    password: string;

    @Column({type: "enum",nullable: false, enum: ["employee","hr","admin"] })
    @Min(3)
    @IsString()
    role: string;

    @Column({ nullable: true })
    @IsNumber()
    basicSalary: number;

    @Column({ nullable: true })
    @IsNumber()
    allowances: number;

}