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

	module.exports = {
		snapshot: snapshot,
	}
}())
