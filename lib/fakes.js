(function(){
	'use strict'
	function snapshot(val, key){
		return {
			val: () => val || null
		}
	}

	module.exports = {
		snapshot: snapshot,
	}
}())
