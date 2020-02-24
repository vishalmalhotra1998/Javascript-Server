import { Request, Response } from 'express';
import * as queryString from 'query-string';
import UserRepository from './../../repositories/users/UserRepository';
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
    console.log(req.query);
    delete req.query.skip;
    delete req.query.limit;
    delete req.query.sortBy;
    const queryParams = req.query.search;
    const newCHeck = queryString.parse(queryParams);
    console.log(newCHeck);
    const allData = await this.userRepository.get(skip, limit, sortBy, newCHeck);
    const countLength = allData.length;
    res.send(
      {
        Count: countLength,
        allData
      }

    );

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
    console.log('Now this Last');
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

