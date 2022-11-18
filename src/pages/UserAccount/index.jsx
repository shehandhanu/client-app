import { DeleteOutlineOutlined, FileUploadOutlined } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewAccordion from "../../components/Accordion";
import BasicTable from "../../components/Table";
import {
  getMessages,
  getUserAccount,
  getUserFiles,
  saveMessage,
  uploadFile,
} from "../../redux/userSlice";

const MAX_MESSAGE_COUNT = "2000";

const UserAccount = () => {
  const dispatch = useDispatch();
  const userSlice = useSelector((state) => state.userSlice);
  const [userAccount, setUserAccount] = useState();
  const [userFiles, setUserFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [isMessageError] = useState(false);

  useEffect(() => {
    dispatch(getUserAccount());
    dispatch(getUserFiles());
    dispatch(getMessages());
  }, [dispatch]);

  useEffect(() => {
    setUserAccount(userSlice.userAccount);
  }, [userSlice.userAccount]);

  useEffect(() => {
    setUserFiles(userSlice.userFiles);
  }, [userSlice.userFiles]);

  useEffect(() => {
    setMessages(userSlice.messages);
  }, [userSlice.messages]);

  useEffect(() => {
    dispatch(getMessages());
    setMessage("");
  }, [dispatch, userSlice.message]);

  useEffect(() => {
    setFile(null);
    setFileName("");
    dispatch(getUserFiles());
  }, [dispatch, userSlice.fileUpload]);

  const changeValue = (e) => {
    setMessage(e.target.value);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setMessage("");
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    if (file) {
      let formData = new FormData();
      formData.append("file", file);
      dispatch(uploadFile(formData));
    }
  };

  const handleSaveMessage = (e) => {
    e.preventDefault();
    if (message) {
      dispatch(saveMessage({ message: message }));
    }
  };

  return (
    <>
      {userAccount && (
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5">
              Hi Good Evening, {userAccount.first_name} {userAccount.last_name}
            </Typography>
            <Badge
              color="warning"
              overlap="rectangular"
              badgeContent={userAccount.role}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              sx={{ ml: 4, mb: 1.75 }}
            />
          </Box>

          <Grid>
            <div class="wrapper">
              <div class="left">
                <h4>
                  {userAccount.first_name} {userAccount.last_name}
                </h4>
              </div>
              <div class="right">
                <div class="info">
                  <h3>Your Information</h3>
                  <div class="info_data">
                    <div class="data">
                      <h4>User Name</h4>
                      <p>{userAccount.user_name}</p>
                    </div>
                    <div class="data">
                      <h4>Email</h4>
                      <p>{userAccount.email}</p>
                    </div>
                    <div class="data">
                      <h4>Phone</h4>
                      <p>{userAccount.phone_number}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ mt: 2 }}>
                <Box>
                  <Typography sx={{ mb: 2 }} variant="h6">
                    Save Message
                  </Typography>
                  <TextField
                    label="Create a new message"
                    inputProps={{ maxLength: MAX_MESSAGE_COUNT }}
                    name="message"
                    onChange={changeValue}
                    multiline
                    maxRows={7}
                    rows={7}
                    fullWidth
                    placeholder="Enter the message"
                    value={message}
                    variant="filled"
                    helperText={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginLeft: 0,
                        }}
                      >
                        <Typography color={"#e91e63"}>
                          {isMessageError && "Test message"}
                        </Typography>
                        <Typography>
                          {message.trim().length}/ {MAX_MESSAGE_COUNT}
                        </Typography>
                      </Box>
                    }
                    FormHelperTextProps={{
                      style: { marginRight: 0, marginLeft: 0 },
                    }}
                  />
                </Box>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                >
                  {message.trim().length > 0 && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteOutlineOutlined />}
                      sx={{ mr: 1 }}
                      onClick={handleClear}
                    >
                      Clear
                    </Button>
                  )}
                  <Button variant="outlined" onClick={handleSaveMessage}>
                    Save Message
                  </Button>
                </Box>
                <Box>
                  <Typography sx={{ mb: 2 }} variant="h6">
                    Save Files
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Select the file/ files</Typography>

                    <Box>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        size="small"
                      >
                        <input
                          hidden
                          accept="image/*,.doc,.docx,application/pdf"
                          type="file"
                          multiple={false}
                          onChange={handleFileUpload}
                        />
                        <FileUploadOutlined />
                      </IconButton>
                      <Button
                        variant="outlined"
                        component="label"
                        size="small"
                        onClick={handleUploadFile}
                      >
                        Upload new files
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography sx={{ color: "#bdbdbd", fontSize: 12 }}>
                      {fileName}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box>
                <Box sx={{ mt: 2 }}>
                  <Typography component="span" variant="body1" sx={{ mb: 1 }}>
                    Saved Messages
                  </Typography>
                  <NewAccordion messages={messages} />
                </Box>

                <Box sx={{ mt: 2, mb: 4 }}>
                  <Typography sx={{ mb: 2 }} component="span" variant="body1">
                    Saved Files
                  </Typography>
                  <BasicTable userFiles={userFiles} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default UserAccount;
