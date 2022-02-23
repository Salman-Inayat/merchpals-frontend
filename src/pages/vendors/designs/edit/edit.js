import { useState, useEffect, useRef } from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL, dataURLtoFile, getJSONFromUrl } from '../../../../configs/const';
import LoggedInVendor from '../../../../layouts/LoggedInVendor';
import Editor from '../../../editor/Editor';
import BackButton from '../../../../components/backButton';
import store from '../../../../store';

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
        getJSONFromUrl(response.data.design.designJson, (err, data) => {
          if (err !== null) {
            alert('Something went wrong: ' + err);
          } else {
            setCanvasJSON(data);
          }
        });
      })
      .catch(error => console.log({ error }));
  };

  const finishDesignEdit = () => {
    childRef.current.saveDesign();

    setTimeout(() => {
      const newDesign = store.getState().design.design;

      let form = new FormData();
      form.append('designName', newDesign.designName);
      form.append('designJson', newDesign.designJson);
      form.append(
        newDesign.designImages[0].name,
        dataURLtoFile(newDesign.designImages[0].data, `${newDesign.designImages[0].name}.png`),
      );
      form.append(
        newDesign.designImages[1].name,
        dataURLtoFile(newDesign.designImages[1].data, `${newDesign.designImages[1].name}.png`),
      );
      form.append(
        newDesign.designImages[2].name,
        dataURLtoFile(newDesign.designImages[2].data, `${newDesign.designImages[2].name}.png`),
      );
      form.append(
        newDesign.designImages[3].name,
        dataURLtoFile(newDesign.designImages[3].data, `${newDesign.designImages[3].name}.png`),
      );
      form.append(
        newDesign.designImages[4].name,
        dataURLtoFile(newDesign.designImages[4].data, `${newDesign.designImages[4].name}.png`),
      );

      for (var pair of form.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      axios
        .put(`${baseURL}/store/design/${designId}`, form, {
          headers: {
            Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          navigate('/vendor/designs');
        })
        .catch(error => console.log({ error }));
    }, 100);
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
