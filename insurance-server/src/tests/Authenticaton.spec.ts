import 'mocha';
import app from '../index';
import chai from 'chai';
import chaiHttp = require('chai-http');
import {agent as request} from 'supertest';
chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;

describe('Users', () => {
    it('/v1/api/auth/login: Login a user', (done) => {
        done();
    })

    it('/v1/api/auth/register: Create a property', (done) => {
        done();
    });

    it('/v1/api/auth/:id/properties: Get properties for a user', (done) => {
        done();
    });
});