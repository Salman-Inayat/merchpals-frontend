import React, { useState } from 'react';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateDesign = () => {
  const navigate = useNavigate();
  const [triggerExport, setTriggerExport] = useState(0);
  const [displaySave, setDisplaySave] = useState(false);
  const [nameError, setNameError] = useState('');
  const [name, setName] = useState('');

  const exportAndTriggerSave = () => {
    setTriggerExport(triggerExport + 1);
    setDisplaySave(true);
  };

  const handleSaveNameAndMove = () => {
    if (!name.trim()) {
      setNameError('Please enter a valid name');
      return;
    }

    navigate('/vendor/design/product-selection', { state: { name } });
  };

  const handleClose = () => setDisplaySave(false);

  return (
    <LoggedInVendor>
      <Grid mt={5} container>
        <Grid justifyContent="flex-start" container>
          <Button onClick={() => navigate('/vendor/designs')}>
            Back to designs
          </Button>
        </Grid>
        <Grid justifyContent="center" container>
          <Grid item>
            <Editor triggerExport={triggerExport} />
          </Grid>
          <Grid mt={4} item>
            <Button variant="contained" onClick={exportAndTriggerSave}>
              Save Design
            </Button>
          </Grid>
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

export default CreateDesign;
