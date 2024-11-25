import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

export default function CommentSection() {
    const { id } = useParams();
    const avatar = Cookies.get('avatar');  // Avatar of the current user
    const [newComment, setNewComment] = useState('');
    const [oldComments, setOldComments] = useState([]);
    const [error, setError] = useState(''); // Error state

    // Fetch old comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/comment/${id}`);
                setOldComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [id]);

    // Submit new comment
    const handleCommentSubmit = async () => {
        try {
            const token = Cookies.get('token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/user/comment`,
                { id_game: id, comment: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNewComment('');
            setOldComments([...oldComments, { comment: newComment }]);
            setError(''); // Clear any previous error
        } catch (error) {
            setError('Please Login to comment'); // Set error message
            console.error('Error saving comment:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }}>
            {/* New Comment Input */}
            <FormControl>
                <FormLabel>New Comment</FormLabel>
                <Textarea
                    placeholder="Type something here…"
                    minRows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ minWidth: 300 }}
                />
                {error && (
                    <Typography color="danger" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
                <Button onClick={handleCommentSubmit} sx={{ mt: 2 }}>
                    Submit
                </Button>
            </FormControl>
            <Typography level="h2" sx={{ mb: 2 }}>Comments</Typography>

            {/* Old Comments Display */}
            <Box
                sx={{
                    mb: 3, maxHeight: 500,
                    overflowY: 'auto', // Enable vertical scrolling
                    border: '1px solid #ccc',
                    padding: 2
                }}
            >
                {oldComments.map((comment, index) => (
                    <Card key={index} variant="outlined" sx={{ mb: 2, p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography component="label" className='username' sx={{ fontWeight: 'bold' }}>
                                {comment.id_user ? (
                                    <>
                                        {/* Hiển thị ảnh avatar */}
                                        <img
                                            src={comment.id_user.avatarPath}
                                            alt={`${comment.id_user.first_name} ${comment.id_user.last_name}`}
                                            style={{ width: 40, height: 40, borderRadius: '50%' }}
                                        />
                                        {/* Hiển thị tên người dùng */}
                                        {comment.id_user.first_name} {comment.id_user.last_name}
                                    </>
                                ) : (
                                    <>
                                        {/* Nếu không có id_user, hiển thị avatar của người dùng hiện tại */}
                                        <img
                                            src={avatar || '/default-avatar.png'} // Default avatar if not available
                                            alt={`You`}
                                            style={{ width: 40, height: 40, borderRadius: '50%' }}
                                        />
                                          You
                                    </>
                                )}
                            </Typography>
                            <Typography level="body1" sx={{ ml: 1 }}>
                                {comment.comment}
                            </Typography>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
