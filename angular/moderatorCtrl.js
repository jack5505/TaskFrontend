app.controller('moderatorCtrl',function ($scope,$http) {
    $scope.md = [];
    $scope.error = false;
    $scope.deletedMod = "";
    $scope.id = "";
    $scope.deletMod = function(){
        var data = {
            id:$scope.id
        };
        $http({
            url:$scope.baseUrl+"user",
            method:'DELETE',
            data:data,
            headers:{
                'Content-type':'application/json'
            },
            transformResponse: angular.identity
        }).then(function (response) {
            alert("Muvofaqiyatli o`chirildi");
            $scope.getModerator();
        });
    }
    $scope.deletModerator = function (x,fio) {
            $scope.id = x;
            $scope.deletedMod = fio;
    }
    $scope.editModerator = function () {

    }

    $scope.createModerator = function () {
        if($scope.password == $scope.passwordMatch)
        {
;
        var data = {
            fio:$scope.fio,
            password:$scope.password,
            username:$scope.login
        };
        $http({
            url:$scope.baseUrl+"user",
            method:'POST',
            data:data,
            headers:{
                'Content-type':'application/json'
            },
            transformResponse: angular.identity
        }).then(function (response) {
            $scope.getModerator()
            $scope.cleanFields();
            console.log("here is");
        })
        }
        else{
            $scope.error = true;
        }
    }
    $scope.getModerator = function () {
        $http({
            url:$scope.baseUrl+"user",
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }
        }).then(function (response) {
        $scope.md = response.data;
        console.log(response.data);
        })
    }
    $scope.getModerator();
    $scope.cleanFields = function () {
        $scope.fio = "";
        $scope.password = "";
        $scope.username = "";
        $scope.info = "";
        $scope.login = "";
    }

})