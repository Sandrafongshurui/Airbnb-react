import SiteHeader from "../../components/partials/siteHeaders/SiteHeaders";
import Footer from "../../components/partials/footer/Footer";
import { loadImageFromFile } from "./utils";
import CountrySelect from "../../components/mulCountrySelection/MulCountrySelection";

import { useForm, Controller } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, MenuItem, Paper, TextField } from "@mui/material";
import style from "./createListings.module.css";
import { toast } from "react-toastify";
import axios from "axios";

function CreateListings() {
    const navigate = useNavigate();
    const [selectedImages, setSelectedImages] = useState([]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            price: 0,
            beds: 0,
            bedrooms: 0,
            bathrooms: 0,
            address_1: "",
            address_2: "",
            country: "",
            state: "",
            postal_code: "",
            description: "",
        },
    });

    console.log(errors);

    const handleSelectImage = async (e) => {
        const images = e.target.files;
        let newImages = await Promise.all(
            [...images].map((image) => loadImageFromFile(image))
        );
        setSelectedImages([...selectedImages, ...newImages]);
    };
    const handleDeleteImage = (image) => {
        setSelectedImages(
            selectedImages.filter((item) => {
                return item !== image;
            })
        );
    };

    const handleFormSubmit = async(data) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/listing', data)
            console.log(response)
            toast.success(
                "Create listing successful",
                {
                    position: toast.POSITION.BOTTOM_CENTER
                }
            )
            navigate("/users/my/listings")
            
        } catch(error) {
            toast.error(
                error.message,
                {
                    position: toast.POSITION.BOTTOM_CENTER
                }
            )
        }
    }

    const handleCancel = (e) => {
        navigate("/users/my/listings")
    }

        return (
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className={"container-fluid p-0 align-items-center"}
            >

                <div className={"container-xxl mt-4"}>
                    <h4>Add photos to your listing</h4>

                    {selectedImages.map((image) => {
                        return (
                            <div
                                style={{
                                    width: "200px",
                                    marginRight: "20px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <img src={image} key={image} width={"200px"} />
                                <Button
                                    onClick={() => handleDeleteImage(image)}
                                    color={"error"}
                                >
                                    Delete
                                </Button>
                            </div>
                        );
                    })}

                    <p className={"text-secondary"}> Tips: png/jpeg only </p>

                    {
                        <Paper
                            className={
                                style.photoBox +
                                " d-flex align-items-center justify-content-center"
                            }
                        >
                            <Button component={"label"}>
                                Upload Photo
                                <input
                                    onChange={handleSelectImage}
                                    name={"file"}
                                    multiple
                                    accept={"image/jpeg, image/png"}
                                    type={"file"}
                                    hidden
                                />
                            </Button>
                        </Paper>
                    }
                </div>

                <div className={"container-xxl mt-4"}>
                    <h4>Basic info</h4>

                    <Paper
                        className={
                            style.photoBox +
                            " d-flex align-items-center justify-content-center"
                        }
                    >
                        <div className={"row w-100 mt-2"}>
                            <div className={"col-5"}>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Name is required",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "Max length exceeded",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            className={"mb-2"}
                                            label={"Name"}
                                            variant={"standard"}
                                            fullWidth
                                            error={errors.name ? true : false}
                                            {...field}
                                            helperText={
                                                errors.name && (
                                                    <p>{errors.name.message}</p>
                                                )
                                            }
                                        />
                                    )}
                                />

                                <Controller
                                    name="beds"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            name={"beds"}
                                            label={
                                                "How many beds can guest use?"
                                            }
                                            className={"mb-2"}
                                            select
                                            variant={"standard"}
                                            fullWidth
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                        </TextField>
                                    )}
                                />

                                <Controller
                                    name="bedrooms"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            name={"bedrooms"}
                                            label={
                                                "How many bedrooms can guests use?"
                                            }
                                            className={"mt-2"}
                                            select
                                            variant={"standard"}
                                            fullWidth
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                        </TextField>
                                    )}
                                />

                                <Controller
                                    name="bathrooms"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            name={"bathrooms"}
                                            label={"No of bathrooms"}
                                            className={"mt-2"}
                                            select
                                            variant={"standard"}
                                            fullWidth
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                        </TextField>
                                    )}
                                />

                                <Controller
                                    name="state"
                                    control={control}
                                    rules={{
                                        pattern: {
                                            value: /^[A-Za-z]+$/i,
                                            message:
                                                "Alphabetical characters only",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            className={"mb-2"}
                                            label={"State"}
                                            variant={"standard"}
                                            fullWidth
                                            error={errors.state ? true : false}
                                            {...field}
                                            helperText={
                                                errors.state && (
                                                    <p>
                                                        {errors.state.message}
                                                    </p>
                                                )
                                            }
                                        />
                                    )}
                                />
                            </div>

                            <div className={"col-1"}></div>
                            <div className={"col-5"}>
                                <Controller
                                    name="price"
                                    control={control}
                                    rules={{
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'Please enter a number',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...register("price", {
                                                required: true,
                                                min: 1,
                                                max: 100,
                                            })}
                                            {...field}
                                            required
                                            name={"price"}
                                            type={"number"}
                                            className={"mb-2"}
                                            label={"Price:"}
                                            variant={"standard"}
                                            fullWidth
                                            error={errors.price ? true : false}
                                            helperText={
                                                errors.name && (
                                                    <p>{errors.price.message}</p>
                                                )
                                            }
                                        />
                                    )}
                                />

                                <Controller
                                    name="address_1"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            required
                                            name={"address_1"}
                                            label={"Address_1"}
                                            className={"mb-2"}
                                            variant={"standard"}
                                            fullWidth
                                        />
                                    )}
                                />

                                <Controller
                                    name="address_2"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            name={"address_2"}
                                            label={"Address_2"}
                                            className={"mb-2"}
                                            variant={"standard"}
                                            fullWidth
                                        />
                                    )}
                                />

                                <Controller
                                    name="country"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            name={"country"}
                                            label={"Country"}
                                            className={"mb-2"}
                                            select
                                            variant={"standard"}
                                            fullWidth
                                        >
                                            <MenuItem value={"Singapore"}>Singapore</MenuItem>
                                            <MenuItem value={"Canada"}>Canada</MenuItem>
                                            <MenuItem value={"Brazil"}>Brazil</MenuItem>
                                            <MenuItem value={"Malaysia"}>Malaysia</MenuItem>
                                        </TextField>
                                    )}
                                />

                                <Controller
                                    name="postal_code"
                                    control={control}
                                    rules={{
                                        pattern: {
                                            valueAsNumber: true,
                                            message: 'Please enter a number',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            name={"postal_code"}
                                            label={"Postal code"}
                                            className={"mb-2"}
                                            variant={"standard"}
                                            fullWidth
                                            error={errors.price ? true : false}
                                            helperText={
                                                errors.name && (
                                                    <p>{errors.price.message}</p>
                                                )
                                            }
                                        />
                                    )}
                                />
                            </div>

                            <div className={"col-12 mb-4"}>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            name={"description"}
                                            label={"Descriptions:"}
                                            fullWidth
                                            variant={"standard"}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </Paper>

                    <div className={"mt-4 mb-4 d-flex justify-content-end"}>
                        <Button
                            onClick={handleCancel}
                            variant={"contained"}
                            className={"me-2"}
                            color={"inherit"}
                        >
                            Cancel
                        </Button>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>

                <Footer />
            </form>
        );
    };


export default CreateListings;
