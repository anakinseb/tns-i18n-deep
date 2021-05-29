require("globals");
var application = require("application");
var platformModule = require("platform");
var strRender = require("str-render");

module.exports = function(defaultLang) {
  var lang = platformModule.device.language;
  var defaults = require("~/i18n/" + defaultLang);
  var strings = {};
  var _n = "@@";
  try {
    strings = require("~/i18n/" + lang);
  } catch (e) {}

  var _L = function(strName, ...replacers) {
    let res = _n + strName + _n; // will display a the string placeholder with some markers to notify the user that this string hasnt been set
    if(getStringFromNamedKey(strings, strName)){
      res = getStringFromNamedKey(strings, strName);
    } else if(getStringFromNamedKey(defaults, strName)){ // fallback to the default language
      res = getStringFromNamedKey(defaults, strName);
    }
    return strRender(res, "%s", ...replacers);
  };

  var applicationResources = application.getResources();
  applicationResources._L = _L;
  application.setResources(_L);
  application.setResources(applicationResources);
  global._L = _L;
};

function getStringFromNamedKey(obj, key) {
  let tmp = key
            .split(".")
            .reduce( (nestedObject, key) => { 
            if(typeof(nestedObject)==="object"){
               if (nestedObject && key in nestedObject) {
                  return nestedObject[key];        
              }
            }
            return null;
           
            }, obj);
	return (typeof(tmp) !== "object") ? tmp : null;
}
