import React from 'react';
import classes from './pulsingButton.module.css';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';


const PulsingButton = ({text, icon, onClick, linkPath, margint, marginm, bg}) => {
    console.log(linkPath)
    const useStyles = makeStyles(theme => ({
        buttonStyle: {
            backgroundColor: bg ? bg : '#116dff',
            marginTop: marginm,
            [theme.breakpoints.up('md')]: {
                marginTop: margint
            }
        }
    }))
    const styles = useStyles();
    const buttonContent = (
        <>
            {text && <p className={classes.buttonText}>{text}</p>}
            {icon && icon}
        </>
    )
    console.log(bg)
    if(linkPath !== undefined) {
        return (
            <Link to={linkPath} className={`${classes.pulsingButton} ${styles.buttonStyle}`} style={{background: `${bg}!important`}}>
                {buttonContent}
            </Link>
        )
    }
    else {
        return (
            <button onClick={onClick} className={`${classes.pulsingButton} ${styles.buttonStyle}`} style={{background: `${bg}!important`}}>
                {buttonContent}
            </button>
        )
    }
}
export default PulsingButton;