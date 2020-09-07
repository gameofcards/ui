import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CreateGame from './CreateGame';
import JoinGame from './JoinGame';
import { Mutation, Query } from 'react-apollo';
import { TEST_CACHE_QUERY } from '../../graphql/queries';
import { INIT_CACHE_MUTATION } from '../../graphql/mutations';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      height: '100vh',
    },
    left: {
      margin: theme.spacing(4, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    right: {
      
    }
  })
);

export default () => {

  const classes = useStyles();

  const LeftSide: React.FunctionComponent = () =>
    <Grid item xs={false} sm={4} md={7}> 
      <div className={classes.left}>
        <Typography variant="h1" component="h2" color="primary">
          Always Blue
        </Typography>
        <div className="bigball blue"></div>
      </div>

      <Query query={TEST_CACHE_QUERY}>
        {(result: any) => <div>{JSON.stringify(result.data)}</div>}
      </Query>

      <Mutation mutation={INIT_CACHE_MUTATION}>
        {(initCache: any) => 
          <Button 
          onClick={() => initCache()}>
            INITIALIZE CACHE
          </Button>}
      </Mutation>

    </Grid>

  const RightSide: React.FunctionComponent = ({ children }) =>
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.right} >
      {children}
    </Grid>

  return (
    <Grid container component="main" className={classes.root}>
      <LeftSide />
      <RightSide>
        <CreateGame />
        <JoinGame />
      </RightSide>    
    </Grid>
  )
}