'use strict';

const { app } = require('express');
const { SequelizeDatabase } = require('sequelize');

// These tests are specific to lab 6 solution and may need to be updated to pass for lab 7 and 8

const supertest = require('supertest');


const request = supertest(app);

beforeAll(async() => {
  await SequelizeDatabase.sync();
});

afterAll(async () => {
  await SequelizeDatabase.drop();
});

describe ('Auth Routes', (() => {
  test('allow for user signup.',async () =>{
    const response = await request.post('/signup').send({
      username: 'Teddy',
      password: 'baddies123',
      role: 'admin',
      email: 'teddy@fuzzys.com',
    });

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('Teddy');
    expect(response.body.role).toEqual('admin');
    expect(response.body.email).toEqual('teddy@fuzzys.com');
    
  });

  test('allow for user to signin', async() => {
    const response = await request.post('/signin').set('Authorization','Basic THVja3k6d29vZg==');
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('Teddy');
    expect(response.body.role).toEqual('admin');
    expect(response.body.email).toEqual('teddy@fuzzys.com');
  });

}));