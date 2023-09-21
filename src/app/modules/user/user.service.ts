import { IUser } from './user.interface';
import { User } from './user.model';

const createUserFromDb = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new Error('Failed to create User !');
  }
  return createdUser;
};


const getSingleUserFromDb = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });
  return result;
};


export const UserService = {
  createUserFromDb,
  getSingleUserFromDb,
};
