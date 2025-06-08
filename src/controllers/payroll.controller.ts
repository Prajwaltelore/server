import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Salary } from "../entities/salary.entity";
import { SalaryService } from "../services/salary.service";
import { PayrollService } from "../services/payroll.service";

export const distribute_Payroll = async (req: Request, res: Response, next: NextFunction) => {
    const { month, role } = req.body;
    console.log(req.body);

    const result = await new PayrollService().distributePayroll(month,role);
    if (result) {
        res.send({
            status: true,
            message: 'Payroll Distributed successfully',
            data: result
        });
    } else {
        return {
            status: false,
            message: 'Payroll not distributed',
            data: null
        };
    }
};

export const get_payroll_history = async (req: Request, res: Response, next: NextFunction) => {
       try {
        const { role } = req.body;
        const month = req.query.month.toString();
        console.log(req.body);

         const result = await new PayrollService().getPayrollHistory(month,role);
         if(result){
            res.send({
            status: true,
            message: 'Payroll history fetched successfully',
            data: result
        });
        }else{
            return {
                status: false,
                message: 'Payroll history not fetched',
                data: null
            };
         }
       } catch (error) {
          console.log(error);
       }
};