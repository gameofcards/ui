import { gql } from 'apollo-boost';

export const ALL_GAMES_QUERY = gql`
  query allGames {
    allGames {
      _id
      maxPlayers
      status
    }
  }
`;

export const LAST_TEN_GAMES = gql`
  query lastTenGames {
    lastTenGames {
      _id
      maxPlayers
      status
    }
  }
`;

export const GAME_QUERY = gql`
  query game($id: ID!) {
    game(id: $id) {
      _id
      maxPlayers
      status
      everybodyWon
      currentPlayer {
        name
        ballColor
        _id
      }
      startingPlayer {
        name
      }
      players {
        name
        _id
        ballColor
      }
    }
  }
`;

export const TEST_CACHE_QUERY = gql`
  query cache {
    test @client
    derivedString @client
    derivedObj @client
    derivedArray @client
    theNumber @client
    todos @client {
      id
      name
      todo
    }
  }
`;