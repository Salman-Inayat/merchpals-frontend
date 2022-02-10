import { useState, useEffect, useRef } from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../../../configs/const';
import LoggedInVendor from '../../../../layouts/LoggedInVendor';
import Editor from '../../../editor/Editor';
import BackButton from '../../../../components/backButton';
import { useSelector } from 'react-redux';

const EditDesign = () => {
  const navigate = useNavigate();
  const { designId } = useParams();
  const [canvasJSON, setCanvasJSON] = useState('');
  const [saveEditDesign, setSaveEditDesign] = useState();
  const childRef = useRef();

  const stateDesign = useSelector(state => state.design.design);
  let updatedDesign = stateDesign;

  const [designData, setDesignData] = useState();
  useEffect(() => {
    getDesign();
  }, [designId]);

  useEffect(() => {
    updatedDesign = stateDesign;
    console.log('Design changed in redux', updatedDesign);
  }, [stateDesign]);

  const getDesign = async () => {
    axios
      .get(`${baseURL}/store/design/${designId}`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        console.log('Design printing: ', response.data.design);
        setDesignData(response.data.design);
        setCanvasJSON(response.data.design.designJson);
      })
      .catch(error => console.log({ error }));
  };

  const finishDesignEdit = async () => {
    await childRef.current.saveDesign();

    localStorage.removeItem('design');

    setTimeout(() => {
      let form = new FormData();
      form.append('design', JSON.stringify(updatedDesign));
      form.append('name', 'Hello');

      console.log('Updated design: ', updatedDesign);

      axios
        .put(`${baseURL}/store/design/${designId}`, form, {
          headers: {
            Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log(response);

          localStorage.removeItem('designJSON');
          localStorage.removeItem('design');
          // setTimeout(() => {
          //   navigate('/vendor/designs');
          // }, 1000);
        })
        .catch(error => console.log({ error }));
    }, 4000);
  };

  return (
    <LoggedInVendor>
      <Grid mt={5} container>
        <BackButton />
        <Grid justifyContent="center" container>
          <Grid item md={2} xs={12}></Grid>
          <Grid item md={8} xs={12}>
            {canvasJSON && (
              <Editor
                canvasJSON={canvasJSON}
                saveEditDesign={saveEditDesign}
                ref={childRef}
                designName={designData.name}
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
