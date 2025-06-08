import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Employee } from "../entities/employee.entity";


export const add_employees = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, role, password, basicSalary, allowances } = req.body;
    console.log(req.body);

    const result = await getRepository(Employee).save({name: name, email: email, password: password, role: role, basicSalary: basicSalary, allowances: allowances});
    if (result) {
        res.send({
            status: true,
            message: 'Employee added successfully',
            data: result
        });
    } else {
        return {
            status: false,
            message: 'Employee not added',
            data: null
        };
    }
};

export const get_employees = async (req: Request, res: Response, next: NextFunction) => {
       try {
        const employeeId = parseInt(req.params.id);
         const result = await getRepository(Employee).find({where: {id:employeeId}});
         if(result){
            res.send({
            status: true,
            message: 'Employees fetched successfully',
            data: result
        });
        }else{
            return {
                status: false,
                message: 'Employees not fetched',
                data: null
            };
         }
       } catch (error) {
          console.log(error);
       }
};
