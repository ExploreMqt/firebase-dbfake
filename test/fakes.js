/*
  ISC License
  Copyright (c) 2016, Jim Argeropoulos
  
  Permission to use, copy, modify, and/or distribute this software for any 
  purpose wtesth or wtesthout fee is hereby granted, provided that the above 
  copyright notice and this permission notice appear in all copies.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WtestH 
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILtestY AND 
  FtestNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, 
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM 
  LOSS OF USE, DATA OR PROFtestS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR 
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WtestH THE USE OR 
  PERFORMANCE OF THIS SOFTWARE.
*/
import test from 'ava'
test(t => t.true(true))

// (t => {
// 	'use strict'
	// const	chai = require('chai'),
	// 		sut = require('../lib/fakes.js')
	// chai.should()

	// describe('fakes:', t => {


	// 	describe('reference:', t => {
	// 		describe('set', t => {
	// 			test('should have an set function', t => {
	// 				sut.reference().should.have.property('set').a('function')
	// 			})

	// 			test('should return a promise', t => {
	// 				sut.reference().set().should.be.a('promise')
	// 			})
	// 		})
	// 		describe('setPriortesty', t => {
	// 			test('should have an setPriortesty function', t => {
	// 				sut.reference().should.have.property('setPriortesty').a('function')
	// 			})

	// 			test('should return the reference', t => {
	// 				sut.reference().setPriortesty().should.be.a('promise')
	// 			})
	// 		})
	// 		describe('setWtesthPriortesty', t => {
	// 			test('should have an setWtesthPriortesty function', t => {
	// 				sut.reference().should.have.property('setWtesthPriortesty').a('function')
	// 			})

	// 			test('should return the reference', t => {
	// 				sut.reference().setWtesthPriortesty().should.be.a('promise')
	// 			})
	// 		})
	// 		describe('startAt', t => {
	// 			test('should have an startAt function', t => {
	// 				sut.reference().should.have.property('startAt').a('function')
	// 			})

	// 			test('should return the reference', t => {
	// 				const ref = sut.reference()

	// 				ref.startAt().should.equal(ref)
	// 			})
	// 		})
	// 		describe('toString:', t => {
	// 			test('should have a toString function', t => {
	// 				sut.reference().should.have.property('toString').a('function')
	// 			})

	// 			test('should return a string', t => {
	// 				sut.reference().toString().should.be.a('string')
	// 			})
	// 			test('should return a string defining the path to the ref in the document', t => {
	// 				sut.reference().toString().should.equal('path/someKey')
	// 			})
	// 		})
	// 		describe('transaction', t => {
	// 			test('should have a transaction function', t => {
	// 				sut.reference().should.have.property('transaction').a('function')
	// 			})

	// 			test('should return a promise', t => {
	// 				sut.reference().transaction().should.be.a('promise')
	// 			})

	// 			test('should resolve an object that contains a snapshot', function(done){
	// 				sut.reference().transaction()
	// 				.then(result => {
	// 					result.should.have.property('commtestted')
	// 						.that.is.true
	// 					result.should.have.property('snapshot')
	// 					done()
	// 				})
	// 			})
	// 		})
	// 		describe('update', t => {
	// 			test('should have a update function', t => {
	// 				sut.reference().should.have.property('update').a('function')
	// 			})

	// 			test('should return a update', t => {
	// 				sut.reference().update().should.be.a('promise')
	// 			})
	// 		})
	// 	})
	// })
// }())
