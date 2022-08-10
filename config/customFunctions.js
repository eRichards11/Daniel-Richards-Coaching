var _utils = require('../node_modules/just-handlebars-helpers/lib/util/utils');

module.exports = {
    selectOption: function (status, options) {
        return options.fn(this).replace(new RegExp('value=\"'+status+'\"'), '$&selected="selected"');
    },

    includes: function(array, value) {
        var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (!(0, _utils.isArray)(array) || array.length === 0) {
          return false;
        }

        for (var i = 0; i < array.length; i++) {
          if (strict && array[i] === value || !strict && array[i] == value) {
            return true;
          }
        }

        return false;
      },

      eqw: function(value1, value2) {
        return value1 == value2;
      },

      isUserAuthenticated: function(req,res,next) {
        if(req.isAuthenticated()){
            //req.isAuthenticated() will return true if user is logged in
            next();
        } else{
            res.redirect("/login");
        }},

        isEmpty: function (obj) {
          for(let key in obj) {
              if(obj.hasOwnProperty[key]) {
                  return false;
              }
          }

          return true;
      },

}
