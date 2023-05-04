const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

       it('avoid creating an existing user', (done)=> {
         // TODO create this test
         // Warning: the user already exists
         const user = {
          username: 'clemsad',
          firstname: 'clems',
          lastname: 'ades'
        }
        userController.create(user, () => {// this creates the user first time
          userController.create(user, (err, result)=> { // this creates the same user again
          expect(err).to.not.be.equal(null)
          expect(result).to.be.equal(null)
         done()
          })
        })
       })
  })

  // TODO Create test for the get method
  // describe('Get', ()=> {
  //   
  //   it('get a user by username', (done) => {
  //     // 1. First, create a user to make this unit test independent from the others
  //     // 2. Then, check if the result of the get method is correct
  //     done()
  //   })
  //
  //   it('cannot get a user when it does not exist', (done) => {
  //     // Chech with any invalid user
  //     done()
  //   })
  //
  // })describe('Get', ()=> {

    it('get a user by username', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      // Create a user
      userController.create(user, () => {
        // Get an existing user
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.deep.equal({
            firstname: 'Sergei',
            lastname: 'Kudinov'
          })
          done()
        })
      })
    })

})
