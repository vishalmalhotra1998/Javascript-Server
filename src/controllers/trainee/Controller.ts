import { Request, Response } from 'express';
import * as queryString from 'query-string';
import UserRepository from './../../repositories/users/UserRepository';
import SystemResponse from './../../libs/SystemResponse';
import * as bcrypt from 'bcrypt';
class TraineeController {

  private userRepository = new UserRepository();
  static instance;

  static getInstance = (): TraineeController => {

    if (!TraineeController.instance) {
      return TraineeController.instance = new TraineeController();
    }

    return TraineeController.instance;

  }

  get = async (req: Request, res: Response): Promise<void> => {
    const { skip, limit, sortBy } = req.query;
    delete req.query.skip;
    delete req.query.limit;
    delete req.query.sortBy;
    const queryParams = req.query.search;
    const newCHeck = queryString.parse(queryParams);
    const allData = await this.userRepository.get(skip, limit, sortBy, newCHeck);
    const countLength = allData.length;
    res.send(
      {
        Count: countLength,
        allData
      }

    );

  }

  put = async (req: Request, res: Response): Promise<void> => {
    const { id, dataToUpdate } = req.body;
    try {
      const data = await this.userRepository.update(id, dataToUpdate);
      SystemResponse.success(res, data, 'Trainee Data Updated');
    }
    catch (error) {
      SystemResponse.success(res, error, 'Invalid Input');

    }
  }

  post = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const emailLowerCase = email.toLowerCase();
      const checkForPreviousUser = await this.userRepository.findTheData({ email: emailLowerCase, deletedAt: undefined });
      if (!checkForPreviousUser) {
        const saltTable = 10;
        const loginPassword = await bcrypt.hash(password, saltTable);
        const passwordEncryptUser = Object.assign(req.body, { password: loginPassword, email: emailLowerCase });
        const user = await this.userRepository.create(passwordEncryptUser);

        SystemResponse.success(res, user, 'Trainee Created');
      }
      else {
        throw ({ error: 'Email already been used' });
      }
    }
    catch (error) {

      SystemResponse.success(res, error, 'Email already beene used');
    }
  }

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await this.userRepository.delete(id);
        if (user) {
            SystemResponse.success(res, user, 'Trainee Data Deleted');
        }
        else {
            SystemResponse.success(res, { user: 'Not Found' }, 'No data to delete');
        }
    }
    catch (error) {
        throw error;
    }
}
}
export default TraineeController.getInstance();

