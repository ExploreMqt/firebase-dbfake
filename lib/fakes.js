(function(){
	'use strict'

	function reference(){
		return {

		}
	}

	/**
	 * Create a fake DataSnapshot object.
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
			key: key || 'someKey',
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

	module.exports = {
		snapshot: snapshot,
		resolveSnapshot: resolveSnapshot,
	}
}())
