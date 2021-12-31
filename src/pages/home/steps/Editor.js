import { 
  Button,
  Grid, 
} from '@mui/material';
import Editor from "../../editor/Editor";

const EditorStep = ({
  nextStep = () => {}
}) => {
  return (
    <Grid container  justifyContent='center' alignItems='center'>
      <Grid item xs={2}></Grid>
      <Grid item xs={6}>
        <Editor />
        <Button variant="contained" onClick={nextStep}>Proceed to Products</Button>
      </Grid>
    </Grid>
    
  )
};

export { EditorStep as default }