import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { AttendanceService } from "../services/attendance.service";

export const mark_Attendance = async (req: Request, res: Response, next: NextFunction) => {
    const { employeeId, role, hoursWorked, month } = req.body;
    console.log(req.body);

    const result = await new AttendanceService().markAttendance(employeeId,role,hoursWorked,month);
    if (result) {
        res.send({
            status: true,
            message: 'Attendance marked successfully',
            data: result
        });
    } else {
        return {
            status: false,
            message: 'Attendance not marked',
            data: null
        };
    }
};