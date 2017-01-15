/**
 * Created by user on 08.01.17.
 */
application = require('application');

module.exports = function() {
    switch (application.android.context.getResources().getConfiguration().orientation) {
        case android.content.res.Configuration.ORIENTATION_LANDSCAPE:
            return "landscape";
        case android.content.res.Configuration.ORIENTATION_PORTRAIT:
            return "portrait";
        default:
            return false;
    }
};