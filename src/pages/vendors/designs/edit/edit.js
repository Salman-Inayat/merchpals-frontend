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
  const [frontCanvasJSON, setFrontCanvasJSON] = useState('');
  const [backCanvasJSON, setBackCanvasJSON] = useState('');
  const [saveEditDesign, setSaveEditDesign] = useState();
  const childRef = useRef();

  const [designData, setDesignData] = useState();

  useEffect(() => {
    getDesign();
  }, []);

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
        console.log('Store design: ', response.data.design);
        // getJSONFromUrl(response.data.design.designJson, (err, data) => {
        //   if (err !== null) {
        //     alert('Something went wrong: ' + err);
        //   } else {
        //     setCanvasJSON(data);
        //   }
        // });
        getJSONFromUrl(response.data.design.frontDesign.designJson, (err, data) => {
          if (err !== null) {
            alert('Something went wrong: ' + err);
          } else {
            setFrontCanvasJSON(data);
          }
        });
        getJSONFromUrl(response.data.design.backDesign.designJson, (err, data) => {
          if (err !== null) {
            alert('Something went wrong: ' + err);
          } else {
            setBackCanvasJSON(data);
          }
        });
      })
      .catch(error => console.log({ error }));
  };

  const postDataToURL = async (url, data) => {
    axios
      .put(url, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const finishDesignEdit = () => {
    childRef.current.saveDesign();

    setTimeout(() => {
      const newDesign = store.getState().design.design;

      let form = new FormData();
      form.append('designName', newDesign.designName);

      axios
        .put(`${baseURL}/store/design/${designId}`, form, {
          headers: {
            Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          const urls = response.data.response;

          const designaVariant1 = urls[0].imageUrl;
          const designaVariant2 = urls[1].imageUrl;
          const designaVariant3 = urls[2].imageUrl;
          const designaVariant4 = urls[3].imageUrl;
          const designaVariant5 = urls[4].imageUrl;
          const designJson = urls[5].imageUrl;

          const JSONBlob = new Blob([JSON.stringify(newDesign.designJson)], {
            type: 'application/json',
          });

          postDataToURL(
            designaVariant1,
            dataURLtoFile(newDesign.designImages[0].data, `${newDesign.designImages[0].name}.png`),
          );
          postDataToURL(
            designaVariant2,
            dataURLtoFile(newDesign.designImages[1].data, `${newDesign.designImages[1].name}.png`),
          );
          postDataToURL(
            designaVariant3,
            dataURLtoFile(newDesign.designImages[2].data, `${newDesign.designImages[2].name}.png`),
          );
          postDataToURL(
            designaVariant4,
            dataURLtoFile(newDesign.designImages[3].data, `${newDesign.designImages[3].name}.png`),
          );
          postDataToURL(
            designaVariant5,
            dataURLtoFile(newDesign.designImages[4].data, `${newDesign.designImages[4].name}.png`),
          );

          postDataToURL(designJson, JSONBlob);

          setTimeout(() => {
            navigate('/vendor/designs');
          }, 2000);
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
            {frontCanvasJSON && backCanvasJSON && (
              <Editor
                frontCanvasJSON={frontCanvasJSON}
                backCanvasJSON={backCanvasJSON}
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
