import { Router } from "express";
import { add_employees, get_employees } from "./controllers/employee.controller";
import { mark_Attendance } from "./controllers/attendance.controller";
import { login, logout, authenticatedUser, refreshToken } from "./controllers/auth.controller";
import { get_payroll_history, distribute_Payroll } from "./controllers/payroll.controller";
import { calculate_Salary, get_salary } from "./controllers/salary.controller";

const router = Router();

router.post('/auth/login',login);
router.post('/auth/logout',logout);
router.post('/employees',add_employees);
router.get('/employees/:id',get_employees);
router.post('/attendance/mark',mark_Attendance);
router.post('/salary/calculate',calculate_Salary);
router.get('/salary/:id',get_salary);
router.post('/payroll/distribute',distribute_Payroll);
router.get('/payroll/history',get_payroll_history);


export const routes = router;
