(function(){
	'use strict'

	const defaults = {
		key: 'someKey'
	}

	/**
	 * A factory function that creates a fake database.reference object.
	 * @param {string} [key] - The key you would like for the object. Most of the time you will not need to provide a key
	 * @returns {object} reference - database.reference fake
	 * @returns {string} reference.key - The location that the reference represents
	 */
	function reference(key){
		return {
			key: key || defaults.key
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
		const r = reference()
		return {
			exists: () => val !== undefined,
			key: key || defaults.key,
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
