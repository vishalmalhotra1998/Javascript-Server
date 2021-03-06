const validEmail = (email: string): boolean => {
    const regex = /([a-zA-Z0-9\+_.])+@successive.tech/g;

    return regex.test(email);
};
export default validEmail;
