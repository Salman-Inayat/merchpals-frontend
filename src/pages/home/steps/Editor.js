import { useState, useRef, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import Editor from '../../editor/Editor';
import { connect } from 'react-redux';
import { clearDesign } from '../../../store/redux/actions/design';
import { useDispatch } from 'react-redux';

const EditorStep = ({ nextStep = () => {}, exportBase64 = () => {}, design }) => {
  const [triggerExport, setTriggerExport] = useState(0);
  const childRef = useRef();
  const dispatch = useDispatch();

  const exportAndMove = () => {
    setTriggerExport(triggerExport + 1);
    saveDesignToStore();
    nextStep();
  };

  const saveDesignToStore = () => {
    childRef.current.saveDesign();
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        item
        md={6}
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        // style={{ marginTop: '20px' }}
      >
        <Editor
          exportBase64={exportBase64}
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
        <Button
          variant="contained"
          onClick={exportAndMove}
          size="large"
          style={{ backgroungColor: '#116dff ', color: 'white' }}
        >
          Save &#38; Continue
        </Button>
      </Grid>
    </Grid>
  );
};

const mapState = state => {
  const design = state.design;
  return { design };
};

export default connect(mapState)(EditorStep);
