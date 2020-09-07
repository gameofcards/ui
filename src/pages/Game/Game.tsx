import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Player from './Player';
import {withRouter} from 'react-router';
import { Query } from 'react-apollo';
import { GAME_QUERY } from '../../graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 20
    }
  }),
);

type GameProps = {
  match?: any
};

const Game = (props: GameProps) => {
  const { id } = props.match.params;
  const classes = useStyles();
  let history = useHistory();

  return (
    <div className={classes.root}>
      <Query query={GAME_QUERY} variables={{id}}>
        {(result: any) => 
          <>

            {result.loading && <div>loading...</div>}

            <IconButton onClick={() => history.push(`/`)}>
              <ArrowBackIcon />
            </IconButton>

            <Grid container spacing={10}>
              {result.data?.game?.players?.map((player: any) =>
                <Player 
                  {...player} 
                  game={result.data?.game}
                />)}
            </Grid>

          </>}
      </Query>
    </div>
  );
}

export default withRouter(Game);