import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Attendance } from "../entities/attendance.entity";
import { Employee } from "../entities/employee.entity";

export class AttendanceService{
    async markAttendance(employeeId: number, role: string, hoursWorked: number, month: string,req?: Request, res?: Response, next?: NextFunction){
        const attendanceRepo = getRepository(Attendance);
        const employeeRepo =getRepository(Employee);

        const employee = await employeeRepo.findOne({where: {id: employeeId}});
        if(!employee){
            res.send({
                status: false,
                message: 'Employee not found',
                data: null
            });
        }

        const isHalfDay = hoursWorked < 8;
        const attendance = attendanceRepo.create({employee: employee, role: role, hoursWorked: hoursWorked, month: month, isHalfDay: isHalfDay});
        await attendanceRepo.save(attendance);

        return attendance;
    }
}