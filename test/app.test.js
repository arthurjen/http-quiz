const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = require('chai');
const app = require('../lib/app');
chai.use(chaiHttp);

describe('Pirates API', () => {

    it('gets penguins', () => {
        return chai.request(app)
            .get('/api/penguins')
            .then(({ body }) => {
                assert.deepEqual(body, ['bernice', 'bernard']);
            });
    });

    it('gets a single penguin with query format=full', () => {
        return chai.request(app)
            .get('/api/penguins/king?format=full')
            .then(({ body }) => {
                const expected = { 
                    name: 'bernice',
                    description: 'What a penguin!',
                    age: 7
                };
                assert.deepEqual(body, expected);
            });
    });

    it('gets a single penguin with query format=simple', () => {
        return chai.request(app)
            .get('/api/penguins/king?format=simple')
            .then(({ body }) => {
                assert.deepEqual(body, { name: 'bernice' });
            });
    });
    
    it('gets a single penguin with no query', () => {
        return chai.request(app)
            .get('/api/penguins/king')
            .then(({ body }) => {
                assert.deepEqual(body, { name: 'bernice' });
            });
    });

    it('deletes mistake', () => {
        return chai.request(app)
            .del('/mistake')
            .then(res => {
                assert.deepEqual(res.text, '<p>All tracks covered</p>');
            });
    });

    it('returns 404 err if bad path', () => {
        return chai.request(app)
            .get('/api/pongons')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });
});