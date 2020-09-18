const chance = require('chance')()
const generateUser = () => ({
    email: chance.email(),
    name: `${chance.first()} ${chance.last()}`
})
const migratePath = path.join(__dirname, '..', '..', 'node_modules/migrate/bin', 'migrate')
const migrate = run.bind(null, migratePath)

describe('[Migration: up]', () => {
    before(done => {
        MongoClient
            .connect(url)
            .then(client => {
                db = client.db()
                return db.collection('customers').insert(generateUser())
            })
            .then(result => {
                if (!result) throw new Error('Failed to insert')
                return done()
            }).catch(done)
    })
    it('should run up on specified migration', done => {
        migrate(['up', 'mention here the file name we created above', '--store=./db-migrate-store.js'])
            .then(() => {
                const promises = []
                promises.push(
                    db.collection('users').find().toArray()
                )
                Bluebird.all(promises)
                    .then(([users]) => {
                        users.forEach(elem => {
                            expect(elem).to.have.property('lastName')
                        })
                        done()
                    })
            }).catch(done)
    })
    after(done => {
        rimraf.sync(path.join(__dirname, '..', '..', '.migrate'))
        db.collection('users').deleteMany()
            .then(() => {
                rimraf.sync(path.join(__dirname, '..', '..', '.migrate'))
                return done()
            }).catch(done)
    })
})