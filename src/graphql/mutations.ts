import { gql } from 'apollo-boost';


export const JOIN_GAME_MUTATION = gql`
  mutation joinGame($id: ID!, $playerName: String!) {
    joinGame(input: {
      id: $id,
      playerName: $playerName
    }) {
        _id
        maxPlayers
        status
        everybodyWon
        currentPlayer {
          name
          ballColor
        }
        startingPlayer {
          name
        }
          players {
          name
        }
    }
  }
`;

export const CREATE_GAME_MUTATION = gql`
  mutation create($maxPlayers: Int!, $creatorName: String!) { 
    createGame(input: {
      maxPlayers: $maxPlayers,
      creatorName: $creatorName
  }) {
      _id
      maxPlayers
      status
      everybodyWon
      currentPlayer {
        name
        ballColor
      }
      startingPlayer {
        name
      }
        players {
        name
      }
    }
  }
`;

export const START_GAME_MUTATION = gql`
  mutation start {
    startGame(input: {
      id: "5f4754c789dfd7128fb050c3"
    }) {
        _id
        maxPlayers
        status
        everybodyWon
        currentPlayer {
          name
          ballColor
        }
        startingPlayer {
          name
          ballColor
        }
        players {
          name
          ballColor
        }
    }
  }
`;

export const PASS_MUTATION = gql`
  mutation passBall($id: ID!, $toPlayerName: String!) {
    passBall(input: {
      id: $id,
      toPlayerName: $toPlayerName
    }) {
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
          _id
        }
        players {
          name
          ballColor
          _id
        }
    }
  }
`;

export const INIT_CACHE_MUTATION = gql`
  mutation initCache {
    initCache @client
  }
`;