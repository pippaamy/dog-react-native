import { getUserData } from "../api";
import { dataBase } from "../firebase";

afterAll(() => {
    if (dataBase.end)  return dataBase.end();
  });

describe('get user data', () => {
    test('should work', () => {
        getUserData().then((data)=>{
            expect(typeof(data)).toBe('object')
        })
    });
});
