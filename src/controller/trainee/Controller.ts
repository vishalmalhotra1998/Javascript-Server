import { Request, Response } from 'express';
class TraineeController {

  static instance;

  static getInstance = () => {

    if (TraineeController.instance) {

      return TraineeController.instance;

    }

    return new TraineeController();

  }

  create = (req: Request, res: Response) => {

    res.send(
      [{
        id: '1',
        name: 'Trainee1'
      },
      {
        id: '2',
        name: 'Trainee2'
      }]


    );

  }

  put = (req: Request, res: Response) => {
    res.send(
      {
        id: '1',
        name: 'Trainee1'
      }

    );
  }

  post = (req: Request, res: Response) => {
    res.send(
      {
        id: '1',
        name: 'Trainee1'
      }

    );
  }

  delete = (req: Request, res: Response) => {
    res.send(
      {
        id: '1',
        name: 'Trainee1'
      }

    );
  }
}
export default TraineeController.getInstance();
