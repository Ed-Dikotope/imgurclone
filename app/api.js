exports.get = function(url){
	return fetch(
		url,
		{
			'headers': {'Authorization': 'Client-ID 7e99f92f1d5d344'}
		}
	).then(function(response){
		return response.json();
	}).then(function(json){
		return json;
	});
}
