import { getRepository } from "typeorm";
import { Employee } from "../entities/employee.entity";
import { Salary } from "../entities/salary.entity";
import { Request, Response, NextFunction } from "express";
import { Attendance } from "../entities/attendance.entity";

export class SalaryService{
    async calculateSalary(employeeId: number,role: string, month: string,req?: Request, res?: Response, next?: NextFunction){
        const employeeRepo = getRepository(Employee);
        const salaryRepo = getRepository(Salary);
        const attendanceRepo = getRepository(Attendance);

        const employee = await employeeRepo.findOne({where: {id: employeeId}});
        if(!employee){
            res.send({
                status: false,
                message: 'Employee not found',
                data: null
            });
        }

        const attendanceRecords = await attendanceRepo.find({where: {employee: employee,role: role, month: month}});

        let fullDays = 0;
        let halfDays = 0;
        const workingDays = 30;
        const hra = employee.basicSalary * 0.4;
        const grossSalary = employee.basicSalary + hra + employee.allowances;
        const tax = grossSalary * 0.1;
        const pf = employee.basicSalary * 0.12;
        const dailyWage = grossSalary / workingDays;
        const fullDaySalary = dailyWage;
        const halfDaySalary = dailyWage / 2;

        for(const record of attendanceRecords){
            if(record.hoursWorked >= 8){
                fullDays++;
            } else{
                halfDays++;
            }
        }

        const totalSalary = (fullDays * fullDaySalary) + (halfDays * halfDaySalary);
        const netSalary = totalSalary - tax - pf;

        const salary = salaryRepo.create({employee: employee,month: month,tax: tax,pf: pf,totalSalary: totalSalary,netSalary: netSalary});
        await salaryRepo.save(salary);

        return salary;
    }
}