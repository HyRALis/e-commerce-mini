import { useEffect, useRef } from 'react';

import { isValidValue } from './validation';

export const useOnUpdate = (callback, dependencies) => {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            callback();
        }
    }, dependencies);
};

export const useOnClickOutside = (ref, handler) => {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
};

export const useValidateField = (field, fieldName, setError, errors) => {
    const validateField = (field) => {
        if (!field.validationTypes) return true;

        let isValid = true;
        let errorMessage = '';
        for (let index = 0; index < field.validationTypes.length; index++) {
            if (!isValid) break;
            const validCheck = isValidValue(field, field.validationTypes[index]);
            isValid = validCheck.isValid;
            errorMessage = validCheck.errorMessage;
        }

        return { isValid, errorMessage };
    };

    useOnUpdate(() => {
        const { isValid, errorMessage } = validateField(field);
        if (!isValid) {
            setError({ ...errors, [fieldName]: errorMessage });
        } else {
            setError({ ...errors, [fieldName]: '' });
        }
    }, [field]);
};
