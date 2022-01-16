import { useState, useEffect, useRef } from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../../../configs/const';
import LoggedInVendor from '../../../../layouts/LoggedInVendor';
import Editor from '../../../editor/Editor';

const EditDesign = () => {
  const navigate = useNavigate();
  const { designId } = useParams();
  const [canvasJSON, setCanvasJSON] = useState('');
  const [saveEditDesign, setSaveEditDesign] = useState();
  const childRef = useRef();

  const [designData, setDesignData] = useState();
  useEffect(() => {
    getDesign();
  }, [designId]);

  const getDesign = async () => {
    axios
      .get(`${baseURL}/store/design/${designId}`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        setDesignData(response.data.design);
        setCanvasJSON(response.data.design.canvasJson);
      })
      .catch(error => console.log({ error }));
  };

  const finishDesignEdit = () => {
    localStorage.removeItem('design');
    childRef.current.saveDesign();

    const data = {
      design: JSON.stringify({
        base64Image: localStorage.getItem('design'),
        canvasJson: localStorage.getItem('designJSON'),
        name: designData.name,
        designId,
      }),
    };

    axios
      .put(`${baseURL}/store/design/${designId}`, data, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        console.log(response);

        localStorage.removeItem('designJSON');
        localStorage.removeItem('design');
        setTimeout(() => {
          navigate('/vendor/designs');
        }, 1000);
      })
      .catch(error => console.log({ error }));
  };

  return (
    <LoggedInVendor>
      <Grid mt={5} container>
        <Grid justifyContent="flex-start" container>
          <Button onClick={() => navigate('/vendor/designs')}>
            Back to designs
          </Button>
        </Grid>
        <Grid justifyContent="center" container>
          <Grid item md={2} xs={12}></Grid>
          <Grid item md={8} xs={12}>
            {canvasJSON && (
              <Editor
                canvasJSON={canvasJSON}
                saveEditDesign={saveEditDesign}
                ref={childRef}
              />
            )}
          </Grid>
          <Grid item md={2} xs={12}></Grid>
          <Grid mt={4} item>
            <Button variant="contained" onClick={finishDesignEdit}>
              Save Design
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </LoggedInVendor>
  );
};

export default EditDesign;
