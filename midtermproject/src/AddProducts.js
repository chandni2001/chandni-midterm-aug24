import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import './css/AddProducts.css';

function AddProducts() {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState([{ code: "code", name: "name", excerpt: "Description", category: "Category", price: Number }]);

    const validationSchema = Yup.object({
        code: Yup.string().required("Code is required field"),
        name: Yup.string().min(3, "Name must be at least 3 characters").max(30, "Name must be at most 30 characters").required("Name is required field"),
        excerpt: Yup.string().required("Excerpt is required field"),
        description: Yup.string().min(30, "Description must be at least 30 characters").max(500, "Description must be at most 500 characters").required("Description is required field"),
        category: Yup.string().required("Category is required field"),
        price: Yup.number().required("Price is required field").positive("Price must be positive").max(100000, "Price cannot exceed 100,000"),
    });

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/categories")
            .then(response => {
                setCategories(response.data.categories); 
            })
            .catch(error => {
                console.error(error);
            });
    }, []); 

    const handleSubmit = (values, {resetForm}) => {
        axios.post("http://localhost:3000/api/v1/products", values)
            .then(function (response) {
                console.log(response);
                setData([...data, values]); 
                window.alert("Product successfully added!");
                resetForm(); 
            })
            .catch(function (err) {
                console.log(err);
                window.alert("Failed to add product.");
            });
    };

    // Function to generate a unique 6-digit code
    const generateUniqueCode = () => {
        let code = uuidv4().slice(0, 6).toUpperCase(); // Generate code and trim to 6 characters
        return code;
    };

    return (
        <Formik
            initialValues={{ code: "", name: "", excerpt: "", description: "", category: "", price: ""}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className="addproducts">
                    <h2>Add Products</h2>
                    <div>
                        <Field type="text" name="code" placeholder="Enter Product Code" />
                        <button
                            type="button"
                            onClick={() => setFieldValue("code", generateUniqueCode())}
                        >
                            Generate Code
                        </button>
                        <ErrorMessage name="code" component="div" className="error" />
                    </div>
                    <div>
                        <Field type="text" name="name" placeholder="Enter Product Name" />
                        <ErrorMessage name="name" component="div" className="error" />
                    </div>
                    <div>
                        <Field type="text" name="excerpt" placeholder="Enter Excerpt" />
                        <ErrorMessage name="excerpt" component="div" className="error" />
                    </div>
                    <div>
                        <Field as="textarea" name="description" placeholder="Enter Description" />
                        <ErrorMessage name="description" component="div" className="error" />
                    </div>
                    <div>
                        <Field as="select" name="category">
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="category" component="div" className="error" />
                    </div>
                    <div>
                        <Field type="number" name="price" placeholder="Enter the price" />
                        <ErrorMessage name="price" component="div" className="error" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default AddProducts;
