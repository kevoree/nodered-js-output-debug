var AbstractComponent = require('kevoree-entities').AbstractComponent;
var noderedMsgConverter = require('nodered-msg-converter');

/**
 * Kevoree component
 * @type {Debug}
 */
var Debug = AbstractComponent.extend({
    toString: 'Debug',

    dic_entireMsg:   { defaultValue: false },
    dic_msgProperty: { optional: false, defaultValue: 'payload' },

    in_in: function (msg) {
      msg = noderedMsgConverter(msg);
      if (!msg._msgid) {
          msg._msgid = (1+Math.random()*4294967295).toString(16);
        }

      if (this.dictionary.getBoolean('entireMsg', Debug.prototype.dic_entireMsg.defaultValue)) {
        console.log(msg);
      } else {
        var prop = this.dictionary.getString('msgProperty', Debug.prototype.dic_msgProperty.defaultValue);
        if (prop.length) {
          console.log(msg[prop]);
        } else {
          this.log.warn(this.toString(), this.getName()+'.entireMsg is false so you MUST set a value to '+this.getName()+'.msgProperty');
        }
      }
    }
});

module.exports = Debug;
