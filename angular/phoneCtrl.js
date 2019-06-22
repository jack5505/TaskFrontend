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

})