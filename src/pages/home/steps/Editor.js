import { useState, useRef, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import Editor from '../../editor/Editor';
import { connect } from 'react-redux';
import { saveDesignJSON } from '../../../store/redux/actions/design';

const EditorStep = ({
  nextStep = () => {},
  exportBase64 = () => {},
  saveDesignJSON,
  design,
}) => {
  const [triggerExport, setTriggerExport] = useState(0);
  const childRef = useRef();
  const [canvasJSON, setCanvasJSON] = useState();

  const exportAndMove = () => {
    setTriggerExport(triggerExport + 1);
    saveDesignInJSON();
    nextStep();
  };

  const saveDesignInJSON = () => {
    const json = childRef.current.saveDesignInJSON();
    saveDesignJSON(json);
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
        spacing={3}
        style={{ marginTop: '20px' }}
      >
        <Editor
          exportBase64={exportBase64}
          triggerExport={triggerExport}
          ref={childRef}
          canvasJSON={design.json === '' ? undefined : design.json}
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

const mapDispatch = dispatch => ({
  saveDesignJSON: json => {
    dispatch(saveDesignJSON(json));
  },
});

const mapState = state => {
  const design = state.design;
  return { design };
};

export default connect(mapState, mapDispatch)(EditorStep);

// export { EditorStep as default };
