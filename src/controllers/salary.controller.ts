import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Salary } from "../entities/salary.entity";
import { SalaryService } from "../services/salary.service";

export const calculate_Salary = async (req: Request, res: Response, next: NextFunction) => {
    const { employeeId, role, month } = req.body;
    console.log(req.body);

    const result = await new SalaryService().calculateSalary(employeeId,role,month);
    if (result) {
        res.send({
            status: true,
            message: 'Salary calculated successfully',
            data: result
        });
    } else {
        return {
            status: false,
            message: 'Salary not calculated',
            data: null
        };
    }
};

export const get_salary = async (req: Request, res: Response, next: NextFunction) => {
       try {
        const { role } = req.body;
        const employeeId = Number(req.params.id);
        console.log(employeeId);
        const month = req.query.month.toString();
        console.log(month);
        console.log(req.body);

         const result = await getRepository(Salary).find({where: {id: employeeId, role: role,month: month}});
         if(result){
            res.send({
            status: true,
            message: 'Salary fetched successfully',
            data: result
        });
        }else{
            return {
                status: false,
                message: 'Salary not fetched',
                data: null
            };
         }
       } catch (error) {
          console.log(error);
       }
};