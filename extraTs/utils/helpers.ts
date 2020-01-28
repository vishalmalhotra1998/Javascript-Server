const validEmail = (email) => {
    const regex = /([a-zA-Z0-9\+_.])+@successive.tech/g;

    return regex.test(email);
}
//Export the valiEmail function
export default validEmail;
