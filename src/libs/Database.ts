import * as mongoose from 'mongoose';
class DataBase {
    static open = (mongoDbUrl: string) => {
        return new Promise((resolve, reject) => {
            mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
                if (err) {
                    console.log('Error In MongoDB Connection');
                    reject(err);
                }
                resolve();
            }).catch(error => (console.log(error)));
            console.log('Data Base Connected Successfully');
        });
    }
    static disconnect = () => {
        console.log('Mongoose is Disconnected');
        mongoose.connection.close();
    }
}
export default DataBase;