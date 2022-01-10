import {useState} from 'react';
import { Button, Grid } from '@mui/material';
import Editor from '../../editor/Editor';

const EditorStep = ({ nextStep = () => {}, exportBase64 = () => {} }) => {
  const [triggerExport, setTriggerExport] = useState(0);

  const exportAndMove = () => {
    setTriggerExport(triggerExport + 1);
    nextStep()
  }
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        item
        md={6}
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
        style={{ marginTop: '20px' }}
      >
        <Editor exportBase64={exportBase64} triggerExport={triggerExport} />
        <Button variant="contained" onClick={exportAndMove}>
          Proceed to Products
        </Button>
      </Grid>
    </Grid>
  );
};

export { EditorStep as default };
