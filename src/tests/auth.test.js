
import request from "supertest";
const { exec } = require('child_process');

const baseUrl = 'localhost:3001';

const pause = async (sec) => {
  await new Promise((r) => setTimeout(r, sec*1000));
}
jest.setTimeout(30000);
beforeAll(() => {
  jest.setTimeout(30000);
  //const appProcess =  exec('npm start'); 
});

let registredUser;

describe('Ping page', () => {
	it('should return a 200 status code', async () => {
    // const start = new Date().getTime();
    // await pause(5);
    // const afret = new Date().getTime();
    // console.log((afret-start)/1000);
		const response = await request(baseUrl).get("/ping");
		  expect(response.status).toBe(200)
      expect(response.body).toEqual({ "pong": 'ok' });
	});
});

const regUser =  {
  "userName": "testUsername",
  "userSurname": "testSurname",
  "userEmail": "882t1estMail@example.com",
  "userPass": "123123",
  "userPass2": "123123",
  "userDateOfBirth": ""
};

// describe('Reg user', () => {
// 	it('should return 200', async () => {
//     const start = new Date().getTime();
// 		const response = await request(baseUrl).post("/auth/reg").send(regUser);
//     expect(response.status).toBe(200)
//     expect(response.body.id);
//     expect(response.body).toHaveProperty("user");
//     console.log(response.body.user);
//     registredUser = response.body.user;
// 	});
// });

let accesToken;
let refreshToken;

describe('LogIn user', () => {
	it('should return 200', async () => {
    const loginData = {email:regUser.userEmail, userpass:regUser.userPass}
		const response = await request(baseUrl).post("/auth/login").send(loginData);
    expect(response.status).toBe(200)
    console.log(response.body)
    // expect(response.body.id);
    expect(response.body).toHaveProperty("accesToken");
    expect(response.body).toHaveProperty("refreshToken");
    accesToken=response.body.accesToken;
    refreshToken=response.body.refreshToken;
    // console.log(response.body.user);
    // registredUser = response.body.user;

    // {
    //   accesToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ijg4MnQxZXN0TWFpbEBleGFtcGxlLmNvbSIsImlkIjoiNjQ3ZGM1ZWRiNzk4MzJhODA3MjQ0N2U5IiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJ1c2VyTmFtZSI6InRlc3RVc2VybmFtZSIsInJvbGVzIjpbIlVTRVIiXSwidXNlclN1cm5hbWUiOiJ0ZXN0U3VybmFtZSIsImlhdCI6MTY4NTk2NDgzMCwiZXhwIjoxNjg1OTY1MTMwfQ.bR48Iy9U8KlAyP2HDZVVwmHV5xykOrDlld6JC-asXeM',
    //   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ijg4MnQxZXN0TWFpbEBleGFtcGxlLmNvbSIsImlkIjoiNjQ3ZGM1ZWRiNzk4MzJhODA3MjQ0N2U5IiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJ1c2VyTmFtZSI6InRlc3RVc2VybmFtZSIsInJvbGVzIjpbIlVTRVIiXSwidXNlclN1cm5hbWUiOiJ0ZXN0U3VybmFtZSIsImlhdCI6MTY4NTk2NDgzMCwiZXhwIjoxNjg3MjYwODMwfQ.2UmqZOfwNc365jLuqlEPTipl955UDbJftgJ0tK19Z7g',
    //   user: {
    //     email: '882t1estMail@example.com',
    //     id: '647dc5edb79832a8072447e9',
    //     isActivated: false,
    //     userName: 'testUsername',
    //     roles: [ 'USER' ],
    //     userSurname: 'testSurname'
    //   }
    // }

	});
});