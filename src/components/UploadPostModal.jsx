import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UploadPost from './UploadPost';

export default function UploadPostModal({ open, handleClose }) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                minWidth: 600,
                outline: 'none'
            }}>
                <UploadPost />
            </Box>
        </Modal>
    );
}