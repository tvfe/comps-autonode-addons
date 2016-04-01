'use strict'

var assert = require('assert')
var comps = require('comps')
require('../index')(comps)

comps.componentLoader(function (name) {
	return '<' + name + '></' + name + '>'
})
describe('Parse', function () {
    it('# if', function() {
        var result = comps({
            template: '{% if $is="true" %}abc{%/if%}'
        })
        assert.equal(result, '${(true) ? (`abc`):""}')
    })
    it('# foreach', function() {
        var result = comps({
            template: '{% foreach $items="items" $as="v" %}<li></li>{%/foreach%}'
        })
        assert.equal(result, "${items.map(function (v) {return `<li></li>`}).join('')}")
    })
    it('# component using with', function() {
        var result = comps({
            template: '{% component $id="header" with="value"/%}'
        })
        assert.equal(result, '${function($value){with($value){return `<header with="value"></header>`}}(value)}')
    })
})