/**
 * Created by User on 21.11.2017.
 */
app.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, {$files: event.target.files});
        });
    };
    return {
        link: fn_link
    }
}]);

app.controller('studentsCtrl', function ($scope, $http) {
    $scope.phone1 = [];
    $scope.selectedgroup = "";
    $scope.groups = "";
    $scope.age = {
        value: new Date(2019, 1,1)
    }


    $scope.addPhones = function(){
            if($scope.ph.length >= 1){
                 $scope.phone1.push($scope.ph);
                 $scope.ph = "";
            }
    };
    $scope.removephones = function(x){
            $scope.phone1.splice(x,1);
    };

    $scope.getGroups = function(){
        $http({
            url:$scope.baseUrl+"groups",
            dataType:'json',
            method:'GET',
            data:'',
            headers:{
                'Content-type':'application/json'
            }
        }).then(function (response) {
            $scope.groups = response.data;
            console.log($scope.phone1);
        });
    };


    // $scope.Pharmacies = [];
    $scope.getWholeSalers = function () {
        $http({
            url: $scope.baseUrl,
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
                'Content-type': 'application/json',
            }
        }).then(function (response) {
            $scope.students = response.data;
            console.log(response.data);
        }, function (error) {
            alert('Error in get WholeSalers');
        });
    };
    $scope.getWholeSalers();

//    create new whs
    $scope.createStudent = function () {
        if($scope.ph.length >= 1){
        $scope.phone1.push($scope.ph);
        }
        var data = {
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            age: $scope.age,
            address: $scope.address,
            phone: $scope.phone1,
            groups: $scope.selectedgroup.id,
        };

        $http({
            url: $scope.baseUrl,
            dataType: 'json',
            method: 'POST',
            data: data,
            headers: {
                'Content-type': 'application/json',
            },
            transformResponse: angular.identity
        }).then(function (response) {
            $scope.getWholeSalers();
            $scope.clearWhsModal();
            alert(response.data);
        }, function (error) {
            alert('Error in add whs');
        });
    };

//    clear User modal
    $scope.clearWhsModal = function () {
        $scope.firstname = "";
        $scope.lastname = "";
        $scope.age = "";
        $scope.address = "";
        $scope.phone1 = [];

    };
    $scope.btnWhsCtrl = function () {
        $scope.createStudent();

    };
    $scope.creatGroup = function () {
        alert($scope.inputgroup);
        var data = {
            "groupName" : $scope.inputgroup
        };
        $http({
            url:$scope.baseUrl + "groups",
            method:'POST',
            data:data,
            headers:{
                'Content-type': 'application/json'
            },
            transformResponse: angular.identity
        }).then(function (response) {
            $scope.inputgroup = ""
        })

    }
    $scope.sendFile = function () {
        alert("hi");
        console.log($scope.files);
    }

});
