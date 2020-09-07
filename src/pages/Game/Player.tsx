import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useMutation } from 'react-apollo';
import { PASS_MUTATION } from '../../graphql/mutations';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(4, 2),
      color: theme.palette.text.secondary,
    },
    ball: {
      padding: theme.spacing(2, 0)
    }
  }),
);

type PlayerProps = {
  _id: string;
  name: string;
  ballColor: 'BLUE' | 'ORANGE' |  'NONE';
  game: any;
}

export default ({ _id, name, ballColor, game }: PlayerProps) => {
  console.dir({ _id, name, ballColor, game })
  const isPlayersTurn = game.currentPlayer._id === _id;
  const disabled = ballColor !== 'NONE' || isPlayersTurn;
  const classes = useStyles();
  const [notify, setNotify] = useState(false);

  const [
    pass,
    { loading, error },
  ] = useMutation(PASS_MUTATION);

  const passAndNotify = async () => {
    await pass({ variables: { id: game._id, toPlayerName: name } });
    setNotify(true);
  }

  return (
    <>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={game.status === 'FINALIZED'}
        key={'finished-notification'}
      >
        <Alert severity="success">The game has finished!</Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={game.status !== 'FINALIZED' && notify}
        onClose={() => setNotify(false)}
        message={`You passed to ${name}!`}
        key={'pass-notification'}
      />

      <Grid item xs={4}>

        <Paper className={classes.paper} elevation={3}>
          <Grid container item justify='center'>
            {!disabled && 
              <Button variant="outlined" color="primary" onClick={() => passAndNotify()}>
                {name}
              </Button>
            }
            {disabled && <Button variant="outlined" disabled>{name}</Button>}
          </Grid>
          <Grid container item justify='center'>
            {ballColor !== 'NONE' && ! isPlayersTurn &&
              <div className={classes.ball}>
                <div className={`nobounceball ${ballColor.toLowerCase()}`}></div>
              </div>}
            {ballColor !== 'NONE' && isPlayersTurn &&
            <div className={classes.ball}>
              <div className={`ball ${ballColor.toLowerCase()}`}></div>
            </div>}
            {ballColor === 'NONE' && isPlayersTurn &&
              <div className={classes.ball}>
                <div className={`ballBounceAndChangeColor`}></div>
              </div>}
            {ballColor === 'NONE' && ! isPlayersTurn &&
              <div className={classes.ball}>
                <div className={`colorChangingBall`}></div>
              </div>}
          </Grid>
        </Paper>

      </Grid>

    </>
  );
}
