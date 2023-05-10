import json from './parser';
import read from './reader';

export default class GameSavingLoader {
  static async load() {
    const data = await read();
    const resultString = await json(data);
    try {
      return JSON.parse(resultString, (key, value) => {
        if (key === 'created') {
          const date = new Date(value).toISOString();
          return date;
        }
        if (['id', 'level', 'points'].includes(key)) {
          return Number(value);
        }
        return value;
      });
    } catch (SyntaxError) {
      throw new Error('Wrong string format!');
    }
  }
}
