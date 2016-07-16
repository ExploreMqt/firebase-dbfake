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
		})
	})
}())
