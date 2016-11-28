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
	                	  'question': 'What is the coolest thing about her ?',
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
	                		  'text': 'No, not sure',
	                		  'isUserAnswer': false
	                	  }
	                	  ] 
	                  },
	                  {
	                	  'question': 'Sarika is an all-rounder',
	                	  'choices':[{
	                		  'name': 'group2',
	                		  'id': 2,
	                		  'text': 'Yes, ofcourse!',
	                		  'isUserAnswer': false
	                	  },
	                	  {
	                		  'name': 'group2',
	                		  'id': 2,
	                		  'text': 'May be',
	                		  'isUserAnswer': true
	                	  },
	                	  {
	                		  'name': 'group2',
	                		  'id': 3,
	                		  'text': 'No, not sure',
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
		$scope.GenderSelected = s;
		console.log(s);
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
