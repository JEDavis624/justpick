const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('./../../../app.js');
const { User } = require('./../../models/User');
const { users, badUsers } = require('./../mocks/users');

const server = request.agent(app);

describe('POST /api/signup with valid data', () => {
  test('POST /api/signup works for new user', (done) => {
    server.post('/api/signup')
      .send(users[0])
      .redirects(1)
      .expect(200)
      .expect((res) => {
        expect(res.body.signup).toBe('success');
        expect(res.body.user.userId).toBeDefined();
      })
      .end((err, res) => {
        if (err) { return done(err) }

        User.findById(res.body.user.userId).then((doc) => {

          expect(doc.email).toBe(users[0].email);
          done();
        }).catch(e => { return done(e) })
      });
  });

  test('POST /api/signup does not work for duplicate email', () => {
    return server.post('/api/signup')
      .send(users[0])
      .redirects(1)
      .expect(400)
      .expect((res) => {
        expect(res.body.signup).toBe('failure');
        expect(res.body.message[0]).toBe('duplicate email');
      });
  });
});

describe('POST /api/signup with invalid data', () => {
  test('POST /api/signup rejects bad email', () => {
    return server.post('/api/signup')
      .send(badUsers[0])
      .redirects(1)
      .expect(400)
      .expect(res => {
        expect(res.body.signup).toBe('failure');
      });
  });

  test('POST /api/signup rejects missing email', () => {
    return server.post('/api/signup')
      .send(badUsers[1])
      .redirects(1)
      .expect(400)
      .expect(res => {
        expect(res.body.signup).toBe('failure');
      });
  });

  test('POST /api/signup rejects bad password', () => {
    return server.post('/api/signup')
      .send(badUsers[2])
      .redirects(1)
      .expect(400)
      .expect(res => {
        expect(res.body.signup).toBe('failure');
      });
  });

  test('POST /api/signup rejects missing password', () => {
    return server.post('/api/signup')
      .send(badUsers[3])
      .redirects(1)
      .expect(400)
      .expect(res => {
        expect(res.body.signup).toBe('failure');
      });
  });

  test('POST /api/signup rejects bad first name', () => {
    return server.post('/api/signup')
      .send(badUsers[4])
      .redirects(1)
      .expect(400)
      .expect(res => {
        expect(res.body.signup).toBe('failure');
      });
  });

  test('POST /api/signup rejects missing first name', () => {
    return server.post('/api/signup')
      .send(badUsers[5])
      .redirects(1)
      .expect(400)
      .expect(res => {
        expect(res.body.signup).toBe('failure');
      });
  });

  test('POST /api/signup rejects bad last name', () => {
    return server.post('/api/signup')
      .send(badUsers[6])
      .redirects(1)
      .expect(400)
      .expect(res => {
        expect(res.body.signup).toBe('failure');
      });
  });

  test('POST /api/signup rejects missing last name', () => {
    return server.post('/api/signup')
      .send(badUsers[7])
      .redirects(1)
      .expect(400)
      .expect(res => {
        expect(res.body.signup).toBe('failure');
      });
  });

  test('POST /api/signup rejects bad pro flag', () => {
    return server.post('/api/signup')
      .send(badUsers[8])
      .redirects(1)
      .expect(400)
      .expect(res => {
        expect(res.body.signup).toBe('failure');
      });
  });
});


afterAll(() => {
  User.findOneAndRemove({ email: users[0].email }).then((doc) => {
    mongoose.connection.close();
  }).catch((e) => {
    console.log(e);
  });
});

