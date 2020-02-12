export default (config) => {
  return (req, res, next) => {
    const arr: string[] = [];
    // Function for checking Key Validation
    const checkForOtherValues = (configKey, reqLocationKey, key, reqKeyValue): void => {
      if (configKey.string && typeof (reqLocationKey) !== 'string') {
        arr.push(`${key} should be String`);
      }
      if (configKey.number) {
        if (isNaN(reqLocationKey)) {
          arr.push(`${configKey.errorMessage}`);
        }
      }
      // If key contains regex module
      if (configKey.regex) {
        const regexString = new RegExp(configKey.regex);
        if (reqKeyValue.trim().length) {
          if (!regexString.test(reqKeyValue)) {
            arr.push(`Invalid ${key}`);
          }
        }
        else {
          arr.push(`${configKey.errorMessage}`);
        }
      }
      // If Key contains isObject and Checks the Object is retrived from Location
      if (configKey.isObject && !(typeof reqLocationKey === 'object')) {
        arr.push('Data is required of type object');
      }
      else {
        if (Array.isArray(reqLocationKey)) {
          arr.push('Data is required of type object');
        }
      }
      // If key Contains Custom function
      if (configKey.custom) {
        try {
          configKey.custom(reqLocationKey);
        }
        catch (err) {
          arr.push(err.error);
        }
      }
    };
    Object.keys(config).forEach(key => {
      // Check the In key for validations
      if (config[key].in) {
        config[key].in.forEach(location => {
          const reqKeyValue = req[location][key];
          if (config[key].required) {
            // if key is required
            checkForOtherValues(config[key], req[location][key], key, reqKeyValue);
          }
          else {
            // if key is not required
            if (req[location].hasOwnProperty(key)) {
              // if property exist
              checkForOtherValues(config[key], req[location][key], key, reqKeyValue);

            }
          }
        });
      }
    });
    arr.length ? next(arr) : next();
  };
};