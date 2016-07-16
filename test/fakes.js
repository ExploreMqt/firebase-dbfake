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
	})
}())
