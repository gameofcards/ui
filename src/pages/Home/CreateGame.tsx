import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useMutation } from 'react-apollo';
import { CREATE_GAME_MUTATION } from '../../graphql/mutations';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    paper: {
      margin: theme.spacing(4, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    }
  })
);

export default () => {

  let [maxPlayers, setMaxPlayers] = useState(1);
  let [creatorName, setCreatorName] = useState('');
  let [id, setId] = useState('');
  let [notify, setNotify] = useState(false);

  let history = useHistory();
  const classes = useStyles();

  const [
    createGame,
    { loading, error },
  ] = useMutation(CREATE_GAME_MUTATION);

  const createAndNotify = async () => {
    const res = await createGame({ variables: { maxPlayers, creatorName } });
    setNotify(true);
    setId(res.data.createGame._id);
  }

  return (
    <div className={classes.paper}>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notify}
        onClose={() => setNotify(false)}
        message={`Your game (${id}) was created, ${creatorName}!`}
        key={'create-game-notification'}
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="maxPlayers"
        name="maxPlayers"
        label="Max Players"
        type="number"
        onChange={(event) => setMaxPlayers(parseInt(event.target.value))}
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="creatorName"
        name="creatorName"
        label="Your Name"
        autoFocus
        onChange={(event) => setCreatorName(event.target.value)}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => createAndNotify()}
      >
        Create
      </Button>

    </div>
  )
}