(function(){
	'use strict'
	function snapshot(val, key){
		return {
			val: () => val || null,
			exists: () => val !== undefined
		}
	}

	module.exports = {
		snapshot: snapshot,
	}
}())
