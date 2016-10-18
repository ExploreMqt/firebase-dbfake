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
import sut from '../lib/fakes.js'

test('should return a promise', t => {
    t.is(typeof(sut.resolveSnapshot({}).then), 'function')
})

test('should resolve a snapshot', t => {
    return sut.resolveSnapshot({})
            .then(result => {
                t.is(typeof(result.exists), 'function')
                t.is(typeof(result.key), 'string')
                t.is(typeof(result.ref), 'object')
                t.is(typeof(result.val), 'function')
            })
})

test('should resovle to the value provided', t => {
    const	x = {},
            key = 'mykey'
    return sut.resolveSnapshot(x, key)
            .then(snapshot => {
                t.is(snapshot.val(), x)
                t.is(snapshot.key, key)
            })
})
