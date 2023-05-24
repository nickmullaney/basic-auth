const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelizeDatabase } = require('../src/auth/models');
require('dotenv').config(); 
const mockRequest = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('REST API Tests', () => {
  let createdRecordId; // Store the ID of the created record for later use in other tests

  describe('404 on a bad route', () => {
    it('should return 404 when accessing an invalid route', async () => {
      const response = await mockRequest.get('/invalid-route');
      expect(response.status).toBe(404); // Expect the response status to be 404
    });
  });

  describe('404 on a bad method', () => {
    it('should return 404 when using an invalid HTTP method on a valid route', async () => {
      const response = await mockRequest.put('/recipe');
      expect(response.status).toBe(404); // Expect the response status to be 404
    });
  });

  describe('Create a record using POST', () => {
    it('should create a new record and return it with a 200 status code', async () => {
      const newRecord = { title: 'New Recipe', description: 'Delicious recipe' };

      const response = await mockRequest
        .post('/recipe')
        .send(newRecord); // Send a POST request with the new record data

      expect(response.status).toBe(200); // Expect the response status to be 201
      expect(response.body).toHaveProperty('id'); // Expect the response body to have the 'id' property
      expect(response.body.title).toBe(newRecord.title); // Expect the response body's 'title' to match the new record's title
      expect(response.body.description).toBe(newRecord.description); // Expect the response body's 'description' to match the new record's description

      createdRecordId = response.body.id; // Store the created record's ID for later use
    });
  });

  describe('Read a list of records using GET', () => {
    it('should return an array of records with a 200 status code', async () => {
      const response = await mockRequest.get('/recipe'); // Send a GET request to retrieve a list of records
      expect(response.status).toBe(200); // Expect the response status to be 200
      expect(Array.isArray(response.body)).toBe(true); // Expect the response body to be an array
    });
  });

  describe('Read a record using GET', () => {
    it('should return the specified record with a 200 status code', async () => {
      const response = await mockRequest.get(`/recipe/${createdRecordId}`); // Send a GET request to retrieve a specific record using the created record's ID
      expect(response.status).toBe(200); // Expect the response status to be 200
      expect(response.body.id).toBe(createdRecordId); // Expect the response body's 'id' to match the created record's ID
    });

    it('should return 404 when the specified record does not exist', async () => {
      const nonExistingId = 'non-existing-id';
      const response = await mockRequest.get(`/recipe/${nonExistingId}`); // Send a GET request to retrieve a non-existing record
      expect(response.status).toBe(404); // Expect the response status to be 404
    });
  });

  describe('Update a record using PUT', () => {
    it('should update the specified record and return it with a 200 status code', async () => {
      const updatedRecord = { title: 'Updated Recipe', description: 'Tasty recipe' };

      const response = await mockRequest
        .put(`/recipe/${createdRecordId}`)
        .send(updatedRecord); // Send a PUT request to update the specified record with the updated record data

      expect(response.status).toBe(200); // Expect the response status to be 200
      expect(response.body.id).toBe(createdRecordId); // Expect the response body's 'id' to match the created record's ID
      expect(response.body.title).toBe(updatedRecord.title); // Expect the response body's 'title' to match the updated record's title
      expect(response.body.description).toBe(updatedRecord.description); // Expect the response body's 'description' to match the updated record's description
    });

    it('should return 404 when updating a non-existing record', async () => {
      const nonExistingId = 'non-existing-id';
      const response = await mockRequest.put(`/recipe/${nonExistingId}`); // Send a PUT request to update a non-existing record
      expect(response.status).toBe(404); // Expect the response status to be 404
    });
  });

  describe('Destroy a record using DELETE', () => {
    it('should delete the specified record and return it with a 200 status code', async () => {
      const response = await mockRequest.delete(`/recipe/${createdRecordId}`); // Send a DELETE request to delete the specified record
      expect(response.status).toBe(200); // Expect the response status to be 200
    });
  });
});
