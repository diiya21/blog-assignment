import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Alert from './Alert';
import useLocalStorage from '../hooks/useLocalStorage';
import { Box, Typography, Card, CardContent } from '@mui/material';

const FavoriteBlog = () => {
    const [currentUser, setCurrentUser] = useLocalStorage('current_user', null);
    const [blogsList, setBlogsList] = useState([]);
    const [alertConfig, setAlertConfig] = useState({});

    useEffect(() => {
        getFavoriteBlogs();
    }, []);

    const getFavoriteBlogs = async () => {
        const q = query(collection(db, 'blogs'), where('isFavorite', '==', true));  
        const blogsSnapshot = await getDocs(q);
        const extractedBlogs = blogsSnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        setBlogsList(extractedBlogs);
    };

    return (
        <Box padding="20px" display="flex" flexDirection="column" gap="20px">
            <Typography variant="h4">Favorite Blogs</Typography>
            {blogsList.length === 0 ? (
                <Typography variant="body1">No favorite blogs available.</Typography>
            ) : (
                blogsList.map((blog) => (
                    <Card key={blog.id} style={{ marginBottom: '10px' }}>
                        <CardContent>
                            <Typography variant="h6">{blog.title}</Typography>
                            <Typography variant="body2">{blog.description}</Typography>
                        </CardContent>
                    </Card>
                ))
            )}
            <Alert alertConfig={alertConfig} />
        </Box>
    );
};

export default FavoriteBlog;
