'use strict';

angular.module('myAPP.version', [
  'myAPP.version.interpolate-filter',
  'myAPP.version.version-directive'
])

.value('version', '0.1');
