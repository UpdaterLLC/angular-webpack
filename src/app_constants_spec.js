const packageJSON = require('../package.json');
const buildDate = require('moment')().format('YYYYMMDD');

describe('App Constants', () => {
  beforeEach(angular.mock.module(require('./app_constants.js').name));
  beforeEach(angular.mock.module(($provide) => { $provide.value('$log', console) }));
  describe('has an appInfo', () => {
    let appInfo;
    beforeEach(angular.mock.inject(_appInfo_ => appInfo = _appInfo_));
    it('is object', () => expect(typeof appInfo).toBe('object'));
    it('.name', () => {
      expect(appInfo.name).toBeDefined();
      expect(typeof appInfo.name).toBe('string');
      expect(appInfo.name).toEqual(packageJSON.description);
    });
    it('.version', () => {
      expect(appInfo.version).toBeDefined();
      expect(typeof appInfo.version).toBe('string');
      expect(appInfo.version).toEqual(packageJSON.version);
    });
    it('.buildDate', () => {
      expect(appInfo.buildDate).toBeDefined();
      expect(typeof appInfo.buildDate).toBe('string');
      expect(appInfo.buildDate).toEqual(buildDate);
    });
    it('.config', () => {
      expect(appInfo.config).toBeDefined();
      expect(typeof appInfo.config).toBe('object');
    });
    it('.config.withMsgPack', () => {
      expect(appInfo.config.withMsgPack).toBeDefined();
      expect(typeof appInfo.config.withMsgPack).toBe('boolean');
    });
  });
});
