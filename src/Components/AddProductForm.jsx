import React, { useState } from 'react';

import { ALLOWED_VALUE, MIN_CHARS, MIN_VALUE, REQUIRED, VALID_URL } from '../Utils/consts';
import { validateField } from '../Utils/validation';
import { postProduct } from '../Utils/ajaxRequests';

import { useValidateField } from '../Utils/customHooks';

import Dropdown from '../UI layer/Dropdown';
import TextInput from '../UI layer/Form Elements/TextInput';

export default function AddProductForm({ states, categories, onAddProduct }) {
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
    const [errors, setErrors] = useState({
        state: '',
        category: '',
        title: '',
        picture: '',
        price: '',
        description: ''
    });

    useValidateField(formData, 'state', setErrors, errors);
    useValidateField(formData, 'category', setErrors, errors);
    useValidateField(formData, 'title', setErrors, errors);
    useValidateField(formData, 'picture', setErrors, errors);
    useValidateField(formData, 'price', setErrors, errors);
    useValidateField(formData, 'description', setErrors, errors);

    const addProduct = (e) => {
        e.preventDefault();

        let hasErrors = false;
        Object.keys(formData).forEach((key) => {
            const { isValid, errorMessage } = validateField(formData[key]);
            if (!isValid) {
                hasErrors = true;
                setErrors({ ...errors, [key]: errorMessage });
            }
        });

        if (!hasErrors) {
            const productState = states.find((state) => state.name === formData.state.value);
            const productCategory = categories.find((category) => category.name === formData.category.value);

            let dataToSend = {};

            Object.keys(formData).forEach((key) => {
                if (key !== 'category' && key !== 'state') {
                    dataToSend[key] = formData[key].value;
                }
            });
            dataToSend.stateId = productState.id;
            dataToSend.categoryId = productCategory.id;

            postProduct(dataToSend);
            onAddProduct(dataToSend);
        }
    };

    return (
        <form className="mt-5" onSubmit={addProduct}>
            <div className="row">
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>State</label>
                    <Dropdown
                        options={states}
                        selected={formData.state.value}
                        placeholder="Select state"
                        containerStyle={{ width: '100%' }}
                        onSelectChnage={({ name }) => {
                            // setFormState({ ...formState, value: name });
                            setFromData({ ...formData, state: { ...formData.state, value: name } });
                        }}
                    />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Categories</label>
                    <Dropdown
                        options={categories}
                        selected={formData.category.value}
                        placeholder="Select category"
                        containerStyle={{ width: '100%' }}
                        onSelectChnage={({ name }) => {
                            setFromData({ ...formData, category: { ...formData.category, value: name } });
                        }}
                    />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Tilte</label>
                    <TextInput
                        value={formData.title.value}
                        onChange={(changedValue) => {
                            setFromData({ ...formData, title: { ...formData.title, value: changedValue } });
                        }}
                    />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Price</label>
                    <TextInput
                        value={formData.price.value}
                        onChange={(changedValue) => {
                            setFromData({ ...formData, price: { ...formData.price, value: changedValue } });
                        }}
                    />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Image URL</label>
                    <TextInput
                        value={formData.picture.value}
                        onChange={(changedValue) => {
                            setFromData({ ...formData, picture: { ...formData.picture, value: changedValue } });
                        }}
                    />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Description</label>
                    <TextInput
                        value={formData.description.value}
                        onChange={(changedValue) => {
                            setFromData({ ...formData, description: { ...formData.description, value: changedValue } });
                        }}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <input type="submit" className="mt-5 custom__button" value="Add product" />
            </div>
        </form>
    );
}
