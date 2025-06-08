import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Salary } from "../entities/salary.entity";
import { SalaryService } from "../services/salary.service";

export const calculate_Salary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { employeeId, role, month } = req.body;
  console.log(req.body);

  const result = await new SalaryService().calculateSalary(
    employeeId,
    role,
    month
  );
  if (result) {
    res.send({
      status: true,
      message: "Salary calculated successfully",
      data: result,
    });
  } else {
    return {
      status: false,
      message: "Salary not calculated",
      data: null,
    };
  }
};

export const get_salary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body;
    const idParam = req.params.id;
    const month = req.query.month?.toString();

    if (!idParam || !month || !role) {
      return res.send({
        status: false,
        message: "Missing required parameters (id, month, or role)",
        data: null,
      });
    }

    const employeeId = parseInt(idParam);
    if (isNaN(employeeId)) {
      return res.send({
        status: false,
        message: "Invalid employee ID",
        data: null,
      });
    }
    console.log(employeeId);
    console.log(month);

    const result = await getRepository(Salary).find({
      where: {
        id: employeeId,
        role: role,
        month: month,
      },
    });

    if (result) {
      return res.send({
        status: true,
        message: "Salary fetched successfully",
        data: result,
      });
    } else {
      return res.send({
        status: false,
        message: "No salary found",
        data: null,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: false,
      message: "Internal server error",
      data: null,
    });
  }
};
