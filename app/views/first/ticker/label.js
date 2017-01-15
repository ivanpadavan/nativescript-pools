/**
 * Created by user on 08.01.17.
 */
var label = require("ui/label");
label.Label.prototype._createUI = function() {
    this._android = new android.widget.TextView(this._context);
    this._android.setSingleLine(true);
    this._android.setEllipsize(android.text.TextUtils.TruncateAt.MARQUEE);
}

exports.label = label;