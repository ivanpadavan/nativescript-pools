/**
 * Created by user on 31.12.16.
 */

var app = require('application');
var Platform = require('platform');

module.exports = {
    enableImmersive: function() {
        if (app.android && Platform.device.sdkVersion >= '19') {
            var window = app.android.startActivity.getWindow();
            var decorView = window.getDecorView();
            var View = android.view.View;

            decorView.setSystemUiVisibility(
                  View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
    },
    disableImmersive: function() {
        if (app.android && Platform.device.sdkVersion >= '19') {
            var window = app.android.startActivity.getWindow();
            var decorView = window.getDecorView();
            var View = android.view.View;

            decorView.setSystemUiVisibility(0);
        }
    }
}