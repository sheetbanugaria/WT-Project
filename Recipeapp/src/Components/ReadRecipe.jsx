import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ReadRecipe() {
    const { id } = useParams();
    const userId = window.localStorage.getItem('id');
    const [recipe, setRecipe] = useState({});
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/recipe/recipe-by-id/${id}`);
                setRecipe(result.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch recipe');
            }
        };

        const fetchSavedRecipes = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/recipe/saved-recipes/${userId}`);
                setSavedRecipes(result.data || []);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch saved recipes');
            }
        };

        fetchSavedRecipes();
        getRecipe();
    }, [id, userId]);

    const savedRecipe = async (recipeId) => {
        try {
            const result = await axios.put('http://localhost:3001/recipe', { userId, recipeId });
            setSavedRecipes(result.data.savedRecipes || []);
        } catch (err) {
            console.error(err);
            setError('Failed to save recipe');
        }
    };

    const deleteRecipe = async () => {
        try {
            await axios.delete(`http://localhost:3001/recipe/delete-recipe/${recipe._id}`);
            alert('Recipe deleted successfully');
        } catch (err) {
            console.error('Failed to delete recipe:', err);
            setError('Failed to delete recipe');
        }
    };
    

    const isRecipeSaved = (recipeId) => Array.isArray(savedRecipes) && savedRecipes.includes(recipeId);

    return (
        <div className='d-flex justify-content-center container mt-3'>
            <div className='p-2'>
                <img src={recipe.imageUrl} alt={recipe.name} style={{ width: 600, height: 400 }} />
            </div>
            <div className='p-2'>
                <h2>{recipe.name}</h2>
                <button
                    className='btn btn-warning me-2'
                    onClick={() => savedRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                >
                    {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
                </button>
                <button
                    className='btn btn-primary me-2'
                    onClick={() => navigate(`/recipe/edit/${recipe._id}`)}
                >
                    Edit
                </button>
                <button
                    className='btn btn-danger'
                    onClick={deleteRecipe}
                >
                    Delete
                </button>
                <h3>Ingredients</h3>
                <p>{recipe.ingredients}</p>
                <h3>Description</h3>
                <p>{recipe.description}</p>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
}

export default ReadRecipe;
