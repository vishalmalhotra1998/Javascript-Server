import { Request, Response } from 'express';
class TraineeController {

  static instance;

  static getInstance = (): TraineeController => {

    if (!TraineeController.instance) {
      return TraineeController.instance = new TraineeController();
    }

    return TraineeController.instance;

  }

  get = (req: Request, res: Response): void => {
    res.send(
      [{
        id: '1',
        traineeName: 'Trainee1',
        reviewerName: 'Reviewer1'
      },
      {
        id: '2',
        traineeName: 'Trainee2',
        reviewerName: 'Reviewer2'
      }]


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

