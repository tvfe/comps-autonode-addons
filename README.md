# comps-autonode-addons
Comps addons for autonode's es6 template syntax.

## Usage

Install:
```bash
npm install comps-autonode-addons --save
```

Set custom tag:
```js
var comps = require('comps')
var compsAutonodeAddons = require('comps-autonode-addons')

compsAutonodeAddons(comps)
```



## Syntax

* **{% foreach $arr="items" $as="item" $index="i"%} {% /foreach %}**

    Convert to `items.map()` syntax.
    
* **{% foreach $obj="items" $as="item" $key="k" $index="i"%} {% /foreach %}**

    Convert to `Object.keys(items).map()` syntax.

* **{% if $is="condition" %} {% /if %}**

    Convert to `if (is) {return ''}` syntax.
    
* **{% if $is="condition" %} {% else /%} {% /if %}**

    Convert to `if (is) {return ''} else {return ''}` syntax.
    
* **{% if $is="condition" %} {% else $if="condition" /%} {% else /%} {% /if %}**

    Convert to `if (is) {return ''} else if (is) {return ''} else {return ''}` syntax.

* **{% component $id="xxx" with="value" /%}**

    Convert to `with(value) {}` syntax.
    
* **{% include $path="./xxx" with="value" /%}**

    Convert to `with(value) {}` syntax.

* **{% scope var1="expression" var2="expression" %} {% /scope %}**

    Declare variables in that scope.

* **{% function var1="expression" var2="expression" %} {% /function %}**

    Create a function scope with specified variables.

    ```html
    {% function isActive="curid === id" /%}
        if (isActive) {
            return `<div item="active"></div>`
        } else return `<div></div>`
    {% /function %}
    ```

* **{%/ this is comment... /%}**
    
    Comment syntax for comps.
