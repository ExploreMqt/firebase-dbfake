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

/**
 * A set of functions which help you to unit test code that uses firebase.database
 * @module firebase-dbfakes
 */
(function(){
	'use strict'
	const defaults = {
		key: 'someKey',
		root: 'https://sample-app.firebaseio.com',
	}

	function reference(options){
		const	context = Object.assign({}, defaults, options)
		function* defaultPushGenerator(){let n = 1; yield `${context.key}${n}`}

		let	pushGenerator = (context.pushGenerator || defaultPushGenerator)(),
			parentRef
		return {
			//properties
			key: context.key,
			get parent () {
				if (!parentRef)
					parentRef = context.parent || reference()
				return parentRef
			},
			root: context.root,

			//functions
			child: function(key){
						return reference({
											key: key,
											parent: this
										})
					},
			endAt: function(){ return this },
			equalTo: function(){ return this },
			limitToFirst: function(){ return this },
			limitToLast: function(){ return this },
			off: () => {},
			on: () => {},
			once: () => resolveSnapshot(undefined),
			orderByChild: function(){ return this },
			orderByKey: function(){ return this },
			orderByPriority: function(){ return this },
			orderByValue: function(){ return this },
			push: function() { return reference({
				key: pushGenerator.next().value,
				parent: this
			}) },
			remove: () => Promise.resolve(),
			set: () => Promise.resolve(),
			setPriority: () => Promise.resolve(),
			setWithPriority: () => Promise.resolve(),
			startAt: function(){ return this },
			toString: function(){ return `path/${this.key}`},
			transaction: () => Promise.resolve({
													committed: true,
													snapshot: snapshot(undefined)
												}),
			update: () => Promise.resolve(),
		}
	}

	function snapshot(val, key){
		const	k = key || defaults.key,
				r = reference({key: k})
		return {
			exists: () => val !== undefined,
			key: k,
			ref: r,
			val: () => val || null,
		}
	}

	function resolveSnapshot(val, key){
		return Promise.resolve(snapshot(val, key))
	}

	function memoizeSnapshot(val, key){
		return () => resolveSnapshot(val, key)
	}

	module.exports = {
		/**
		 * A helper function when setting up default fake behavior for a suite of tests. It takes boiler plate out of your test code.
		 * @param {object} val - The data contained by the snapshot. You will get this back when calling val on the result
		 * @param {string} [key] - The key you would like for the object. Most of the time you will not need to provide a key
		 * @returns {function} - A function that will call resolveSnapshot() with the supplied values
		 */
		memoizeSnapshot: memoizeSnapshot,
		/**
		 * A factory function that creates a fake DataSnapshot object.
		 * @param {object} val - The data contained by the snapshot. You will get this back when calling val on the result
		 * @param {string} [key] - The key you would like for the object. Most of the time you will not need to provide a key
		 * @returns {object} snapshot - The fake snapshot
		 * @returns {function} snapshot.exists - A predicate that reports if the snapshot holds data
		 * @returns {string} snapshot.key - The child identifier for the snapshot
		 * @returns {object} snapshot.ref - A fake firebase reference
		 * @returns {function} snapshot.val - Returns you the data that the snapshot represents
		 */
		snapshot: snapshot,
		/**
		 * A factory function that creates a fake database.reference object.
		 * @param {object} [options] - The setup and value options you would like to give the reference
		 * @param {string} [options.key] - The key you would like for the object.
		 * @param {object} [options.parent] - The parent you would like for the object.
		 * @returns {object} reference - database.reference fake
		 * @returns {string} reference.key - The location that the reference represents
		 * @returns {object} reference.parent - Another reference, ostensibly the parent of this one, but it is just another fake.
		 * @returns {string} reference.root - The base URL for the database
		 * @returns {function} reference.child - A factory function for another reference that would be below this one in a real firebase document.
		 * @returns {function} reference.endAt - Simulates a query factory function. NOTE: If you provide another implementation, you should do so with a function, not an arrow function so that this is correct. Be sure to end with returning this.
		 * @returns {function} reference.equalTo - Simulates a query factory function. NOTE: If you provide another implementation, you should do so with a function, not an arrow function so that this is correct. Be sure to end with returning this.
		 * @returns {function} reference.limitToFirst - Simulates a query factory function. NOTE: If you provide another implementation, you should do so with a function, not an arrow function so that this is correct. Be sure to end with returning this.
		 * @returns {function} reference.limitToLast - Simulates a query factory function. NOTE: If you provide another implementation, you should do so with a function, not an arrow function so that this is correct. Be sure to end with returning this.
		 * @returns {function} reference.off - The would be disconnect for an 'on' callback. For the fake, it's a no-op.
		 * @returns {function} reference.on - The would be way to attach an event listener. The fake does not wire any data to a callback, but you can and should supply behavior that does pass data. See examples for how.
		 * @returns {function} reference.once - Returns a promise to a snapshot.
		 * @returns {function} reference.orderByChild - Simulates a query factory function. NOTE: If you provide another implementation, you should do so with a function, not an arrow function so that this is correct. Be sure to end with returning this.
		 * @returns {function} reference.orderByKey - Simulates a query factory function. NOTE: If you provide another implementation, you should do so with a function, not an arrow function so that this is correct. Be sure to end with returning this.
		 * @returns {function} reference.orderByPriority - Simulates a query factory function. NOTE: If you provide another implementation, you should do so with a function, not an arrow function so that this is correct. Be sure to end with returning this.
		 * @returns {function} reference.orderByValue - Simulates a query factory function. NOTE: If you provide another implementation, you should do so with a function, not an arrow function so that this is correct. Be sure to end with returning this.
		 * @returns {function} reference.remove - simulates removing the data at the reference. Returns a promise resolved to null
		 * @returns {function} reference.set - Simulates setting the data at the reference. Returns a promise resolved
		 * @returns {function} reference.setPriority - Simulates setting the data priority at the reference. Returns a promise resolved
		 * @returns {function} reference.setWithPriority - Simulates setting the data with a priority at the reference. Returns a promise resolved
		 * @returns {function} reference.startAt - Simulates a query factory function. NOTE: If you provide another implementation, you should do so with a function, not an arrow function so that this is correct. Be sure to end with returning this.
		 * @returns {function} reference.toString - Simulates a path sringifyer. NOTE: If you provide another implementation, you should do so with a function, not an arrow function so that this is correct and you can access the key if you need it.
		 * @returns {function} reference.transaction - Simulates a transaction.
		 * @returns {function} reference.update - This would write multiple keys to firebase.
		 */
		reference: reference,
		/**
		 * Return a promise that will resolve a snapshot from the value and key given. This is useful in modeling once()
		 * @param {object} val - The data contained by the snapshot. You will get this back when calling val on the result
		 * @param {string} [key] - The key you would like for the object. Most of the time you will not need to provide a key
		 * @returns {promise} - A snapshot in the future
		 */
		resolveSnapshot: resolveSnapshot,
	}
}())
