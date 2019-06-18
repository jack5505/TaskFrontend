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

app.controller('studentsCtrl', function ($scope, $http, NgTableParams,$filter,$q) {
    $scope.phone1 = [];
    $scope.selectedgroup = "";
    $scope.groups = "";
    $scope.deletedId = "";
    $scope.saveOrUpdate = -1;
    $scope.peginationSize = [];
    $scope.studentsData = [];
    // $scope.age = {
    //     value: new Date(2019, 1,1)
    // }
    $scope.age = "01.01.2019";


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


//    create new whs
    $scope.createStudent = function (method,id) {
        if($scope.ph != undefined){
            if($scope.ph.length >= 1){
                var temp = {
                    phoneName:$scope.ph
                }
                $scope.phone1.push(temp);
                $scope.ph = "";
            }
        }
        var data = {
            id:id,
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            birthDate: $scope.age,
            address: $scope.address,
            phone: $scope.phone1,
            groups: $scope.selectedgroup.id,
            userId:$scope.userId,
            gender:$scope.sex,
        };
        console.log(data);
        $http({
            url: $scope.baseUrl,
            dataType: 'json',
            method: method,
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
        $scope.age = "10.01.1993";
        $scope.address = "";
        $scope.phone1 = [];
        $scope.saveOrUpdate = -1;
    };
    $scope.btnWhsCtrl = function () {
        if($scope.saveOrUpdate == -1){
        $scope.createStudent('POST',$scope.saveOrUpdate);
        }
        else{
        $scope.createStudent('PUT',$scope.saveOrUpdate);
        }

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
    $scope.delete = function (x) {
        $scope.deletedId = x;
        for(var i = 0 ; i < $scope.students.length;i++){
            if($scope.students[i].id == x){
                $scope.deletedName = $scope.students[i].firstname;
            }
        }
    }
    $scope.deletIt = function () {
        var data = {
            userId:$scope.userId,
            studentId:$scope.deletedId
        };
        $http({
            url: $scope.baseUrl,
            dataType: 'json',
            method: 'DELETE',
            data: data,
            headers: {
                'Content-type': 'application/json',
            },
            transformResponse: angular.identity
        }).then(function (response) {
            $scope.getWholeSalers();
            alert("Muvofaqiyatli o`chirildi");
        }, function (error) {
            alert('Error in add whs');
        });

    }
    $scope.editBtn =function (id) {
        console.log("YES");
        console.log(id);
        var data = {
            id:id
        };
        var config = {
          data: data,
          headers:{'Accept':'application/json'}
        };
        $http.get("http://localhost:8080/"+id,config).then(function (response) {
            console.log(response.data);
            $scope.getGroups();
            $scope.saveOrUpdate = response.data.id;
            $scope.firstname = response.data.firstname;
            $scope.lastname = response.data.lastname;
            $scope.sex = response.data.gender;
            $scope.phone1 = response.data.phone;
            $scope.address = response.data.address;
            $scope.age = response.data.birthDate;
            $scope.selectedgroup.groupName = response.data.groups;
        });
    };
    $scope.update = function () {


    }
    //Get by pagination
    $scope.getByPagination = function (x,name) {
        if(name == undefined){
            name = "";
            $scope.searchName = "";
        }else{
            $scope.searchName = name;
        }
            var send = {
                page: x,
                size:5,
                name:name
            };
            var config = {
                data: send,
                headers:{'Accept':'application/json'}
            };
            console.log(name);
            $http.get("http://localhost:8080/?page="+x+"&"+"size="+5+"&name="+$scope.searchName).then(function (response) {
                $scope.studentsData = response.data;
                console.log(response.data[0].totalLike);
                $scope.generatePaginationButtons(response.data[0].totalLike);
            });
    };

    //Generate qiladi buttonlarni
    $scope.generatePaginationButtons = function(x){
        $scope.peginationSize = [];
        $scope.uzunliki = x / 5;
        if(x % 5 >= 1)
            $scope.uzunliki ++;
        for (var i = 1; i <= $scope.uzunliki;i++){
            $scope.peginationSize.push(i);
        };
    };

    //filter box for firstname and  surname
    $scope.generate = function () {
        console.log("filter");
        console.log($scope.searchName);
        $scope.getByPagination(0,$scope.searchName);
    };
    $scope.getByPagination(0,"");

});
