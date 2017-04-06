/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular-route.d.ts" />
var altairApp;
(function (altairApp) {
    var MessagesService = (function () {
        function MessagesService($http, appConfig) {
            this.$http = $http;
            this.appConfig = appConfig;
        }
        MessagesService.prototype.getMessageThreadsByUserId = function (userid) {
            return this.$http.get(this.appConfig.domain + '/Web/Security/GetMessageThreadsByUserId/' + userid, {});
        };
        MessagesService.prototype.createMessageThread = function (msgObj) {
            var params = JSON.stringify(msgObj);
            return this.$http.post(this.appConfig.domain + '/Web/Security/CreateMessageThread', params, {});
        };
        MessagesService.prototype.sendMessageThread = function (msgObj) {
            var params = JSON.stringify(msgObj);
            return this.$http.post(this.appConfig.domain + '/Web/Security/SendMessage', params, {});
        };
        MessagesService.prototype.updateMsgThreadReadPropery = function (id, msgid) {
            return this.$http.put(this.appConfig.domain + '/Web/Security/UpdateMsgThreadReadPropery/' + id + '/' + msgid, {});
        };
        MessagesService.prototype.getMessageReadInfoByUserID = function (userid) {
            return this.$http.get(this.appConfig.domain + '/Web/Security/GetMessageReadInfoByUserID/' + userid, {});
        };
        MessagesService.$inject = ["$http", "appConfig"];
        return MessagesService;
    }());
    altairApp.MessagesService = MessagesService;
    angular
        .module("altairApp")
        .service("messagesService", MessagesService);
})(altairApp || (altairApp = {}));
