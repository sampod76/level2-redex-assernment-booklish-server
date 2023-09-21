import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { UserService } from './user.service';
import { IUser } from './user.interface';



const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    
    const data = req.body;
    const result = await UserService.createUserFromDb(data);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `User created successfully`,
      data: result,
    });
  }
);



const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.body.UserId
  const result = await UserService.getSingleUserFromDb(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User get successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getSingleUser,
};
