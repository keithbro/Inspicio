<?php
namespace App\Classes\GitProviders;

interface GitProviderInterface {
	public function fetchAccessToken($code);

	public function getAuthorizeUrl($csrf_token, $redirect_uri);

	public function getUserInfo();

	public function listPullRequestsForRepo($owner, $repository);

	public function createPullRequest($owner, $repository, $head, $base, $title, $description);

	public function listBranchesForRepo($owner, $repository);

	public function listRepositories();

	public function setToken($token);

	public function refreshToken($refresh_token);
}
