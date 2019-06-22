app.controller('phoneCtrl',function ($http,$scope) {
    console.log("o`qib chiq horab bo`lsini");
    $scope.id = -1;
    $scope.groupData = [];
    $scope.getAllGroupsToList = function () {
        $http({
            url: $scope.baseUrl+"groups",
            dataType: 'json',
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }).then(function (response) {
            console.log(response.data);
            $scope.groupData = response.data;
        }, function (error) {
            alert('Error in add whs');
        });
    };
    $scope.getAllGroupsToList();

    $scope.editBtn = function (id,i) {
        $scope.inputgroup = $scope.groupData[id].groupName
        $scope.id = i;
    };
    $scope.createGroups = function () {

        console.log($scope.id);
        if($scope.id == -1)
        {
        var data = {
            groupName:$scope.inputgroup
        };
        $http({
            url:$scope.baseUrl+"groups",
            dataType:'json',
            method:'POST',
            data:data,
            headers:{
                'Content-type':'application/json',
            },
            transformResponse: angular.identity
        }).then(function (response) {
            $scope.getAllGroupsToList();
            $scope.id = -1;
        })
        }
        else{
            $scope.updateGroups($scope.id);
        }
    }
    $scope.updateGroups = function (id) {
        var data = {
            id:id,
            groupName:$scope.inputgroup
        };
        $http({
            url:$scope.baseUrl+"groups",
            dataType:'json',
            method:'PUT',
            data:data,
            headers:{
                'Content-type':'application/json',
            },
            transformResponse: angular.identity
        }).then(function (response) {
            $scope.id = -1;
            $scope.getAllGroupsToList();
        })
    }

})