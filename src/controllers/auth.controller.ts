import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt, { verify } from "jsonwebtoken";
import { Employee } from "../entities/employee.entity";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const repo = getRepository(Employee);

    const user = await repo.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.send({
        status: false,
        message: "Invalid Credentials",
        data: null,
      });
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...data } = user;

    res.send({
      status: true,
      message: "Login successful",
      data: {
        user: data,
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Failed to login",
      data: error,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.send({
      status: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Failed to logout",
      data: error,
    });
  }
};

export const authenticatedUser = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.send({
      status: false,
      message: "Unauthenticated",
      data: null,
    });
  }

  try {
    console.log(token);
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!payload) {
      return res.send({
        status: false,
        message: "Unauthenticated",
        data: null,
      });
    }

    const user = await getRepository(Employee).findOne({
      where: { id: payload.id },
    });

    if (!user) {
      return res.send({
        status: false,
        message: "User not found",
        data: null,
      });
    }

    const { password: _, ...data } = user;

    res.send({
      status: true,
      message: "Authenticated",
      data: data,
    });
  } catch {
    return res.send({
      status: false,
      message: "Unauthenticated",
      data: null,
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.send({
      status: false,
      message: "Unauthenticated",
      data: null,
    });
  }

  try {
    const payload: any = verify(token, process.env.REFRESH_TOKEN_SECRET);

    if (!payload) {
      return res.send({
        status: true,
        message: "unauthenticated",
      });
    }

    const accessToken = jwt.sign(
      { id: payload.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.send({
      status: true,
      message: "Token refreshed",
      data: accessToken,
    });
  } catch {
    return res.send({
      status: false,
      message: "Invalid refresh token",
      data: null,
    });
  }
};
