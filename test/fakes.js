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

		})
	})
}())
