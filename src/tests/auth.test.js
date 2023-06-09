
import request from "supertest";
import dotenv from "dotenv"
import mongoose from "mongoose";
import User from "../models/User";
dotenv.config();

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
let accesToken;
let refreshToken;
let authHeader;
const regUser =  {
  "userName": "testUsername",
  "userSurname": "testSurname",
  "userEmail": "t1@example.com",
  "userPass": "123123",
  "userPass2": "123123",
  "userDateOfBirth": ""
};
const newItem = {
  nickname         : "tNickname" , 
  realName         : "tRealName", 
  originDescription: "tOriginDescription", 
  superpowers      : "tSuperpowers", 
  catchPhrase      : "tCatchPhrase", 
};

afterAll(async () => {
  
  console.log(process.env.DB_CON);
  console.log("after all")
  await mongoose.connect(process.env.DB_CON);
  console.log("DB ok")
  const toster = await User.find({email: regUser.userEmail})
  console.log(toster)
  await User.deleteOne({email: regUser.userEmail});
  const toster2 = await User.find({email: regUser.userEmail})
  console.log(toster2)
});



describe('Ping page', () => {
	it('Ping page', async () => {
    console.log("test 1 start Ping")
    await pause(5);
    console.log("after pause 5 sec")
		const response = await request(baseUrl).get("/ping");
		  expect(response.status).toBe(200)
      expect(response.body).toEqual({ "pong": 'ok' });
	});
});
// const runTests = () => {
//   test1



describe('Reg user', () => {
	it('Reg user', async () => {
    console.log("test 2 start Reg ---------------------------------")
		const response = await request(baseUrl).post("/auth/reg").send(regUser);
    expect(response.status).toBe(200)
    expect(response.body.id);
    expect(response.body).toHaveProperty("user");
    console.log(response.body.user);
    registredUser = response.body.user;
	});
});


// }
// const test1 = () => {
  describe('LogIn user', () => {
    it('LogIn user ', async () => {
       console.log("test 3 start LogIn")
      const loginData = {email:regUser.userEmail, userpass:regUser.userPass}
      const response = await request(baseUrl).post("/auth/login").send(loginData);
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("accesToken");
      expect(response.body).toHaveProperty("refreshToken");
      accesToken=""+ response.body.accesToken;
      refreshToken=""+ response.body.refreshToken;
      authHeader = {Authorization: `Bearer ${accesToken}`}
      console.log(authHeader)
    });
  });
// }


  

  describe('Create Item', () => {
    it('Create Item', async () => {
      console.log("test 4 start Create Item")
      console.log(accesToken)
      const loginData = {email:regUser.userEmail, userpass:regUser.userPass}
      const response = await request(baseUrl)
        .post("/items/addItem")
        .set(authHeader)
        .send(newItem);
      //console.log("========================================")
      //console.log(response)
      expect(response.status).toBe(200)
      //expect(response.body).toHaveProperty("accesToken");
      //expect(response.body).toHaveProperty("refreshToken");
    });
  });