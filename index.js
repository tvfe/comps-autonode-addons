'use strict'

module.exports = function(comps) {
    comps.tag('foreach', {
        paired: true,
        recursive: true,
        created: function() {
            this._itemsName = this.$attributes.$items
            this._itemName = this.$attributes.$as
        },
        outer: function() {
            return [
                "${%s.map(function (%s) {".replace('%s', this._itemsName).replace('%s', this._itemName),
                "}).join('')}"
            ]
        },
        inner: function() {
            var ctx = this
            return 'return `' + this.$el.childNodes.map(function (n) {
                return ctx.$walk(n, ctx.$scope)
            }).join('') + '`'
        }
    }).tag('if', {
        paired: true,
        recursive: true,
        created: function () {
            this._condition = this.$attributes.$is
        },
        outer: function () {
            return [
                '${(%s) ? ('.replace('%s', this._condition),
                '):""}'
            ]
        },
        inner: function () {
            var ctx = this
            return '`'  + this.$el.childNodes.map(function (n) {
                return ctx.$walk(n, ctx.$scope)
            }).join('') + '`'
        }
    }).aspect('component', {
        render: function(innerHTML) {
            var useWith = this.$attributes.with
            if (useWith) {
                return '${function($value){with($value){return `' + innerHTML + '`}}(' + useWith + ')}'
            } else {
                return innerHTML
            }
        }
    })
}