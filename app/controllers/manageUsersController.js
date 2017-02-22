/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular-route.d.ts" />
var ManageUsersController = (function () {
    function ManageUsersController(scope, $rootScope, $compile, $timeout, $resource, DTOptionsBuilder, DTColumnDefBuilder, commonService) {
        this.scope = scope;
        this.$rootScope = $rootScope;
        this.$compile = $compile;
        this.$timeout = $timeout;
        this.$resource = $resource;
        this.DTOptionsBuilder = DTOptionsBuilder;
        this.DTColumnDefBuilder = DTColumnDefBuilder;
        this.commonService = commonService;
        if ($rootScope.LoggedUser.UserGroupId !== 1) {
            window.location.href = "#/error";
        }
        scope.vm = this;
        scope.vm.selectize_c_options = ["Admin", "Customer Admin", "User"];
        scope.vm.selectize_c = "Admin";
        scope.vm.selectize_c_config = {
            plugins: {
                'tooltip': ''
            },
            create: false,
            maxItems: 1,
            placeholder: 'Select...'
        };
        scope.vm.selectize_a_options = [];
        scope.vm.selectize_a_config = {
            plugins: {
                'tooltip': ''
            },
            create: true,
            maxItems: 1,
            placeholder: 'Select...',
            valueField: 'Id',
            labelField: 'Description'
        };
        scope.vm.selectize_b_options = [];
        scope.vm.selectize_b_config = {
            plugins: {
                'tooltip': ''
            },
            create: false,
            maxItems: 1,
            placeholder: 'Select...',
            valueField: 'Id',
            labelField: 'Description'
        };
        scope.vm.dt_data = [];
        scope.vm.dtOptions = DTOptionsBuilder
            .newOptions()
            .withDisplayLength(10)
            .withOption('initComplete', function () {
            $timeout(function () {
                $compile($('.dt-uikit .md-input'))(scope);
            });
        });
        scope.vm.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4),
            DTColumnDefBuilder.newColumnDef(5)
        ];
        $resource('data/dt_data.json')
            .query()
            .$promise
            .then(function (dt_data) {
            scope.vm.dt_data = dt_data;
        });
        this.cservice = commonService;
        this.getLanguages();
    }
    ManageUsersController.prototype.getLanguages = function () {
        var _this = this;
        this.cservice.getLanguages().then(function (result) {
            _this.scope.vm.selectize_a_options = result.data;
            _this.scope.vm.selectize_b_options = result.data;
        });
    };
    return ManageUsersController;
}());
ManageUsersController.$inject = ["$scope", "$rootScope", "$compile", "$timeout", "$resource", "DTOptionsBuilder", "DTColumnDefBuilder", "commonService"];
angular.module("altairApp")
    .controller("manageUsersController", ManageUsersController);
