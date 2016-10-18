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

test('should have a toString function', t => {
    t.is(typeof(sut.reference().toString), 'function')
})

test('should return a string', t => {
    t.is(typeof(sut.reference().toString()), 'string')
})
test('should return a string defining the path to the ref in the document', t => {
    t.is(sut.reference().toString(), 'path/someKey')
})
