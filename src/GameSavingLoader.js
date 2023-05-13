import GameSaving from './GameSaving';
import json from './parser';
import read from './reader';

export default class GameSavingLoader {
  static async load() {
    const data = await read();
    const value = await json(data);
    try {
      const resultString = JSON.parse(value);
      return new GameSaving(resultString.id, resultString.created, resultString.userInfo);
    } catch (SyntaxError) {
      throw new Error('Wrong string format!');
    }
    // return read()
    //   .then((data) => json(data))
    //   .then((value) => {
    //     try {
    //       const stringJSON = JSON.parse(value);
    //       return new GameSaving(stringJSON.id, stringJSON.created, stringJSON.userInfo);
    //     } catch (SyntaxError) {
    //       throw new Error('Wrong string format!');
    //     }
    //   });
  }
}
