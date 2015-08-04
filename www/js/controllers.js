/*
    There are 3 controllers in this file, one for each view. They take care of all the data needed to keep track of the calorie count, the data needed for the list page and handles the user input for the input page.
    Both controllers are passed the services $rootSCope and $scope. Persistant data is used in the controllers to keep track of the calorie intake/
    $rootScope is the global variable which all calories are added to.
*/

/*
    This controller is used on homeapge. It's used for retrieving local storage and setting $rootSCope to it.
    It makes sure $rootScope is never without a value and it contols the reset button. 
*/
christyApp.controller('dailyCalories', function($rootScope, $scope){
    
    //At start up retrieve previous information about calories and store in $rootScope.dayCal
    //Must parse the local storage to in int or counting won't work
    $rootScope.dayCal =  parseInt(window.localStorage['name']);
    
    //Make sure some number for counted calories can be viewed
    if($rootScope.dayCal == null)
    {
       //if $rootScope has no value, assign it 0
       $rootScope.dayCal = 0;
         
    }//End if
    
    //Function to reset calorie counter to 0 when reset button is pushed
    $scope.reset = function(){
    
        //Global variable reset to 0
        $rootScope.dayCal = 0;
        
        //Stores the value of the calorie counter $rootScope.dayCal in local storage so it can be retrieve when app restarts
        window.localStorage['name'] =  $rootScope.dayCal;
    
    }//End reset function
       
});//End controller dailyCalories

/*
    This controller is used in list page. It has the array which stores all values needed for the list.
    It also adds the value of any item clicked to the $rootScope and then sets the new value to be stored in local storage
*/
christyApp.controller('listCtrl', function($rootScope, $scope){
    
   //$rootScope.activityArray = JSON.parse(window.localStorage['activityArray'] || '{}');
     
    //This function adds the value of a particular food when button in list page is clicked to the overall calorie counter $rootScope.dayCal
    //The value from the object is passed in and called digit
    $scope.addCal = function(digit){
        
        //Add value of food to the the overall calorie counter
        $rootScope.dayCal += digit;
        
        //Stores the value of the calorie counter $rootScope.dayCal in local storage so it can be retrieve when app restarts
        window.localStorage['name'] =  $rootScope.dayCal;
         
    }//End addCal
    
    //Array of objects which can be viewed from the list page. Consists of picture of food, name of food and the amount of calories in that food
    $rootScope.activityArray = [{name: "Read Xeelee", seconds : 0, minutes : 0, hours : 0}];
    
});//End controller listCtrl


//==================INPUT CONTROLLER ADDS NEW ACTIVITY TO LIST BUT DOES NOT STORE DATA=====================================

christyApp.controller('inputCtrl', function($rootScope, $scope){
    
    $scope.createActivity = function(name)
    {
        
         //Push new activity to array
        $rootScope.activityArray.push({name: name, seconds : 0, minutes : 0, hours : 0});
        
        //Save array to local storage
        window.localStorage['activityArray'] = JSON.stringify(activityArray);
        
    }//End createActivity

});//End controller inputCtrl

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
