(function(){
	'use strict'
	const	chai = require('chai'),
			sut = require('../lib/fakes.js')
	chai.should()

	describe('fakes:', function(){
		describe('snapshot:', function(){
			it('should have a snapshot function', function(){
				sut.should.have.property('snapshot').a('function')
			})

			describe('val:', function(){
				it('should have val function', function(){
					const snapshot = sut.snapshot({})

					snapshot.should.have.property('val').a('function')
				})

				it('should return the object passed to snapshot when val is called', function(){
					const	x = {},
							snapshot = sut.snapshot(x)

					snapshot.val().should.equal(x)
				})

				it('should return null if the snapshot is called with undefined', function(){
					chai.expect(sut.snapshot(undefined).val()).to.be.null
				})
			})

			describe('expects:', function(){
				it('should have an exists function', function(){
					sut.snapshot({}).should.have.property('exists').a('function')
				})

				it('should return true when there is a value passed to snapshot', function(){
					sut.snapshot({}).exists().should.be.true
				})

				it('should return false when undefined is passed to snapshot', function(){
					sut.snapshot(undefined).exists().should.be.false
				})
			})

			describe('key', function(){
				it('should have a key property', function(){
					sut.snapshot({}).should.have.property('key').a('string')
				})

				it('should default to somekey when not provided', function(){
					sut.snapshot({}).should.have.property('key')
						.that.equals('someKey')
				})

				it('should return the provided key if given', function(){
					sut.snapshot({}, 'abc').key.should.equal('abc')
				})
			})

			describe('ref', function(){
				it('should have a ref property', function(){
					sut.snapshot({}).should.have.property('ref').a('object')
				})
			})
		})

		describe('resolveSnapshot:', function (){
			it('should have a resolveSnapshot function', function (){
				sut.should.have.property('resolveSnapshot').a('function')
			})

			it('should return a promise', function(){
				sut.resolveSnapshot({}).should.be.a('promise')
			})

			it('should resolve a snapshot', function(done){
				sut.resolveSnapshot({})
				.then(result => {
					result.should.have.property('exists').a('function')
					result.should.have.property('key').a('string')
					result.should.have.property('ref').a('object')
					result.should.have.property('val').a('function')
					done()
				})
			})

			it('should resovle to the value provided', function(done){
				const	x = {},
						key = 'mykey'
				sut.resolveSnapshot(x, key)
				.then(snapshot => {
					snapshot.val().should.equal(x)
					snapshot.key.should.equal(key)
					done()
				})
			})
		})

		describe('memoizeSnapshot:', function(){
			it('should have a memoizeSnapshot function', function(){
				sut.should.have.property('memoizeSnapshot').a('function')
			})

			it('should produce a function', function(){
				sut.memoizeSnapshot({}).should.be.a('function')
			})

			it('should return a promise from the result', function(){
				sut.memoizeSnapshot({})().should.be.a('promise')
			})

			it('should resolve the same value multiple times', function(done){
				const	x = {},
						memoized = sut.memoizeSnapshot(x)
				memoized()
				.then(snapshot => {
					snapshot.val().should.equal(x)
					memoized()
					.then(snapshot => {
						snapshot.val().should.equal(x)
						done()
					})
				})
			})
		})

		describe('reference:', function(){
			it('should have a reference function', function(){
				sut.should.have.property('reference').a('function')
			})
			describe('key:', function(){
				it('should have a key property', function(){
					sut.reference().should.have.property('key').a('string')
				})

				it('should default the key if not supplied', function(){
					sut.reference().key.should.equal('someKey')
				})

				it('should use the key supplied', function(){
					sut.reference({key:'foo'}).key.should.equal('foo')
				})
			})
			describe('parent:', function(){
				it('should have a parent property', function(){
					sut.reference().should.have.property('parent').a('object')
				})

				it('should allow you to pass in a parent', function(){
					const myParent = {}
					sut.reference({parent: myParent}).parent.should.equal(myParent)
				})
			})
			describe('root:', function(){
				it('should have a root property', function(){
					sut.reference().should.have.property('root').a('string')
				})

				it('should default to the docs value for an example', function(){
					sut.reference().root.should.equal('https://sample-app.firebaseio.com')
				})

				it('should let the caller override the value', function(){
					sut.reference({root: 'http://superior.firebaseio.com'}).root.should.equal('http://superior.firebaseio.com')
				})
			})
			describe('child:', function(){
				it('should have a child function', function(){
					sut.reference().should.have.property('child').a('function')
				})

				it('should return a reference with the key given', function(){
					const	parent = sut.reference()
					const	child = parent.child('eino')

					child.should.have.property('key')
						.that.equals('eino')
					child.should.have.property('root')
				})

				it('should return a reference with the correct parent', function(){
					//Yeah, I know too much implementation for a fake, but...
					const	parent = sut.reference()
					const	child = parent.child('eino')

					child.should.have.property('parent')
						.that.equals(parent)
				})
			})
		})
	})
}())
