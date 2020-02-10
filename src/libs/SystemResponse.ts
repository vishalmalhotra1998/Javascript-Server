export default class SystemResponse {
    static success = (res, data, message) => {
        return res.status(200).send({
            status: 'ok',
            message,
            data,
        });
    }
}