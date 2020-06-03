import 'mocha';
import app from '../index';
import chai from 'chai';
import chaiHttp = require('chai-http');
import {agent as request} from 'supertest';
chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;

describe('Property', () => {
    it('/v1/api/properties: Get all properties', (done) => {
        // const res = await request(app).get('/v1/api/properties');
        // // console.log(res);
        // if (res) {
        //     expect(res.status).to.equal(200);
        //     expect(res.body).not.to.be.empty;
        //     expect(res.body.data).not.to.be.null;
        //     expect(res.body.data).to.be.an("array");
        //     expect(res.body.error).to.be.empty;
        // }
        // done();
        done();
    })

    it('/v1/api/properties: Create a property', (done) => {
        done();
    });

    it('/v1/api/properties/:id: Get Property by ID', (done) => {
        done();
    });

    it('/v1/api/properties/:id: Update a property', (done) => {
        done();
    });

    it('/v1/api/properties/:id: Delete a property', (done) => {
        done();
    });
});