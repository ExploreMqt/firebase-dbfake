/*
  ISC License
  Copyright (c) [2016], [Jim Argeropoulos]
  
  Permission to use, copy, modify, and/or distribute this software for any 
  purpose with or without fee is hereby granted, provided that the above 
  copyright notice and this permission notice appear in all copies.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH 
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND 
  FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, 
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM 
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR 
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR 
  PERFORMANCE OF THIS SOFTWARE.
*/
import test from 'ava'
import sut from '../../lib/fakes.js'
	// 		describe('key', function(){
	// 			it('should have a key property', function(){
	// 				sut.snapshot({}).should.have.property('key').a('string')
	// 			})

	// 			it('should default to somekey when not provided', function(){
	// 				sut.snapshot({}).should.have.property('key')
	// 					.that.equals('someKey')
	// 			})

	// 			it('should return the provided key if given', function(){
	// 				sut.snapshot({}, 'abc').key.should.equal('abc')
	// 			})
	// 		})

test('should have a key property', t => {
    t.is(typeof(sut.snapshot({}).key), 'string')
})

test('should default to someKey when not provided', t => {
    t.is(sut.snapshot({}).key, 'someKey')
})

test('should return the provided key if given', t => {
    t.is(sut.snapshot({}, 'abc').key, 'abc')
})