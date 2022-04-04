import { ALLOWED_VALUE, MIN_CHARS, MIN_VALUE, REQUIRED, VALID_URL } from './consts';

// FORM VALIDATION
export const isValidValue = (
    { value, minAllowedValue = null, minAllowedChars = null, allowedValues = [] },
    validationType
) => {
    let isValid = true;
    let errorMessage = '';

    switch (validationType) {
        case REQUIRED:
            isValid = validateRequired(value);
            errorMessage = 'This field is required';
            break;
        case ALLOWED_VALUE:
            isValid = validateIsAllowedValue(value, allowedValues);
            errorMessage = `This value must be one of the following: ${allowedValues.join(',')}`;
            break;
        case MIN_CHARS:
            isValid = validateMinChars(value, minAllowedChars);
            errorMessage = `The value must have more than ${minAllowedChars} characters.`;
            break;
        case MIN_VALUE:
            isValid = validateMinValue(value, minAllowedValue);
            errorMessage = `The value must bigger than ${minAllowedValue}.`;
            break;
        case VALID_URL:
            isValid = validateUrl(value);
            errorMessage = `The value must be a valid URL. e.g. https://som...`;
            break;

        default:
            console.log('Please add new validation check');
    }

    return { isValid, errorMessage };
};

export const validateRequired = (value) => {
    return !!value;
};

export const validateIsAllowedValue = (value, arrayOfAllowedValues) => {
    return !!arrayOfAllowedValues.find((allowedValue) => value === allowedValue);
};

export const validateMaxChars = (value, maxAllowedChars) => {
    return value.length <= maxAllowedChars;
};

export const validateMinChars = (value, minAllowedChars) => {
    return value.length >= minAllowedChars;
};

export const validateMinValue = (value, minAllowedValue) => {
    return value > minAllowedValue;
};

export const validateUrl = (value) => {
    let url;

    try {
        url = new URL(value);
    } catch (_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
};
