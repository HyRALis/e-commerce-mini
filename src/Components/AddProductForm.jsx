import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addProduct } from '../Store/Actions/mainActions';
import { setIsAddProductModalOpen } from '../Store/Actions/homeActions';
import { ALLOWED_VALUE, MIN_CHARS, MIN_VALUE, REQUIRED, VALID_URL } from '../Utils/consts';
import { validateField } from '../Utils/validation';

import { useValidateField, useOnUpdate } from '../Utils/customHooks';

import Dropdown from '../UI layer/Dropdown';
import TextInput from '../UI layer/Form Elements/TextInput';
import ErrorMessage from '../UI layer/Form Elements/ErrorMessage';

const initialErrors = {
    state: '',
    category: '',
    title: '',
    picture: '',
    price: '',
    description: ''
};

export default function AddProductForm() {
    const dispacth = useDispatch();

    const states = useSelector(({ global }) => global.states);
    const categories = useSelector(({ global }) => global.categories);

    const formInitialData = {
        state: {
            value: null,
            validationTypes: [REQUIRED, ALLOWED_VALUE],
            allowedValues: states.map((state) => state.name)
        },
        category: {
            value: null,
            validationTypes: [REQUIRED, ALLOWED_VALUE],
            allowedValues: categories.map((category) => category.name)
        },
        title: { value: '', validationTypes: [REQUIRED, MIN_CHARS], minAllowedChars: 4 },
        picture: { value: '', validationTypes: [REQUIRED, VALID_URL] },
        price: { value: 0, validationTypes: [REQUIRED, MIN_VALUE], minAllowedValue: 4 },
        description: { value: '', validationTypes: [] }
    };

    const [formData, setFromData] = useState(formInitialData);
    const [errors, setErrors] = useState(initialErrors);

    useValidateField(formData, 'state', setErrors, []);
    useValidateField(formData, 'category', setErrors, []);
    useValidateField(formData, 'title', setErrors, []);
    useValidateField(formData, 'picture', setErrors, []);
    useValidateField(formData, 'price', setErrors, [formData.state]);
    useValidateField(formData, 'description', setErrors, []);

    const memoizedProductState = useMemo(
        () => states.find((state) => state.name === formData.state.value),
        [states, formData.state.value]
    );
    const memoizedProductCategory = useMemo(
        () => categories.find((category) => category.name === formData.category.value),
        [categories, formData.category.value]
    );

    useOnUpdate(() => {
        const minAllowedValue = memoizedProductState.tax > 0.25 ? 7 : 4;
        setFromData((currentFormData) => ({
            ...currentFormData,
            price: { ...currentFormData.price, minAllowedValue }
        }));
    }, [formData.state]);

    const postProduct = async (e) => {
        e.preventDefault();

        let hasErrors = false;

        Object.keys(formData).forEach((key) => {
            const { isValid, errorMessage } = validateField(formData[key]);
            hasErrors = !isValid;
            hasErrors && setErrors((currentErrors) => ({ ...currentErrors, [key]: errorMessage }));
        });

        if (!hasErrors) {
            dispacth(addProduct(requestBodyFromFormData()));
            dispacth(setIsAddProductModalOpen(false));
        }
    };

    const requestBodyFromFormData = () => {
        let requestBody = {};

        Object.keys(formData).forEach((key) => {
            if (key !== 'category' && key !== 'state') {
                requestBody[key] = formData[key].value;
            }
        });
        requestBody.stateId = memoizedProductState.id;
        requestBody.categoryId = memoizedProductCategory.id;

        return requestBody;
    };

    return (
        <form className="mt-5" onSubmit={postProduct}>
            <div className="row">
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>State *</label>
                    <Dropdown
                        options={states}
                        selected={formData.state.value}
                        placeholder="Select state"
                        containerStyle={{ width: '100%' }}
                        hasError={errors.state}
                        onSelectChange={({ name }) => {
                            setFromData((currentFormData) => ({
                                ...currentFormData,
                                state: { ...formData.state, value: name }
                            }));
                        }}
                    />
                    {errors.state && <ErrorMessage errorMessage={errors.state} />}
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Categories *</label>
                    <Dropdown
                        options={categories}
                        selected={formData.category.value}
                        placeholder="Select category"
                        containerStyle={{ width: '100%' }}
                        hasError={errors.category}
                        onSelectChange={({ name }) => {
                            setFromData((currentFormData) => ({
                                ...currentFormData,
                                category: { ...formData.category, value: name }
                            }));
                        }}
                    />
                    {errors.category && <ErrorMessage errorMessage={errors.category} />}
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Tilte *</label>
                    <TextInput
                        value={formData.title.value}
                        hasError={errors.title}
                        onChange={(changedValue) => {
                            setFromData((currentFormData) => ({
                                ...currentFormData,
                                title: { ...formData.title, value: changedValue }
                            }));
                        }}
                    />
                    {errors.title && <ErrorMessage errorMessage={errors.title} />}
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Price *</label>
                    <TextInput
                        type="number"
                        value={formData.price.value}
                        hasError={errors.price}
                        onChange={(changedValue) => {
                            setFromData((currentFormData) => ({
                                ...currentFormData,
                                price: { ...formData.price, value: parseFloat(changedValue) }
                            }));
                        }}
                    />
                    {errors.price && <ErrorMessage errorMessage={errors.price} />}
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Image URL *</label>
                    <TextInput
                        value={formData.picture.value}
                        hasError={errors.picture}
                        onChange={(changedValue) => {
                            setFromData((currentFormData) => ({
                                ...currentFormData,
                                picture: { ...formData.picture, value: changedValue }
                            }));
                        }}
                    />
                    {errors.picture && <ErrorMessage errorMessage={errors.picture} />}
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Description</label>
                    <TextInput
                        value={formData.description.value}
                        hasError={errors.description}
                        onChange={(changedValue) => {
                            setFromData((currentFormData) => ({
                                ...currentFormData,
                                description: { ...formData.description, value: changedValue }
                            }));
                        }}
                    />
                    {errors.description && <ErrorMessage errorMessage={errors.description} />}
                </div>
                <div className="col-12 fs-6">* - required fields</div>
            </div>
            <div className="d-flex justify-content-center">
                <input type="submit" className="mt-5 custom__button" value="Add product" />
            </div>
        </form>
    );
}
