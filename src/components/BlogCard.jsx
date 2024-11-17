import { Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const BlogCard = (props) => {
    const { blog, deleteBlog = () => {}, showDeleteIcon = true } = props;
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(blog.isFavorite);

    useEffect(() => {
        setFavorite(blog.isFavorite);  
    }, [blog.isFavorite]);

    const handleFavoriteClick = async () => {
        const newFavoriteStatus = !favorite;
        setFavorite(newFavoriteStatus);

        // Update the isFavorite status in Firestore
        const blogDoc = doc(db, 'blogs', blog.id);
        await updateDoc(blogDoc, { isFavorite: newFavoriteStatus });
    };

    return (
        <Card style={{ position: 'relative' }}>
            <CardMedia sx={{ height: 140 }} image={blog.image} title="green iguana" />
            {showDeleteIcon && (
                <IconButton
                    style={{ position: 'absolute', right: '10px', top: '5px' }}
                    aria-label="delete"
                    size="small"
                    onClick={() => deleteBlog(blog.id)}
                >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            )}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog.description}
                </Typography>
                <Chip label={blog.category} variant="outlined" />
            </CardContent>
            <CardActions>
                <IconButton color={favorite ? 'secondary' : 'default'} onClick={handleFavoriteClick}>
                    <FavoriteIcon />
                </IconButton>
                <Button color="secondary" variant="contained" onClick={() => navigate(`/viewblogs/${blog.id}`)}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
