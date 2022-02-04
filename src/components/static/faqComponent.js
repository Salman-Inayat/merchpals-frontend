import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  mainAccordian: {
    fontWeight: '500 !important',
  },
}));
const Accordion = styled(props => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled(props => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function FAQ({ faq, index, toggleFAQ, className, state, setState }) {
  const classes = useStyles();
  return (
    <Grid className={className}>
      <Accordion
        className={classes.mainAccordian}
        expanded={faq.open ? true : false}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          onClick={() => toggleFAQ(index, state, setState)}
        >
          <Typography variant="h6">{faq.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid item md dangerouslySetInnerHTML={{ __html: faq.answer }}></Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

export default FAQ;
