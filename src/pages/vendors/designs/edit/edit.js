import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../../../configs/const';
import LoggedInVendor from '../../../../layouts/LoggedInVendor';

const EditDesign = () => {
  const navigate = useNavigate();
  const { designId } = useParams();

  const [design, setDesign] = useState();
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
      .then(response => setDesign(response.data.design))
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
      </Grid>
    </LoggedInVendor>
  );
};

export default EditDesign;
