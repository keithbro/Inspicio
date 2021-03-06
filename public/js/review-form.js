function loadOpenPullRequests(owner, repo, account_id) {
	$("#repository").attr('disabled', true);

	$.getJSON('/ajax/reviews/pulls/'+owner+'/'+repo+'/'+account_id, function (data) {
		var html ='';

		$.each(data, function (key, val) {

			html += "<option value='"+val.url+"'>"+val.name+"</option>";
		});
		$("#pull_request").html(html);

	}).always(function() {
		$("#repository").attr('disabled', false);
	});
}

function loadBranches(owner, repo, account_id) {
	$("#repository").attr('disabled', true);
	$.getJSON('/ajax/reviews/branches/'+owner+'/'+repo+'/'+account_id, function (data) {
		var html ='';

		$.each(data, function (key, val) {
			html += "<option value='"+val.name+"'>"+val.name+"</option>";
		});
		$("#head_branch").html(html);
		$("#base_branch").html(html);

	}).always(function() {
		$("#repository").attr('disabled', false);
	});
}
function loadRepoMetaData(repo) {
	var metadata = document.getElementById(repo+'_metadata').value.split(',');
	//TODO : Fix
}

$(document).ready(function(){
	$('#repository').select2({placeholder: "Select a repository"});
	$('#pull_request').select2({placeholder: "Select an open pull request"});
	$('#language').select2({placeholder: "Select a language"});
	$('#base_branch').select2();
	$('#head_branch').select2();
	tinymce.init({ selector:"textarea" });
});
$('#new_pull_request').change(function() {
	var check = $(this).prop('checked');
	$("#pull_request").attr('disabled',check);
	$("#new_pull_request_branches_select").attr('hidden',!check);
});

$("#repository").on("select2:select", function (e) { 
	var select_values = e.params.data.id.split(',');
	var account_id = select_values[1];
	var keys = select_values[0].split('/');

	loadOpenPullRequests(keys[0], keys[1], account_id);
	loadBranches(keys[0], keys[1], account_id);
	loadRepoMetaData(select_values[0]);
});
