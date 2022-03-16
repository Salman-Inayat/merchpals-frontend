import React from 'react';
import {Grid, Typography, Stack} from '@mui/material'
import { ArrowForward } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import {
    check,
    half,
    half1,
    pay as paypic,
    phone,
    possible,
    twophones,
    yellow
} from '../../assets/img'
import { Link } from 'react-router-dom';
import SubFooter from '../../layouts/static/subfooter';
import Navbar from '../../layouts/static/navbar';
import PulsingButton from '../../components/pulsingButton/pulsingButton';

const useStyles = makeStyles(theme => ({
    homeWrapper: {
        backgroundColor: '#EEEEEE'
    },
    contentContainer: {
        margin: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            padding: '2rem 0'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '3rem 0'
        }
    },
    button: {
        backgroundColor: '#116dff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '50px',
        maxWidth: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem 1rem',
        marginTop: '55%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
            maxWidth: '250px',
            padding: '1.8rem 1.8rem',
            marginTop: '30%'
        }
    },
    smallText: {
        maxWidth: '150px',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        fontSize: '14px',
        [theme.breakpoints.up('md')]: {
            maxWidth: '250px'
        }
    },
    landingHeader: {
        fontSize: '35px',
        [theme.breakpoints.up('md')]: {
            fontSize: '3.6rem'
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '4.4rem'
        }
    },
    landingHeaderCol: {
        marginRight: '1.4rem',
        [theme.breakpoints.up('lg')]: {
            marginRight: '4rem'
        }
    },
    landingImage: {
        maxWidth: '140px',
        paddingTop: '6rem',
        [theme.breakpoints.up('md')]: {
            maxWidth: '250px',
        },
        [theme.breakpoints.up('lg')]: {
            paddingTop: '8rem',
            maxWidth: '220px',

        }
    },
    sectionBanner: {
        margin: 'auto',
        marginBottom: '2rem',
        [theme.breakpoints.up('md')]: {
            maxWidth: '1000px',
            borderRadius: '12px',
        }
    },
    section: {
        marginBottom: '3rem'
    },
    sectionHeader: {
        fontSize: '28px',
        marginBottom: '0',
        textAlign: 'center',
        [theme.breakpoints.up('lg')]: {
            fontSize: '40px'
        }
    },
    sectionImage: {
        margin: 'auto',
        overflowX: 'hidden',
        [theme.breakpoints.up('md')]: {
            marginTop: '3rem'
        }
    },
    sideImg: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    }
}))

const listData = [
    'shipping',
    'products',
    'payments',
    'tracking',
    'support',
    'delivery'
    
]

const Homepage = () => {

    const classes = useStyles();
    
    return (
        <Grid className={classes.homeWrapper}>
            
        <Navbar/>
<Grid 
    className={classes.contentContainer} 
    style={{paddingTop: '4rem', paddingBottom: '7rem'}} 
    gutterBottom>

        <Grid xs={6} md={4} className={classes.landingHeaderCol}>
            <Typography className={classes.landingHeader} variant='h2' style={{whiteSpace: 'nowrap'}}>Start selling merch</Typography>
            <Typography className={classes.landingHeader} variant='h2' style={{whiteSpace: 'nowrap'}}>in minutes</Typography>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            {/* <Link 
                className={classes.button} 
                style={{marginBottom: '.4rem'}} 
                to='/home'>
                Get Started
                
            </Link> */}
            <PulsingButton
                margint='42%'
                marginm='40%'
                linkPath='/home'
                text='Get Started'
                icon={<ArrowForward style={{marginLeft: '10px'}}/>}>
            </PulsingButton>
            <Typography 
                sx={{mt:2}}
                className={classes.smallText} 
                variant='p'>
                    Free. No credit card.
            </Typography>
            </div>
        </Grid>
        <Grid xs={6} md={8} className={classes.landingImage}>
            <img style={{boxShadow: '0px 0px 6px 8px rgba(17, 109, 255, .25)', borderRadius: '25px'}} src={phone} alt=''/>
        </Grid>
</Grid>

<img className={classes.sectionBanner} src={half} alt=''/>




<Grid display='flex' className={classes.contentContainer} style={{marginBottom: '2rem'}}>

    <Grid className={classes.section} xs={12} md={4}>
    <Typography className={classes.sectionHeader} variant='h3'>Create or Upload</Typography>
    <img
        className={classes.sectionImage}
        src={possible}
        alt=''/>
    </Grid>
    <Grid className={classes.section} xs={12} md={4}>
        <Typography className={classes.sectionHeader} variant='h3'>Sell with your store</Typography>
        <img
            className={classes.sectionImage}
            src={twophones} 
            alt=''/>
    </Grid>

    <Grid className={classes.section} sx={{mb:4}} xs={12} md={4}>
        <Typography className={classes.sectionHeader} variant='h3'>Collect your earnings</Typography>
        <img className={classes.sectionImage} src={paypic} alt=''/>
    </Grid>
</Grid>

<Grid className={classes.contentContainer}>
    <Grid className={classes.section} md={6} sx={{p: 2}}>
        <Typography
            className={classes.landingHeader}
            style={{marginBottom: '2rem', textAlign: 'center'}}
            variant='h3'>
                We do it all
        </Typography>

        <HomeList listItems={listData}/>
    </Grid>
    <Grid className={classes.sideImg} style={{maxWidth: '32%'}}>
        <img src={yellow} style={{marginTop: '4rem', borderRadius: '25px'}} alt=''/>
    </Grid>
</Grid>

<img className={classes.sectionBanner} src={half1} alt=''/>

<Grid sx={{mt:5}} style={{width: '100%'}} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
    <Typography
        className={classes.landingHeader}
        style={{marginBottom: '2rem', textAlign: 'center'}} 
        variant='h3'>
            Sell your merch now
    </Typography>
    <PulsingButton
        margint='10%'
        marginm='5%'
        linkPath='/home'
        text='Get Started'
        icon={<ArrowForward style={{marginLeft: '10px'}}/>}>
    </PulsingButton>
    
    <Typography 
        variant='p' 
        textAlign='center'
        sx={{mb: 12, mt: 2}}>
        Free. No credit card needed.
    </Typography>
</Grid>
    <SubFooter/>
</Grid>

    )   
}

const HomeList = ({listItems}) => {
    
    return (
        <Grid display='flex' flexDirection='row' flexWrap='wrap' style={{marginBottom: '2rem'}}>
            
            {listItems.map((itemText, i) => <ListItem text={itemText} key={i}/>)}
        </Grid>
    )
}
const listStyles = makeStyles(theme => ({
    listItemImg: {
        height: '30px',
        width: '30px',
        marginRight: '1rem',
        [theme.breakpoints.up('lg')]: {    
            height: '65px',
            width: '65px',
            marginRight: '2rem'
        }
    },
    listItem: {
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        marginLeft: '25%',
        marginBottom: '.6rem',
        [theme.breakpoints.up('md')]: {    
            padding: '.6rem',
        }
    },
    itemText: {
        fontSize: '1.6rem',
        fontWeight: '600',
        textTransform: 'capitalize',
        [theme.breakpoints.up('lg')]: {    
            padding: '.6rem',
            fontSize: '2rem',
            fontWeight: '600'
        }
    }
}))

const ListItem = ({text, className}) => {

    const classes = listStyles();

    return (
        <Stack className={classes.listItem} flexDirection='row' >
            <img className={classes.listItemImg}  src={check} alt='' width='70px' height='70px'/>
            <Typography className={classes.itemText}>{text}</Typography>
        </Stack>
    )
}


export default Homepage;