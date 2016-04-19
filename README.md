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

* **{% foreach $arr="items" $as="item" $index="i"/%}**

    Convert to `items.map()` syntax.
    
* **{% foreach $obj="items" $as="item" $key="k" $index="i"/%}**

    Convert to `Object.keys(items).map()` syntax.

* **{% if $is="condition" /%}**

    Convert to `condition ? innerHTML : ''` syntax.

* **{% component $id="xxx" with="value" /%}**

    Convert to `with(value) {}` syntax.
    
* **{% include $path="./xxx" with="value" /%}**

    Convert to `with(value) {}` syntax.