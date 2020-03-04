import { Request, Response } from 'express';
import UserRepository from './../../repositories/user/UserRepository';
import SystemResponse from './../../libs/SystemResponse';
class TraineeController {

  private userRepository = new UserRepository();
  static instance;

  static getInstance = (): TraineeController => {

    if (!TraineeController.instance) {
      return TraineeController.instance = new TraineeController();
    }

    return TraineeController.instance;

  }

  list = async (req: Request, res: Response): Promise<void> => {
    try {

      const { skip, limit, sortBy, ...query } = req.query;
      console.log(sortBy, query);
      const data = await this.userRepository.list(query, { skip, limit, sortBy });
      if (!data.length) {
        throw ({ error: 'No Data To Find' });

      }
      SystemResponse.success(res, { count: data.length, data }, 'Trainee Data Founded');
    }
    catch (error) {
      SystemResponse.failure(res, error);
    }

  }

  put = (req: Request, res: Response): void => {
    res.send(
      {
        id: '3',
        traineeName: 'Trainee3',
        reviewerName: 'Reviewer3'
      }

    );
  }

  post = (req: Request, res: Response): void => {
    res.send(
      {
        id: '1',
        traineeName: 'Trainee1',
        reviewerName: 'Reviewer1'
      }

    );
  }

  delete = (req: Request, res: Response): void => {
    res.send(
      {
        id: '1',
        traineeName: 'Trainee1',
        reviewerName: 'Reviewer1'
      }

    );
  }
}
export default TraineeController.getInstance();

