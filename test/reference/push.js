/*
  ISC License
  Copyright (c) 2016, Jim Argeropoulos
  
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

test('should have an push function', t => {
	t.is(typeof(sut.reference().push), 'function')
})

test('should create a reference', t => {
	const parent = sut.reference(),
		child = parent.push({})

	t.not(parent, child)
})

test('should have a parent property that points to creator', t => {
	const parent = sut.reference(),
		child = parent.push({})
	t.not(parent, child)
	t.is(child.parent, parent)
})

test('should use the default key generator if none suplied', t => {
	t.is(sut.reference().push({}).key, 'someKey1')
})

test('should use the supplied key generator when supplied', t => {
	const subject = sut.reference(	{
		pushGenerator: function* words(){
			yield 'one'
			yield 'two'}
	})
	
	t.is(subject.push({}).key, 'one')
	t.is(subject.push({}).key, 'two')
})
