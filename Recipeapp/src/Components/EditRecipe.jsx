import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        ingredients: '',
        imageUrl: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/recipe/recipe-by-id/${id}`);
                setRecipe(result.data || {}); 
            } catch (err) {
                console.error(err);
                setError('Failed to fetch recipe');
            }
        };
        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/recipe/edit-recipe/${id}`, recipe);
            alert('Recipe updated successfully');
            navigate(`/read-recipe/${id}`);
        } catch (err) {
            console.error('Failed to update recipe:', err);
            setError('Failed to update recipe');
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='p-3 border border-1 w-25'>
            <h3>Edit Recipe</h3>
            <form onSubmit={handleSubmit}>
                <div className='mt-3'>
                    <label htmlFor="name">Name</label>
                    <input
                    type="text"
                    placeholder='Enter Name'
                    className='form-control'
                    name='name'
                    value={recipe.name || ''} 
                    onChange={handleChange}
                  />
                </div>
                <div className='mt-3'>
                    <label htmlFor="desc">Description</label>
                    <input
                    type="text"
                    placeholder='Enter Description'
                    className='form-control'
                    name='description'
                    value={recipe.description || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='mt-3'>
                    <label htmlFor="ingr">Ingredients</label>
                    <input
                    type="text"
                    placeholder='Enter Ingredients'
                    className='form-control'
                    name='ingredients'
                    value={recipe.ingredients || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='mt-3'>
                    <label htmlFor="iamgeUrl">Image URL</label>
                    <input
                    type="text"
                    placeholder='Enter URL'
                    className='form-control'
                    name='imageUrl'
                    value={recipe.imageUrl || ''}
                    onChange={handleChange}
                  />
                </div>
                <button className='mt-1 btn btn-success w-100'>Update Recipe</button>
            </form>
        </div>
    </div>  
    );
}

export default EditRecipe;
