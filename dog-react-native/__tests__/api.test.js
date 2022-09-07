import { getUserData } from "../api";

describe('getUserData',()=>{
    test('should ', async () => {
        const data= await getUserData()
        expect(data).toEqual({})
    });
})