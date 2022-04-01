import React, { useState, useRef } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoggedInVendor from '../../../../layouts/LoggedInVendor';
import Editor from '../../../editor/Editor';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { connect } from 'react-redux';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateDesign = ({ design }) => {
  const navigate = useNavigate();
  const [triggerExport, setTriggerExport] = useState(0);
  const [displaySave, setDisplaySave] = useState(false);
  const [nameError, setNameError] = useState('');
  const [name, setName] = useState('');
  const childRef = useRef();

  const exportAndTriggerSave = () => {
    saveDesignToStore();
    setDisplaySave(true);
  };
  const saveDesignToStore = () => {
    childRef.current.saveDesign();
  };
  const handleSaveNameAndMove = () => {
    if (!name.trim()) {
      setNameError('Please enter a valid name');
      return;
    }

    navigate('/vendor/design/product-selection', { state: { name } });
  };

  // const handleClose = () => setDisplaySave(false);
  const handleClose = (event, reason) => {
    if (reason && reason == 'backdropClick') return;
    setDisplaySave(false);
  };

  return (
    <LoggedInVendor>
      <Grid mt={5} container mb={3} display="flex" justifyContent="center">
        <Grid item md={12} xs={12}>
          <Editor
            // exportBase64={exportBase64}
            triggerExport={triggerExport}
            ref={childRef}
            // canvasJSON={design.design.designJson === '' ? undefined : design.design.designJson}
            frontCanvasJSON={
              design.design?.front?.designJson === '' ? undefined : design.design?.front?.designJson
            }
            backCanvasJSON={
              design.design?.back?.designJson === '' ? undefined : design.design?.back?.designJson
            }
            title="Create your design"
          />
        </Grid>
        <Grid item md={2} xs={12}></Grid>
        <Grid
          mt={4}
          item
          md={12}
          display="flex"
          justifyContent="center"
          alignItems=" center"
        >
          <Button variant="contained" onClick={exportAndTriggerSave}>
            Save Design
          </Button>
        </Grid>
      </Grid>
      {displaySave && (
        <Grid xs={12} container item>
          <Dialog
            open={displaySave}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
          >
            <DialogTitle>{"Enter design's name!"}</DialogTitle>
            <DialogContent style={{ width: '500px' }}>
              <TextField
                id="outlined-basic"
                placeholder="Name"
                variant="outlined"
                helperText={nameError}
                style={{ marginTop: '15px' }}
                error={Boolean(nameError)}
                onChange={e => {
                  setName(e.target.value);
                  setNameError('');
                }}
                autoComplete="off"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSaveNameAndMove}>Save</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
    </LoggedInVendor>
  );
};
const mapState = state => {
  const design = state.design;
  return { design };
};

export default connect(mapState)(CreateDesign);
