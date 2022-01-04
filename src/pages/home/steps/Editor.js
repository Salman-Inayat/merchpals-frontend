import { Button, Grid } from '@mui/material';
import Editor from '../../editor/Editor';

const EditorStep = ({ nextStep = () => {}, exportBase64 = () => {} }) => {
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
        <Editor exportBase64={exportBase64} />
        <Button variant="contained" onClick={nextStep}>
          Proceed to Products
        </Button>
      </Grid>
    </Grid>
  );
};

export { EditorStep as default };
