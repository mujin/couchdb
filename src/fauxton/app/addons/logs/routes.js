// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

define([
       "app",

       "api",

       // Modules
       "addons/logs/resources"
],

function(app, FauxtonAPI, Log) {

  var  LogRouteObject = FauxtonAPI.RouteObject.extend({
    layout: "with_sidebar",

    crumbs: [
      {"name": "Logs", "link": "_log"}
    ],

    routes: {
      "_log": "showLog"
    },

    roles: ["_admin"],

    apiUrl: function() {
      return this.logs.url();
    },

    initialize: function () {
      this.logs = new Log.Collection();
      this.setView("#sidebar-content", new Log.Views.FilterView({}));
    },

    showLog: function () {
      this.setView("#dashboard-content", new Log.Views.View({collection: this.logs}));
    },

    establish: function() {
      return [this.logs.fetch()];
    }
  });

  Log.RouteObjects = [LogRouteObject];

  return Log;

});
