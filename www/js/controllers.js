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
    
    //This function adds the value of a particular food when button in list page is clicked to the overall calorie counter $rootScope.dayCal
    //The value from the object is passed in and called digit
    $scope.addCal = function(digit){
        
        //Add value of food to the the overall calorie counter
        $rootScope.dayCal += digit;
        
        //Stores the value of the calorie counter $rootScope.dayCal in local storage so it can be retrieve when app restarts
        window.localStorage['name'] =  $rootScope.dayCal;
         
    }//End addCal
    
    //Array of objects which can be viewed from the list page. Consists of picture of food, name of food and the amount of calories in that food
    $rootScope.items = [{thumbnail: "img/egg.jpg", text: "Boiled Egg", value: 80}, {thumbnail: "img/brownBread.jpg",text: "Brown Bread", value: 100}, {thumbnail: "img/banana.jpg",text: "Banana", value: 90},                            {thumbnail: "img/apple.jpg",text: "Apple", value: 50}, {thumbnail: "img/carrot.jpg",text: "Carrot", value: 50}, {thumbnail: "img/potato.jpg",text: "Potato", value: 90}];
    
});//End controller listCtrl


/*
    This controller is used for the input view. It controls the the 2 buttons on the input age. 
    One button adds a user defined value to the $rootScope and the other pushes new data to the list page.
*/
christyApp.controller('inputCtrl', function($rootScope, $scope){
    
    //This function adds what the user manually enters to the $rootScope whichis tracking calorie intake 
    $scope.addInput = function(manualCal){
    
        //Add user input overall calorie intake
        $rootScope.dayCal += manualCal;
        
        //Store value of $rootScope.dayCal into local storage
        window.localStorage['name'] =  $rootScope.dayCal;
        
    };//end function addInput
    
    //Function handles pushing new data to the list page
    $scope.pushToArray = function(manualCal, foodName){
   
        //If manualCal and foodName both have values
        if(manualCal != 0 && foodName != '')
        {
            //Push a default user image and the values entered by the user to the items array
            $rootScope.items.push({thumbnail: "img/user.jpg", text: foodName, value: manualCal});
            
        }
        else//Testing purposes
        {
            console.log("Error pushing");
        }
        
    };//end function addInput

});//End controller inputCtrl