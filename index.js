'use strict'

module.exports = function (comps) {
	comps
		.tag('foreach', {
			paired: true,
			recursive: true,
			created: function () {
				var $attr = this.$attributes;
				this._iterableName = $attr.$obj || $attr.$arr || $attr.$items
				this._iterableIsObject = !!$attr.$obj
				this._itemName = $attr.$as
				this._indexName = $attr.$index || '$index'
				this._keyName = $attr.$key || '$key'
			},
			outer: function () {
				if (this._iterableIsObject) {
					return [
						"${Object.keys(%s).map(function(%s,%s) {var %s=%s[%s];"
							.replace('%s', this._iterableName)
							.replace('%s', this._keyName)
							.replace('%s', this._indexName)
							.replace('%s', this._itemName)
							.replace('%s', this._iterableName)
							.replace('%s', this._keyName),
						"}).join('')}"
					]

				} else {
					return [
						"${%s.map(function (%s,%s) {"
							.replace('%s', this._iterableName)
							.replace('%s', this._itemName)
							.replace('%s', this._indexName),
						"}).join('')}"
					]
				}
			},
			inner: function () {
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
					'${(function(){if(%s){return '.replace('%s', this._condition),
					'}})()||""}'
				]
			},
			inner: function () {
				var ctx = this
				return '`' + this.$el.childNodes.map(function (n) {
						return ctx.$walk(n, ctx.$scope)
					}).join('') + '`'
			}
		}).tag('else', {
			created: function () {
				this._condition = this.$attributes.$is || this.$attributes.$if
			},
			outer: function () {
			    return ['', '']
			},
			inner: function () {
				if (this._condition) {
					return '`}else if(%s){return `'.replace('%s', this._condition);
				} else {
					return '`}else{return `'
				}
			}
		}).tag('scope', {
			created: function () {
			},
			outer: function () {
				var attrs = this.$attributes
				var attKeys = Object.keys(attrs)
			    return [
			    	'${(function (%s) {'.replace('%s', attKeys.join(',')), 
			    	'})(%s)}'.replace('%s', attKeys.map(function (k) {
			    		return attrs[k] || 'undefined'
			    	}).join(','))]
			},
			inner: function () {
				var ctx = this
				return '`' + this.$el.childNodes.map(function (n) {
					return ctx.$walk(n, ctx.$scope)
				}).join('') + '`'
			}
		}).aspect('component', {
			beforeCreated: saveWith,
			render: wrapByWith
		}).aspect('include', {
			beforeCreated: saveWith,
			render: wrapByWith
		})
}

function saveWith() {
	this._with = this.$attributes.with
	delete this.$attributes.with
}
function wrapByWith(innerHTML) {
	var useWith = this._with
	if (useWith) {
		return '${function($value){with($value){return `' + innerHTML + '`}}(' + useWith + ')}'
	} else {
		return innerHTML
	}
}