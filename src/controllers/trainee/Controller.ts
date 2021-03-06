import { Request, Response } from 'express';
import UserRepository from './../../repositories/user/UserRepository';
import SystemResponse from './../../libs/SystemResponse';
import * as bcrypt from 'bcrypt';
import IRequest from './../../libs/routes/IRequest';
import { searching } from './helper';
import * as  queryString from 'query-string';

class TraineeController {

  private userRepository: UserRepository = new UserRepository();
  static instance;

  static getInstance = (): TraineeController => {

    if (!TraineeController.instance) {
      return TraineeController.instance = new TraineeController();
    }

    return TraineeController.instance;

  }

  list = async (req: Request, res: Response): Promise<void> => {
    const { skip, limit, sortBy, search, ...query } = req.query;
    const queryStringObj = queryString.parse(search);
    const searchObject = JSON.parse(JSON.stringify(queryStringObj));
    const keysOfSearchObject = Object.keys(searchObject);
    try {
      if (keysOfSearchObject.length) {
         const searchedObj = searching(searchObject);
         const data = await this.userRepository.list(searchedObj, { skip, limit, sortBy });
         if (!data.length) {
          throw ({ message: 'No Data To Find' });

        }
        SystemResponse.success(res, { count: data.length, data }, 'Trainee Data Founded');
      }
      else {
        const data = await this.userRepository.list(query, { skip, limit, sortBy });
        if (!data.length) {
          throw ({ message: 'No Data To Find' });

        }
        SystemResponse.success(res, { count: data.length, data }, 'Trainee Data Founded');
      }
    }
    catch (error) {
      SystemResponse.failure(res, error);
    }
  }

  put = async (req: IRequest, res: Response): Promise<void> => {
    const { id, dataToUpdate } = req.body;
    const { originalId: authId } = req.user;
    try {
      const data = await this.userRepository.update({ id, authId }, dataToUpdate);
      if (!data) {
        throw ({ message: 'Not found' });
      }
      SystemResponse.success(res, data, 'Trainee Data Updated');
    }
    catch (error) {
      SystemResponse.failure(res, error);

    }
  };

  post = async (req: IRequest, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const emailLowerCase = email.toLowerCase();
      const checkForPreviousUser = await this.userRepository.get({ email: emailLowerCase});
      if (checkForPreviousUser) {
        throw ({ message: 'Email already been used' });
      }
      const saltTable = 10;
      const loginPassword = await bcrypt.hash(password, saltTable);
      const user = Object.assign(req.body, { password: loginPassword, email: emailLowerCase });
      const { originalId: authId } = req.user;
      const data = await this.userRepository.create( user, authId );
      SystemResponse.success(res, data, 'Trainee Created');
    }
    catch (error) {

      SystemResponse.failure(res, error);
    }
  };

  delete = async (req: IRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { originalId: authId } = req.user;
      const user = await this.userRepository.delete({ id, authId });
      if (!user) {
        throw ({ message: 'Not Found' });
      }
      SystemResponse.success(res, user, 'Trainee Data Deleted');
    }
    catch (error) {
      SystemResponse.failure(res, error);
    }
  };

}
export default TraineeController.getInstance();

