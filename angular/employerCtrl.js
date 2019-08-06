app.controller('employerCtrl',function ($scope,$http) {
    $scope.education = [];
    $scope.employerData = [];
    $scope.filter4 = "";
    $scope.mail = "";
    $scope.getEmployers = function () {
        $http({
        url:$scope.baseUrl+"employer",
            dataType:'json',
            method:'GET',
            headers:{
            'Content-Type':'application/json'
            }
        }).then(function (response) {
            $scope.employerData = response.data;
            console.log(response.data);
        })
    }
    $scope.getEmployers();

    $scope.addEducation = function () {
        if($scope.ph.length >= 1 && $scope.startDate.length >= 1 && $scope.endDate.length >= 1)
        {

            var temp = {
                university:$scope.ph,
                startDate:$scope.startDate,
                endDate:$scope.endDate
            }
            $scope.education.push(temp);
            $scope.ph = $scope.startDate = $scope.endDate = "";
        }
    }
    $scope.removeeducation = function(x){
        $scope.education.splice(x,1);
    };
    $scope.clearallData = function () {
        $scope.education = [];
    }

    //With regex it checks to all standard value for emails
    $scope.validateEmail = function () {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if($scope.mail.match(re)){
            $scope.filter4 = "";
            console.log("to`gri");
        }else{
            console.log("yes man m");
            $scope.filter4 = "pochta hato";
        }
    }
    //Only numeric value accept input form
    $scope.onlyNumbers = function (event) {
        var theEvent = event || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

})