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
			describe('endAt', function(){
				it('should have an endAt function', function(){
					sut.reference().should.have.property('endAt').a('function')
				})

				it('should return the reference', function(){
					const ref = sut.reference()

					ref.endAt().should.equal(ref)
				})
			})
			describe('equalTo', function(){
				it('should have an equalTo function', function(){
					sut.reference().should.have.property('equalTo').a('function')
				})

				it('should return the reference', function(){
					const ref = sut.reference()

					ref.equalTo().should.equal(ref)
				})
			})
			describe('limitToFirst', function(){
				it('should have an limitToFirst function', function(){
					sut.reference().should.have.property('limitToFirst').a('function')
				})

				it('should return the reference', function(){
					const ref = sut.reference()

					ref.limitToFirst().should.equal(ref)
				})
			})
			describe('limitToLast', function(){
				it('should have an limitToLast function', function(){
					sut.reference().should.have.property('limitToLast').a('function')
				})

				it('should return the reference', function(){
					const ref = sut.reference()

					ref.limitToLast().should.equal(ref)
				})
			})
			describe('off', function(){
				it('should have an off function', function(){
					sut.reference().should.have.property('off').a('function')
				})
			})
			describe('on', function(){
				it('should have an on function', function(){
					sut.reference().should.have.property('on').a('function')
				})
			})
			describe('once', function(){
				it('should have an once function', function(){
					sut.reference().should.have.property('once').a('function')
				})

				it('should return a promise', function(){
					sut.reference().once().should.be.a('promise')
				})

				it('should resolve a snapshot', function(done){
					sut.reference().once().then(snapshot => {
						snapshot.should.have.property('exists').a('function')
						snapshot.should.have.property('key').a('string')
						snapshot.should.have.property('val').a('function')
						done()
					})
				})
			})
			describe('onDisconnect', function(){
				//todo
			})
			describe('orderByChild', function(){
				it('should have an orderByChild function', function(){
					sut.reference().should.have.property('orderByChild').a('function')
				})

				it('should return the reference', function(){
					const ref = sut.reference()

					ref.orderByChild().should.equal(ref)
				})
			})
			describe('orderByKey', function(){
				it('should have an orderByKey function', function(){
					sut.reference().should.have.property('orderByKey').a('function')
				})

				it('should return the reference', function(){
					const ref = sut.reference()

					ref.orderByKey().should.equal(ref)
				})
			})
			describe('orderByPriority', function(){
				it('should have an orderByPriority function', function(){
					sut.reference().should.have.property('orderByPriority').a('function')
				})

				it('should return the reference', function(){
					const ref = sut.reference()

					ref.orderByPriority().should.equal(ref)
				})
			})
			describe('orderByValue', function(){
				it('should have an orderByValue function', function(){
					sut.reference().should.have.property('orderByValue').a('function')
				})

				it('should return the reference', function(){
					const ref = sut.reference()

					ref.orderByValue().should.equal(ref)
				})
			})
			describe('push', function(){
				it('should have an push function', function(){
					sut.reference().should.have.property('push').a('function')
				})

				it('should create a reference', function(){
					const	parent = sut.reference(),
							child = parent.push({})

					parent.should.not.equal(child)
				})

				it('should have a parent property that points to creator', function(){
					const	parent = sut.reference(),
							child = parent.push({})
					parent.should.not.equal(child)
					child.should.have.property('parent')
						.that.equals(parent)
				})

				it('should use the default key generator if none suplied', function(){
					sut.reference().push({}).key.should.equal('someKey1')
				})

				it('should use the supplied key generator when supplied', function(){
					const subject = sut.reference(	{
														pushGenerator: function* words(){
															yield 'one';
															yield 'two';}
													})
					subject.push({}).key.should.equal('one')
					subject.push({}).key.should.equal('two')
				})
			})
			describe('remove', function(){
				it('should have an remove function', function(){
					sut.reference().should.have.property('remove').a('function')
				})

				it('should resolve a promise', function(){
					sut.reference().remove().should.be.a('promise')
				})
			})
			describe('set', function(){
				it('should have an set function', function(){
					sut.reference().should.have.property('set').a('function')
				})

				it('should return a promise', function(){
					sut.reference().set().should.be.a('promise')
				})
			})
			describe('setPriority', function(){
				it('should have an setPriority function', function(){
					sut.reference().should.have.property('setPriority').a('function')
				})

				it('should return the reference', function(){
					sut.reference().setPriority().should.be.a('promise')
				})
			})
			describe('setWithPriority', function(){
				it('should have an setWithPriority function', function(){
					sut.reference().should.have.property('setWithPriority').a('function')
				})

				it('should return the reference', function(){
					sut.reference().setWithPriority().should.be.a('promise')
				})
			})
			describe('startAt', function(){
				it('should have an startAt function', function(){
					sut.reference().should.have.property('startAt').a('function')
				})

				it('should return the reference', function(){
					const ref = sut.reference()

					ref.startAt().should.equal(ref)
				})
			})
			describe('toString:', function(){
				it('should have a toString function', function(){
					sut.reference().should.have.property('toString').a('function')
				})

				it('should return a string', function(){
					sut.reference().toString().should.be.a('string')
				})
				it('should return a string defining the path to the ref in the document', function(){
					sut.reference().toString().should.equal('path/someKey')
				})
			})
		})
	})
}())
