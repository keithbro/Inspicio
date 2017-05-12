$(document).ready(function(){
	$('select').select2();
});
$('#new_pull_request').change(function() {
	var check = $(this).prop('checked');
	$("#pull_request").attr('disabled',check);
});

$("#repository").on("select2:select", function (e) { 
	var select_values = e.params.data.id.split(',');
	var account_id = select_values[1];
	var keys = select_values[0].split('/');

	loadOpenPullRequests(keys[0], keys[1], account_id);
	loadRepoMetaData(select_values[0]);
});

function loadOpenPullRequests(owner, repo, account_id) {
	$("#repository").attr('disabled', true); //Disabling to avoid having result coming for another repo
	//TODO : Do that in a nicer way
	$.getJSON('/reviews/ajax/pulls/'+owner+'/'+repo+'/'+account_id, function (data) {
		var html ='';
		$.each(data, function (key, val) {
			            //TODO use a standard name and not Github's html_url
			html += "<option value='"+val.html_url+"'>"+val.title+"</option>";
		});
		$("#pull_request").html(html);
		$("#repository").attr('disabled', false);
	})
}

function loadRepoMetaData(repo) {
	var metadata = document.getElementById(repo+'_metadata').value.split(',');
	$('#language').val(metadata[0]);
}
