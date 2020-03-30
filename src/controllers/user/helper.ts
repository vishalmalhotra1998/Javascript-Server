import * as jwt from 'jsonwebtoken';
export const Token = (data, email, config) => {

            const _id = data.originalId;
            const role = data.role;
            const token = jwt.sign({ email, _id , role }, config.SECRET_KEY, { expiresIn: (60 * 60) / 4 });
            return token;

};
