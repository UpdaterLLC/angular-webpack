module.exports = angular.module('app.constants', [])

  .constant('appInfo', {
    name     : __APP_DESC__,
    version  : __APP_VERS__,
    buildDate: __BUILD_DATE__,
    config:{
      withMsgPack: true
    }
  })

;
