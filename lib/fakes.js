(function(){
	'use strict'
	const	_ = require('lodash')

	const defaults = {
		key: 'someKey',
		root: 'https://sample-app.firebaseio.com',
	}

	/**
	 * A factory function that creates a fake database.reference object.
	 * @param {object} [options] - The setup and value options you would like to give the reference
	 * @param {string} [options.key] - The key you would like for the object.
	 * @param {object} [options.parent] - The parent you would like for the object.
	 * @returns {object} reference - database.reference fake
	 * @returns {string} reference.key - The location that the reference represents
	 * @returns {object} reference.parent - Another reference, ostensibly the parent of this one, but it is just another fake.
	 * @returns {string} reference.root - The base URL for the database
	 * @returns {fuction} reference.child - A factory function for another reference that would be below this one in a real firebase document.
	 */
	function reference(options){
		const context = _.assign({}, defaults, options)
		let parentRef
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
		}
	}

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

	/**
	 * Return a promise that will resolve a snapshot from the value and key given. This is useful in modeling once()
	 * @param {object} val - The data contained by the snapshot. You will get this back when calling val on the result
	 * @param {string} [key] - The key you would like for the object. Most of the time you will not need to provide a key
	 * @returns {promise} - A snapshot in the future
	 */
	function resolveSnapshot(val, key){
		return Promise.resolve(snapshot(val, key))
	}

	/**
	 * A helper function when setting up default fake behavior for a suite of tests. It takes boiler plate out of your test code.
	 * @param {object} val - The data contained by the snapshot. You will get this back when calling val on the result
	 * @param {string} [key] - The key you would like for the object. Most of the time you will not need to provide a key
	 * @returns {function} - A function that will call resolveSnapshot() with the supplied values
	 */
	function memoizeSnapshot(val, key){
		return () => resolveSnapshot(val, key)
	}

	module.exports = {
		memoizeSnapshot: memoizeSnapshot,
		snapshot: snapshot,
		reference: reference,
		resolveSnapshot: resolveSnapshot,
	}
}())
