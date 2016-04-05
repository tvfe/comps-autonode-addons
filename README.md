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

* **{% foreach $items="items" $as="item" /%}**

    Convert to `items.map()` syntax.

* **{% if $is="condition" /%}**

    Convert to `condition ? innerHTML : ''` syntax.

* **{% component $id="xxx" with="value" /%}**

    Convert to `with(value) {}` syntax.
    
* **{% include $path="./xxx" with="value" /%}**

    Convert to `with(value) {}` syntax.