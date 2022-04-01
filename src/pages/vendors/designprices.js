import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoggedInVendor from '../../layouts/LoggedInVendor';
import { baseURL } from '../../configs/const';
import { useMediaQuery } from 'react-responsive';
import EditDesign from './designs/edit/products';
import VendorDesigns from './designs/designs';

const DesignPrices = () => {
    const navigate = useNavigate();
    const [designs, setDesigns] = useState([]);
    const [designImage, setDesignImage] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [activeDesign, setActiveDesign] = useState()
    const [snackBarToggle, setSnackBarToggle] = useState({
        visible: false,
        type: 'success',
        message: 'Desgin added successfully'
    });

    // const classes = useStyle();
    const getDesigns = async () => {
        axios
            .get(`${baseURL}/store/designs`, {
                headers: {
                    Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
                },
            })
            .then(response => {
                const designs = response.data.designs;
                console.log(designs)
                designs.map(design => {
                    setDesignImage(prevState => [
                        ...prevState,
                        {
                            id: design._id,
                            url: design.frontDesign.designImages[4].imageUrl
                        }
                    ]);
                });
                setDesigns(response.data.designs);
                setFetched(true);
                setActiveDesign(response.data.designs[0]._id)
            })
            .catch(error => console.log({error}))
    }

    const handleSetDesign = (design) => {
        console.log(design)
        setActiveDesign(design._id)
    }

    useEffect(() => {
        getDesigns()
    }, [])
    console.log(activeDesign)
    return (
        <div>
            <VendorDesigns ndesigns={designs} designImage={designImage} activeDesign={activeDesign} fetched={fetched} setDesign={handleSetDesign}/>
            {activeDesign && <EditDesign designId={activeDesign}/>}
        </div>
    )
}

export default DesignPrices;