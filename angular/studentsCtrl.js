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

app.controller('studentsCtrl', function ($scope, $http, NgTableParams) {
    $scope.phone1 = [];
    $scope.selectedgroup = "";
    $scope.groups = "";
    $scope.age = {
        value: new Date(2019, 1,1)
    }


    $scope.addPhones = function(){
            if($scope.ph.length >= 1){
                var temp = {
                 phoneName:$scope.ph
                }
                $scope.phone1.push(temp);
                $scope.ph = ""
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
            console.log(response.data);
            $scope.students = response.data;
            $scope.studentTable = new NgTableParams({
                    page:1,
                    count:5
                }, {
                    getData: function(params) {
                        params.total($scope.students.length);
                        return $scope.students.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    }
                }
            );


        }, function (error) {
            alert('Error in get WholeSalers');
        });
    };
    $scope.getWholeSalers();

//    create new whs
    $scope.createStudent = function () {
        if($scope.ph.length >= 1){
            var temp = {
                phoneName:$scope.ph
            }
            $scope.phone1.push(temp);
            $scope.ph = "";
        }
        var data = {
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            age: $scope.age.value,
            address: $scope.address,
            phone: $scope.phone1,
            groups: $scope.selectedgroup.id,
            userId:$scope.userId,
        };
        console.log(data);
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
