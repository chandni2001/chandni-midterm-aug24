import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Paper, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Category = () => {
    const [category, setCategory] = useState({ name: "", description: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/v1/categories", category, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessage("Category added successfully!");
            setCategory({ name: "", description: "" }); 
            setTimeout(() => {
                navigate("/admin/add-product"); 
            }, 2000); 
        } catch (error) {
            console.error("Error adding category:", error);
            setMessage("Error adding category.");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Add Category
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Category Name"
                                name="name"
                                value={category.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Description"
                                name="description"
                                value={category.description}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Add Category
                            </Button>
                        </Grid>
                    </Grid>
                    {message && (
                        <Typography variant="body1" align="center" sx={{ marginTop: 2, color: message.includes("Error") ? "error.main" : "success.main" }}>
                            {message}
                        </Typography>
                    )}
                </form>
            </Paper>
        </Container>
    );
};

export default Category;
