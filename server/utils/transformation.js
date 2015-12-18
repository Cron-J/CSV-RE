var upperCase = function(str){
	console.log('TupperCase', str);
    return str.toString().toUpperCase();
};

var lowerCase = function(str){
	console.log('TlowerCase', str);
    return str.toString().toLowerCase();
};

var substring = function(str, param1, param2) {
	console.log('Tsubstring', str);
	return str.toString().substr(param1,param2);
}

exports.upperCase = upperCase;
exports.lowerCase = lowerCase;
exports.substring = substring;