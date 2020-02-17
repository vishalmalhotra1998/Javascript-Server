export default (config) => {
  return (req, res, next) => {
    const arr: string[] = [];
    // Function for checking Key Validation
    const checkForOtherValues = (configKey, reqLocationKey, key): void => {
      if (configKey.string && typeof (reqLocationKey) !== 'string') {
        arr.push(`${key} should be String`);
      }
      else if (configKey.number) {
        if (isNaN(reqLocationKey)) {
          arr.push(`${configKey.errorMessage}`);
        }
      }
      else if (configKey.isObject && typeof reqLocationKey !== 'object') {// If Key contains isObject and Checks the Object is retrived from Location
        arr.push(`${key} is required of type object`);
      }
      else if (configKey.isObject && Array.isArray(reqLocationKey)) {
        arr.push(`${key} should not be in type Array`);
      }
      // If key contains regex module
      if (configKey.regex && configKey.regex.length) {
        const regexString = new RegExp(configKey.regex);
        reqLocationKey = typeof reqLocationKey === 'string' ? reqLocationKey.trim() : reqLocationKey;

        if (typeof reqLocationKey !== 'string' || (typeof reqLocationKey === 'string' && reqLocationKey.length)) {
          if (!regexString.test(reqLocationKey)) {
            arr.push(`Invalid ${key}`);
          }
        }
        else {
          arr.push(`${configKey.errorMessage}`);
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
          if (config[key].required) {// if key is required
            checkForOtherValues(config[key], req[location][key], key);
          }
          else {// if key is not required
            if (req[location].hasOwnProperty(key)) {// if property exist
              checkForOtherValues(config[key], req[location][key], key);

            }
          }
        });
      }
    });
    arr.length ? next(arr) : next();
  };
};