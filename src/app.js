import GameSavingLoader from './GameSavingLoader';

GameSavingLoader.load()
  .then((data) => data, () => new Error('Saving error!'));
