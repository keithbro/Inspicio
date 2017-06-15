@extends('layouts.bootstrap-main')
@section('title', 'View Review Request')

@section('content')
	  	<div class="panel panel-default">
		  <div class="panel-heading">
		    <h3 class="panel-title">{{ $review->name }} <span class="badge">{{$review->language}}</span></h3>
		  </div>
		  <div class="panel-body">
		  	@if ($review->status == 'closed')
				<div class="alert alert-warning"><b>This review is closed</b></div>
			@endif
		  	<i>Created at : {{$review->created_at}}, Last updated : {{$review->updated_at}}</i>
		  	<hr>
		    <b>Description :</b>
		    <div class="well">{!! $review->description !!}</div>
		    <hr>
		    Created by <a href="/members/{{$review->author_id}}/profile">{{$review->nickname}}</a>
		    <span class="badge">{{$followers}} Reviewers</span>
		  </div>
		  <div class="panel-footer">
		  	@if(session('user_id') && $review->status == 'open')
		  		@if (session('user_id') != $review->author_id)

			  		@if (isset($tracked))
			  			@if ($tracked->status == 'approved')
			  				<button class="btn btn-primary" disabled>Approved</button>
			  			@else
				  			<button onclick="approveReview('{{$review->id}}')" id="review-action" class="btn btn-primary">Approve</button>
			  			@endif

			  		@else
				  			<button onclick="followReview('{{$review->id}}')" id="review-action" class="btn btn-info">Follow this review</button>
			  		@endif
			  	@else
			  		@if ($review->status == 'open')
			  			<a onclick="closeReview('{{$review->id}}')" id="review-close" class="btn btn-warning">Close</a>
			  		@endif
			  	@endif
			@endif
			  		<a href="{{$review->url}}" target="_blank" class="btn btn-info">View</a>
			  </div>
		</div>
		<script type="text/javascript" src="{{ asset('js/async-action-reviews.js') }}"></script>
@endsection
