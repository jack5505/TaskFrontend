/**
 * Created by User on 15.11.2017.
 */
app.controller('mainCtrl', function ($scope, $http) {
    $scope.start = function () {

        $scope.bodyStyle = 'login-page hold-transition';
        $scope.bodyContent = 'pages/login.html';
        $scope.sideMenuActive = ["active", "", "", "", "", "", "", ""];
        $scope.sideMenuActiveIndex = 0;
        $scope.contentUrl = 'pages/main.html';
        $scope.userName = '';
        $scope.baseUrl = 'http://localhost:8080/';
        $scope.token = "";
        $scope.authError = false;
        $scope.proba = "";
        $scope.btnName = "Qo'shish";
    };
    $scope.start();

    // login btn
    $scope.loginBtn = function (login, password) {
        $scope.authError = false;
        var auth = {
            "username": login,
            "password": password
        };
        $http({
            url: $scope.baseUrl + 'login',
            method: 'POST',
            data: auth,
            headers: {
                'Content-type': 'application/json',
            }
        }).then(function (response) {
            var userInfo = response.data;
            if(userInfo != "") {
                $scope.bodyStyle = 'hold-transition skin-blue sidebar-mini fixed';
                $scope.bodyContent = 'pages/main.html';
                $scope.contentUrl = 'pages/student.html';
            }else{
                $scope.authError = true;
            }

        }, function (error) {
            // alert("Error in login");
            $scope.authError = true;
            $scope.bodyStyle = 'hold-transition skin-blue sidebar-mini fixed';
            $scope.bodyContent = 'pages/main.html';
            $scope.contentUrl = 'pages/student.html';

        });
    };


//    change content url
    $scope.changeContentUrl = function (url, index) {
        $scope.contentUrl = 'pages/' + url + ".html";
        $scope.sideMenuActive[$scope.sideMenuActiveIndex] = "";
        $scope.sideMenuActiveIndex = index;
        $scope.sideMenuActive[$scope.sideMenuActiveIndex] = "active";
    };

});