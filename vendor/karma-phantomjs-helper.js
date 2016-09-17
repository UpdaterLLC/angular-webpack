// Take screenshot from Karma while running tests in PhantomJS 2?
// http://stackoverflow.com/questions/34694765/take-screenshot-from-karma-while-running-tests-in-phantomjs-2/34695107#34695107
//
// ```karma.conf.js:
//  :
// PhantomJSCustom: {
//   base: 'PhantomJS',
//   options: {
//     onCallback: function(data) {
//       if (data.type === 'render' && data.fname !== undefined) {
//         page.render(data.fname);
//       }
//     }
//   }
// }
//  :
// ```
//
// require('karma-phantomjs-helper.js');
// takeScreenshot();
//

// With this function you can take screenshots in PhantomJS!
// by default, screenshots will be saved in .tmp/screenshots/ folder with a progressive name (n.png)
var renderId = 0;
function takeScreenshot(file) {
  // check if we are in PhantomJS
  if (window.top.callPhantom === undefined) return;

  var options = {type: 'render'};
  // if the file argument is defined, we'll save the file in the path defined eg: `fname: '/tmp/myscreen.png'
  // otherwise we'll save it in the default directory with a progressive name
  options.fname = file || '.tmp/screenshots/' + (renderId++) + '.png';

  // this calls the onCallback function of PhantomJS, the type: 'render' will trigger the screenshot script
  window.top.callPhantom(options);
}

window.takeScreenshot = takeScreenshot;
