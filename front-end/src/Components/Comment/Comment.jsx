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
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';

export default function CommentSection() {
    const { id } = useParams();
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [newComment, setNewComment] = useState('');
    const [oldComments, setOldComments] = useState([]);

    // Fetch old comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/me/comment/${id}`);
                setOldComments(response.data); // Assuming the response is an array of comments
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [id]);

    const handleCommentSubmit = async () => {
        try {
            const token = Cookies.get('token');
            await axios.post('http://localhost:8081/me/comment',
                { id_game: id, comment: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNewComment('');
            setOldComments([...oldComments, { comment: newComment }]);
            console.log('Comment saved successfully');
        } catch (error) {
            console.error('Error saving comment:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            {/* New Comment Input */}
            <FormControl>
                <FormLabel>New Comment</FormLabel>
                <Textarea
                    placeholder="Type something here…"
                    minRows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    endDecorator={
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 'var(--Textarea-paddingBlock)',
                                pt: 'var(--Textarea-paddingBlock)',
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                flex: 'auto',
                            }}
                        >
                            <IconButton
                                variant="plain"
                                color="neutral"
                                onClick={(event) => setAnchorEl(event.currentTarget)}
                            >
                                <FormatBold />
                                <KeyboardArrowDown fontSize="md" />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                size="sm"
                                placement="bottom-start"
                                sx={{ '--ListItemDecorator-size': '24px' }}
                            >
                                {['200', 'normal', 'bold'].map((weight) => (
                                    <MenuItem
                                        key={weight}
                                        selected={fontWeight === weight}
                                        onClick={() => {
                                            setFontWeight(weight);
                                            setAnchorEl(null);
                                        }}
                                        sx={{ fontWeight: weight }}
                                    >
                                        <ListItemDecorator>
                                            {fontWeight === weight && <Check fontSize="sm" />}
                                        </ListItemDecorator>
                                        {weight === '200' ? 'lighter' : weight}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <IconButton
                                variant={italic ? 'soft' : 'plain'}
                                color={italic ? 'primary' : 'neutral'}
                                aria-pressed={italic}
                                onClick={() => setItalic((bool) => !bool)}
                            >
                                <FormatItalic />
                            </IconButton>
                            <Button onClick={handleCommentSubmit} sx={{ ml: 'auto' }}>
                                Send
                            </Button>
                        </Box>
                    }
                    sx={[
                        {
                            minWidth: 300,
                            fontWeight,
                        },
                        italic ? { fontStyle: 'italic' } : { fontStyle: 'initial' },
                    ]}
                />
            </FormControl>
            <Typography level="h2" sx={{ mb: 2 }}>Comments</Typography>

            {/* Old Comments Display */}
            <Box sx={{ mb: 3 }}>
                {oldComments.map((comment, index) => (
                    <Card key={index} variant="outlined" sx={{ mb: 2, p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography component="label" className='username' sx={{ fontWeight: 'bold' }}>
                                {comment.id_user.first_name} {comment.id_user.last_name}
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
