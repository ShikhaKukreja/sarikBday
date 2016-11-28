/**
 * http://usejsdoc.org/
 */
var app = angular.module('myApp', []);
app.controller('reviewDisplayController', function($scope,$http)
    	{
	$scope.model = {
			question: []
	};
	$scope.questions=[
	                  {
	                	  'question': 'Is sarika single according to you?',
	                	  'choices':[{
	                		  'name': 'group1',
	                		  'id': 1,
	                		  'text': 'Yes, ofcourse!',
	                		  'isUserAnswer': false
	                	  },
	                	  {
	                		  'name': 'group1',
	                		  'id': 2,
	                		  'text': 'May be',
	                		  'isUserAnswer': true
	                	  },
	                	  {
	                		  'name': 'group1',
	                		  'id': 3,
	                		  'text': 'No',
	                		  'isUserAnswer': false
	                	  }
	                	  ] 
	                  },
	                  {
	                	  'question': 'Sarika is an all-rounder',
	                	  'choices':[{
	                		  'name': 'group2',
	                		  'id': 2,
	                		  'text': 'Yes she is good at almost everything',
	                		  'isUserAnswer': false
	                	  },
	                	  {
	                		  'name': 'group2',
	                		  'id': 2,
	                		  'text': 'Sorry. No comments',
	                		  'isUserAnswer': true
	                	  },
	                	  {
	                		  'name': 'group2',
	                		  'id': 3,
	                		  'text': 'No, I dont think so',
	                		  'isUserAnswer': false
	                	  }
	                	  ]  
	                  },
	                  {
	                	  'question': 'Which of the following statements passed by Sarika is not true',
	                	  'choices':[{
	                		  'name': 'group3',
	                		  'id': 1,
	                		  'text': 'I have virgin lips',
	                		  'isUserAnswer': false
	                	  },
	                	  {
	                		  'name': 'group3',
	                		  'id': 2,
	                		  'text': 'I am a woman of words',
	                		  'isUserAnswer': true
	                	  },
	                	  {
	                		  'name': 'group3',
	                		  'id': 3,
	                		  'text': 'I am the most mature person in the house',
	                		  'isUserAnswer': false
	                	  }
	                	  ] 
	                  }
	                  
	                  ];
	$scope.submitForm = function(){
		/*console.log("Inside function");
		for (var i in $scope.model.question){
			console.log("Entry is "+$scope.model.question[i]);
		}*/
		$http.post('/postFormAngular', $scope.model).success(function(data,status,header,config){
			console.log("Data successfully sent!!");
		})
		.error(function(data,status,header,config){
			console.log("Error while sending data");
		});
	};
	$scope.displayImage = function(){
		$scope.image = [{
			src: './images/laughingMinion.jpg'
		}];
	};
	$scope.RadioChange = function(s){
		if(s.question[0]=='Yes, ofcourse!')
			$scope.msg = 'Hahaha...Really? Then go get one for her';
		else if(s.question[0]=='May be')
			$scope.msg = 'I think you dont know her that well';
		else if(s.question[0]=='No')
			$scope.msg = 'Hmmmm...Even I think so and its me who she is dating :p';
		if(s.question[1]=='Yes she is good at almost everything')
			$scope.msg = 'Sarika has bribed me';
		else if(s.question[1]=='Sorry. No comments')
			$scope.msg = 'Come on! Stop being diplomatic. Sarika does not like diplomacy';
		else if(s.question[1]=='No, I dont think so')
			$scope.msg = 'Atleast you have the courage to speak your mind';
		if(s.question[2]=='I have virgin lips')
			$scope.msg = 'None of these statements is true :p';
		else if(s.question[2]=='I am a woman of words')
			$scope.msg = 'None of these statements is true :p';
		else if(s.question[2]=='I am the most mature person in the house')
			$scope.msg= 'None of these statements is true :p';
	};
	$scope.toggleActive=function(item)
    {
    	  
    item.active=!item.active;	
    
   if(item.active)
	   {
	   //var selecteditem=5;
	   $http({
		method: "POST",
		url: '/getdata',
			data: { "selecteditem" : $scope.menu }
				
			}).success(function(data)
		{
		  // window.location.assign('/');	
		})
	   }
    }
    	});
