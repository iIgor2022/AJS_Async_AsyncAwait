import read from '../reader';
import GameSavingLoader from '../GameSavingLoader';

jest.mock('../reader');
beforeEach(() => {
  jest.resetAllMocks();
});

test('Testing resolve', async () => {
  const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
  const buffer = new ArrayBuffer(data.length * 2);
  const bufferView = new Uint16Array(buffer);
  for (let i = 0; i < data.length; i++) {
    bufferView[i] = data.charCodeAt(i);
  }
  read.mockResolvedValue(buffer);
  const result = await GameSavingLoader.load();
  expect(result).toEqual({
    id: 9,
    created: 1546300800,
    userInfo: {
      id: 1, name: 'Hitman', level: 10, points: 2000,
    },
  });
});

test('Testing reject', async () => {
  expect.assertions(1);
  read.mockResolvedValue(new ArrayBuffer(0));
  try {
    const result = await GameSavingLoader.load();
  } catch (err) {
    expect(err.message).toEqual('Wrong string format!');
  }
});
