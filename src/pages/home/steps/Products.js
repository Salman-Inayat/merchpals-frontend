import { 
  Button,
  Grid, 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductCard from '../../../components/ProductCard';

const useStyles = makeStyles(() => ({
  footer: {
    backgroundColor: '#babdb3',
    maxWidth: '100%',
    position: 'fixed',
    bottom: '0',
    padding: '10px 0px'
  },
  btn: {
    color: '#fff',
    fontSize: '18px',
    '&:hover':{
      backgroundColor: '#aaa'
    }
  }
}))
const Products = ({
  nextStep = () => {},
}) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid container  justifyContent='center' alignItems='center' mt={5} pb={18}>
        <Grid item xs={8}  container  justifyContent='flex-start' alignItems='center' spacing={3}>
          <Grid mt={5} item>
              <ProductCard />
          </Grid>      
          <Grid mt={5} item>
              <ProductCard />
          </Grid>      
          <Grid mt={5} item>
              <ProductCard />
          </Grid>  
          <Grid mt={5} item>
              <ProductCard />
          </Grid>  
          <Grid mt={5} item>
              <ProductCard />
          </Grid>  
          <Grid mt={5} item>
              <ProductCard />
          </Grid>  
          <Grid mt={5} item>
              <ProductCard />
          </Grid>                          
        </Grid>
      </Grid>
      <Grid container justifyContent='center' alignItems='center' className={classes.footer}>
        <Button onClick={nextStep} className={classes.btn}>Continue</Button>
      </Grid>
    </Grid>
  )
}

export { Products as default }