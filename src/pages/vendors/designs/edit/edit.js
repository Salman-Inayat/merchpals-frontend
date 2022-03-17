import { useState, useEffect, useRef } from 'react';
import { Grid, Button, Backdrop } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL, dataURLtoFile, getJSONFromUrl } from '../../../../configs/const';
import LoggedInVendor from '../../../../layouts/LoggedInVendor';
import Editor from '../../../editor/Editor';
import BackButton from '../../../../components/backButton';
import store from '../../../../store';
import { clearDesign } from '../../../../store/redux/actions/design';
import {
  clearCanvas,
  updateFrontCanvasShape,
  updateBackCanvasShape,
} from '../../../../store/redux/actions/canvas';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const EditDesign = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { designId } = useParams();
  const [frontCanvasJSON, setFrontCanvasJSON] = useState();
  const [backCanvasJSON, setBackCanvasJSON] = useState();
  const [saveEditDesign, setSaveEditDesign] = useState();
  const childRef = useRef();
  const [designName, setDesignName] = useState('');

  const [designData, setDesignData] = useState();

  const [open, setOpen] = useState(false);

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
        setDesignName(response.data.design.name);

        dispatch(updateFrontCanvasShape(response.data.design.frontDesign?.shape));
        dispatch(updateBackCanvasShape(response.data.design.backDesign?.shape));

        if (response.data?.design?.backDesign?.designJson === '') {
          setBackCanvasJSON('');
        } else {
          console.log('JSON URL: ', response.data?.design?.backDesign?.designJson);
          getJSONFromUrl(response.data?.design?.backDesign?.designJson, (err, data) => {
            if (err !== null) {
              alert('Something went wrong: ' + err);
            } else {
              if (data !== 'empty response') {
                setBackCanvasJSON(data);
              } else {
                setBackCanvasJSON('');
              }
            }
          });
        }

        getJSONFromUrl(response.data?.design?.frontDesign?.designJson, (err, data) => {
          if (err !== null) {
            alert('Something went wrong: ' + err);
          } else {
            if (data !== 'empty response') {
              setFrontCanvasJSON(data);
            } else {
              setFrontCanvasJSON('');
            }
          }
        });
      })
      .catch(error => console.log({ error }));
  };

  const postDataToURL = async (url, data) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .put(url, data, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          console.log(error);
        });
    });

    return promise;
  };

  const finishDesignEdit = async () => {
    setOpen(true);
    await childRef.current.saveDesign();

    setTimeout(() => {
      const newDesign = store.getState().design.design;

      let data = {
        designName: newDesign?.front?.designName,
        canvasModes: {
          front: newDesign?.front != null ? true : false,
          back: newDesign?.back != null ? true : false,
        },
        shapes: {
          front: store.getState().canvas.frontShape,
          back: store.getState().canvas.backShape,
        },
      };

      axios
        .put(`${baseURL}/store/design/${designId}`, data, {
          headers: {
            Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
            'Content-Type': 'application/json',
          },
        })
        .then(async response => {
          const urls = response.data.response;

          const frontDesignVariant1 = urls[0].imageUrl;
          const frontDesignVariant2 = urls[1].imageUrl;
          const frontDesignVariant3 = urls[2].imageUrl;
          const frontDesignVariant4 = urls[3].imageUrl;
          const frontDesignVariant5 = urls[4].imageUrl;
          const frontDesignJson = urls[5].imageUrl;

          const frontJSONBlob = new Blob([JSON.stringify(newDesign?.front?.designJson || '')], {
            type: 'application/json',
          });

          const backJSONBlob = new Blob([JSON.stringify(newDesign?.back?.designJson || '')], {
            type: 'application/json',
          });

          console.log(newDesign?.front?.designImages[1]?.data);
          await postDataToURL(
            frontDesignVariant1,
            dataURLtoFile(
              newDesign?.front?.designImages[0]?.data || newDesign?.back?.designImages[0]?.data,
              `${
                newDesign?.front?.designImages[0]?.name || newDesign?.back?.designImages[0]?.name
              }.png`,
            ),
          );
          await postDataToURL(
            frontDesignVariant2,
            dataURLtoFile(
              newDesign?.front?.designImages[1]?.data || newDesign?.back?.designImages[1]?.data,
              `${
                newDesign?.front?.designImages[1]?.name || newDesign?.back?.designImages[1]?.name
              }.png`,
            ),
          );
          await postDataToURL(
            frontDesignVariant3,
            dataURLtoFile(
              newDesign?.front?.designImages[2]?.data || newDesign?.back?.designImages[2]?.data,
              `${
                newDesign?.front?.designImages[2]?.name || newDesign?.back?.designImages[2]?.name
              }.png`,
            ),
          );
          await postDataToURL(
            frontDesignVariant4,
            dataURLtoFile(
              newDesign?.front?.designImages[3]?.data || newDesign?.back?.designImages[3]?.data,
              `${
                newDesign?.front?.designImages[3]?.name || newDesign?.back?.designImages[3]?.name
              }.png`,
            ),
          );
          await postDataToURL(
            frontDesignVariant5,
            dataURLtoFile(
              newDesign?.front?.designImages[4]?.data || newDesign?.back?.designImages[4]?.data,
              `${
                newDesign?.front?.designImages[4]?.name || newDesign?.back?.designImages[4]?.name
              }.png`,
            ),
          );

          await postDataToURL(frontDesignJson, frontJSONBlob);

          const uploadbackDesignFiles = () => {
            const promise = new Promise((resolve, reject) => {
              if (newDesign?.back != null) {
                const backDesignVariant1 = urls[6].imageUrl;
                const backDesignVariant2 = urls[7].imageUrl;
                const backDesignJson = urls[8].imageUrl;

                postDataToURL(
                  backDesignVariant1,
                  dataURLtoFile(
                    newDesign?.back?.designImages[1]?.data || '',
                    `${newDesign?.back?.designImages[1]?.name || ''}.png`,
                  ),
                );
                postDataToURL(
                  backDesignVariant2,
                  dataURLtoFile(
                    newDesign?.back?.designImages[1]?.data || '',
                    `${newDesign?.back?.designImages[1]?.name || ''}.png`,
                  ),
                );

                postDataToURL(backDesignJson, backJSONBlob);
              }
              resolve();
            });
            return promise;
          };

          await uploadbackDesignFiles();

          dispatch(clearDesign());
          dispatch(clearCanvas());

          setOpen(false);

          navigate('/vendor/designs');
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
            {frontCanvasJSON !== undefined && backCanvasJSON !== undefined && (
              <Editor
                frontCanvasJSON={frontCanvasJSON}
                backCanvasJSON={backCanvasJSON}
                saveEditDesign={saveEditDesign}
                ref={childRef}
                designName={designName}
                title="Edit your design"
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
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoggedInVendor>
  );
};

export default EditDesign;
