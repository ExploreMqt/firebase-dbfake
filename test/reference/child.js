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

test('should have a child function', t => {
	t.is(typeof(sut.reference().child), 'function')
})

test('should return a reference with the key given', t => {
    const	parent = sut.reference()
    const	child = parent.child('eino')

    t.is(child.key, 'eino')
    t.truthy(child.root)
})

test('should return a reference with the correct parent', t => {
    //Yeah, I know too much implementation for a fake, but...
    const	parent = sut.reference()
    const	child = parent.child('eino')

    t.is(child.parent, parent)
})
