# tns-i18n
This is a Nativescript plugin that implements i18n easily. It supports deep nested localized strings

It adds `_L` function to global variable and XML files so you can use it anywhere in the app.

It is based on  the [tns-i18n](https://www.npmjs.com/package/tns-i18n) module, The only difference is that this module supports deep nested strings, so you can more easily organize your localizations.

The module detects the preferred user language and displays text in this language if it is handled by the app, if not, it will load the text in the default language you chose.

# Installation
```
tns plugin add tns-i18n-deep
```

# Usage

## Import

Import the module in **app.js** before anything else. See example below:
```javascript
import Vue from 'nativescript-vue';
import HelloWorld from './components/HelloWorld';

//> You have to mention the default language code
const i18n = require('tns-i18n')('en');

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

new Vue({
    i18n,
    render: h => h('frame', [h(HelloWorld)])

}).$start();
```javascript

## Creating locales
Now, create a **i18n** folder in the **app** folder.

```
app
|___ i18n
    |___ en.js
    |___ sv.js
    .
    .
    .
.
.
.
```

### Must export in files
The files containing the strings, must export an object of the strings.

Eg: **en.js**
```javascript
module.exports = {
    greetings: 'Hello %s',
    bye: 'Nice to meet you %s, see you in %s days',
    weekdays: {
        monday: "Monday",
        tuesday: "Tuesday",
        tuesday: "Wednesday",
    }
};
```

## Load strings

### XML
In XML files:
```xml
<Label text="{{_L('greetings')}}"></Label>
```

### JS
```javascript
_L("greetings")
```

### JS with deep string
```javascript
_L("weekdays.monday")
```

## Replacements
The module supports replacements of `%s`.

Eg:
```xml
<Label text="{{_L('greetings', 'My friend')}}"></Label>
<!-- Will give: Hello My friend -->
```

### Multiple replacements
For multiple replacements, you can use an array, separate arguments or even both.

Eg:
```xml
<Label text="{{_L('bye', 'My friend', '5')}}"></Label>
<!-- Will give: Nice to meet you My friend, see you in 5 days -->
```
**_Or:_**
```xml
<Label text="{{_L('bye', ['My friend', '5'])}}"></Label>
<!-- Will give: Nice to meet you My friend, see you in 5 days -->
```
