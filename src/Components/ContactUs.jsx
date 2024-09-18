import React from 'react';
import working from '../assets/Images/_con.png';
import { useState } from 'react';
import { Modal, Box, Button, TextField, Typography, IconButton } from '@mui/material';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
export default function Contact() {
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    e.target.reset();
  };

  return (
    <>
      <section className="contact mx-72">
        <div className="container my-10 mx-auto">
          <Typography variant='h4' className="heading text-center text-black mb-10 text-3xl font-semibold">
            <HeadsetMicIcon fontSize='large' /> Contact <span className="text-coral">Me</span>
          </Typography>
          <div className="content flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-2xl p-6 mb-10">
            <div className="person  w-full md:w-2/4 mb-6 md:mb-0">
              <img src={working} className="w-full h-auto" alt="cabinet" />
            </div>
            <form onSubmit={handleSubmit} className="w-full md:w-2/4">
              <div className="infom flex flex-col space-y-4">
                <div className="field relative">
                  <TextField fullWidth label="Name" required variant="outlined" />
                </div>
                <div className="field relative">
                  <TextField fullWidth label="Email" type="email" required variant="outlined" />
                </div>
                <div className="field relative">
                  <TextField fullWidth label="Phone" type="number" required variant="outlined" />
                </div>
                <div className="field relative">
                  <TextField fullWidth label="Enter Query" required variant="outlined" />
                </div>
                <div className="message relative">
                  <TextField fullWidth label="Enter Message" multiline rows={5} required variant="outlined" />
                </div>
              </div>
              <div className="button-div flex justify-end mt-4">
                <Button type="submit" variant="contained" endIcon={<SendIcon />} className="bg-indigo-700 hover:bg-indigo-800 text-white">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <IconButton className="absolute top-2 right-2" onClick={() => setShowModal(false)}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className="mb-4">Thank you for contacting me!</Typography>
          <Typography>I will get back to you as soon as possible.</Typography>
          <div className="text-right mt-4">
            <Button variant="contained" onClick={() => setShowModal(false)} className="bg-indigo-700 hover:bg-indigo-800 text-white">
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
