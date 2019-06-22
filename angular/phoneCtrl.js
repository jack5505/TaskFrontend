app.controller('phoneCtrl',function ($http,$scope) {
    console.log("o`qib chiq horab bo`lsini");
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

    $scope.editBtn = function (id) {
        $scope.inputgroup = $scope.groupData[id].groupName;
    };
    $scope.createGroups = function () {
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
        })
    }

})