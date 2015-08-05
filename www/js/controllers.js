//============================WORKING CONTROLLER FOR HOME PAGE==========================================

//Controller that has the stopwatch
christyApp.controller('stopwatchCtrl', function($scope, $interval){
  
    //Used to cancel timer 
    var stop, sec, min, hr;
    
    //Initialise start time with saved data or if no saved data then intialise to 0
    $scope.seconds = parseInt( window.localStorage['sec']) || 0;
    $scope.minutes = parseInt(window.localStorage['min']) || 0;
    $scope.hours = parseInt(window.localStorage['hr']) || 0;
    
    //function which counts the number of seconds activity is running
    $scope.start = function(){
         
        if ( angular.isDefined(stop) ) return;

        //Initialising stop so it can be canceled later
        stop = $interval(function(){

             //Increment time by 1 every second
             $scope.seconds++; 
            
            //Code to count up the minutes
            //if seconds reaches 60
            if($scope.seconds > 59)
            {
                
                //Add a minute to the timer
                $scope.minutes++;
                
                //Set seconds back to 0
                $scope.seconds = 0;
            
            }//End if
            
            //Code to count up the hours
            //if seconds reaches 60
            if($scope.minutes > 59)
            {
                
                //Add an hour to the timer
                $scope.hours++;
                
                //Set minutes back to 0
                $scope.minutes = 0;
            
            }//End if

        }, 1000);//End $interval service
               
    };//End $scope.start 
    
    //function to pause the timer
    $scope.pauseTimer = function(){
        
        if (angular.isDefined(stop))
        {
            $interval.cancel(stop);
            
            stop = undefined;
            
        }//End if
        
        //Store time locally when pause button is pressed
        window.localStorage['sec'] = $scope.seconds;
        window.localStorage['min'] = $scope.minutes;
        window.localStorage['hr'] = $scope.hours;
      
    };//End $scope.pauseTimer
    
    //function resets timer to 0
    $scope.reset = function()
    {
        
        //Set variable to 0
        $scope.seconds = 0;
        $scope.minutes = 0;
        $scope.hours = 0;
        
        //Stops timer from automatically restarting
        if (angular.isDefined(stop))
        {
            $interval.cancel(stop);
            
            stop = undefined;
            
        }//End if
    
    };//End $scope.reset
    
});//End controller inputCtrl


//==================INPUT CONTROLLER ADDS NEW ACTIVITY TO LIST BUT DOES NOT STORE DATA=====================================

//Only rootScope will work when pushing to the array
christyApp.controller('inputCtrl', function($rootScope){
    
    //Store activites in list
    //Array must be initialised at the start or else you can't push to array
    $rootScope.activityArray = JSON.parse(window.localStorage['actArray'] || '{}');
    
    //Array to store activities
    /*$rootScope.activityArray = [
        
        //{name: "Read Xeelee", seconds : 0, minutes : 0, hours : 0}
        
    ];*/
    
    //Function to push new activites to array
    $rootScope.createActivity = function(name)
    {
        
        //Push new activity to array
        $rootScope.activityArray.push({name: name, seconds : 0, minutes : 0, hours : 0});
        
        //Store new activity in local storage
        window.localStorage['actArray'] = JSON.stringify($rootScope.activityArray);
         
    };//End createActivity

});//End controller inputCtrl



