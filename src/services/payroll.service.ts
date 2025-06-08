import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Salary } from "../entities/salary.entity";
import { Payroll } from "../entities/payroll.entity";

export class PayrollService{
    async distributePayroll(month: string,role: string,req?: Request, res?: Response, next?: NextFunction){
        const payrollRepo = getRepository(Payroll);
        const salaryRepo =getRepository(Salary);

        const salaries = await salaryRepo.find({where: {month: month}});
        if(!salaries){
            res.send({
                status: false,
                message: 'Salary not found',
                data: null
            });
        }

        const createdPayrolls = []; 

        for(const salary of salaries){
            const payroll = payrollRepo.create({salary: salary, month: month,role: role, distributed: true});
            const savedPayroll = await payrollRepo.save(payroll);
            createdPayrolls.push(savedPayroll);
        }

        return createdPayrolls;
    }

    async getPayrollHistory(month: string, role: string){
        const payrollRepo = getRepository(Payroll);
        return await payrollRepo.find({where: {month: month,role: role}});
    }
}