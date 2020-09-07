import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import { ALL_GAMES_QUERY } from '../../graphql/queries';
import { useMutation } from 'react-apollo';
import { JOIN_GAME_MUTATION } from '../../graphql/mutations';

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

const initialState = {
  mouseX: null,
  mouseY: null,
};

type GameContextMenuProps = {
  children: React.ReactNode,
  id: number
}

export function GameContextMenu(props: GameContextMenuProps) {

  let history = useHistory();

  const [state, setState] = React.useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>(initialState);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

  const goToGamePage = () => {
    history.push(`games/${props.id}`);
  }

  return (
    <div onContextMenu={handleClick} style={{ cursor: 'context-menu' }}>

      {props.children}
      
      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>
          <Typography component="h1" variant="h5">
            <Button variant="outlined" color="primary" onClick={() => goToGamePage()}>
              GO
            </Button>
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default () => {

  let [playerName, setPlayerName] = useState('');
  let [gameId, setGameId] = useState('');
  let [notify, setNotify] = useState(false);
  const classes = useStyles();
  const [
    createGame,
    { loading, error },
  ] = useMutation(JOIN_GAME_MUTATION);

  const joinGameAndAlert = async () => {
    await createGame({ variables: { id: gameId, playerName}})
    setNotify(true);
  }

  return (
    <>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notify}
        onClose={() => setNotify(false)}
        message={`${playerName} has been added to ${gameId}`}
        key={'player-added-notification'}
      />
    
      <div className={classes.paper}>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="playerName"
          name="playerName"
          label="Player Name"
          autoFocus
          onChange={(event) => setPlayerName(event.target.value)}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => joinGameAndAlert()}
        >
          Add Player to Selected Game
        </Button>

        <Query query={ALL_GAMES_QUERY}>
          {(result: any) => 
            <>

              {result.loading && <div>loading...</div>}

              <IconButton aria-label="delete" onClick={() => result.refetch()}>
                <RefreshIcon />
              </IconButton>

              <List>
                {result.data?.allGames.map((game: any) =>
                  <GameContextMenu id={game._id}>
                    <ListItem selected={game._id === gameId} key={game._id} button onClick={() => setGameId(game._id)}>
                      <ListItemText primary={`${game._id} - ${game.status}`} />
                    </ListItem>
                  </GameContextMenu>)}
              </List>

            </>
          }
        </Query>
          
      </div>

    </>
  )
}
