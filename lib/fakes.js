(function(){
	'use strict'

	function reference(){
		return {

		}
	}

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
