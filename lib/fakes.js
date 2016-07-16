(function(){
	'use strict'
	function snapshot(val, key){
		return {
			exists: () => val !== undefined,
			key: key || 'someKey',
			val: () => val || null,
		}
	}

	module.exports = {
		snapshot: snapshot,
	}
}())
