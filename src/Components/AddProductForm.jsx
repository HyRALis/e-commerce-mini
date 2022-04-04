import React, { useState } from 'react';

import { ALLOWED_VALUE, MIN_CHARS, MIN_VALUE, REQUIRED, VALID_URL } from '../Utils/consts';
import { useValidateField } from '../Utils/customHooks';

import Dropdown from '../UI layer/Dropdown';
import TextInput from '../UI layer/Form Elements/TextInput';

export default function AddProductForm({ states, categories }) {
    const formInitialData = {
        state: {
            value: null,
            validationTypes: [REQUIRED, ALLOWED_VALUE],
            allowedValues: states.map((state) => state.name)
        },
        categorie: {
            value: null,
            validationTypes: [REQUIRED, ALLOWED_VALUE],
            allowedValues: categories.map((categorie) => categorie.name)
        },
        title: { value: '', validationTypes: [REQUIRED, MIN_CHARS], minAllowedChars: 4 },
        imageUrl: { value: '', validationTypes: [REQUIRED, VALID_URL] },
        price: { value: 0, validationTypes: [REQUIRED, MIN_VALUE], minAllowedValue: 5 },
        description: { value: '', validationTypes: [] }
    };

    const [formState, setFormState] = useState(formInitialData.state);
    const [formCategorie, setFormCategorie] = useState(formInitialData.categorie);
    const [title, setTitle] = useState(formInitialData.title);
    const [imageUrl, setImageUrl] = useState(formInitialData.imageUrl);
    const [price, setPrice] = useState(formInitialData.price);
    const [description, setDescription] = useState(formInitialData.description);

    const [errors, setErrors] = useState({
        formState: '',
        formCategorie: '',
        title: '',
        imageUrl: '',
        price: '',
        description: ''
    });

    useValidateField(formState, 'formState', setErrors, errors);
    useValidateField(formCategorie, 'formCategorie', setErrors, errors);
    useValidateField(title, 'title', setErrors, errors);
    useValidateField(imageUrl, 'imageUrl', setErrors, errors);
    useValidateField(price, 'price', setErrors, errors);
    useValidateField(description, 'description', setErrors, errors);

    return (
        <form className="mt-5">
            <div className="row">
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>State</label>
                    <Dropdown
                        options={states}
                        selected={formState.value}
                        placeholder="Select state"
                        containerStyle={{ width: '100%' }}
                        onSelectChnage={({ name }) => {
                            setFormState({ ...formState, value: name });
                        }}
                    />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Categories</label>
                    <Dropdown
                        options={categories}
                        selected={formCategorie.value}
                        placeholder="Select category"
                        containerStyle={{ width: '100%' }}
                        onSelectChnage={({ name }) => {
                            setFormCategorie({ ...formCategorie, value: name });
                        }}
                    />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Tilte</label>
                    <TextInput
                        value={title.value}
                        onChange={(changedValue) => {
                            setTitle({ ...title, value: changedValue });
                        }}
                    />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Price</label>
                    <TextInput
                        value={price.value}
                        onChange={(changedValue) => {
                            setPrice({ ...price, value: changedValue });
                        }}
                    />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column mb-2">
                    <label>Image URL</label>
                    <TextInput
                        value={imageUrl.value}
                        onChange={(changedValue) => {
                            setImageUrl({ ...imageUrl, value: changedValue });
                        }}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button className="mt-5 custom__button">Add Product</button>
            </div>
        </form>
    );
}
