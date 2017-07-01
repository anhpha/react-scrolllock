'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
	NOTES

	1. Stop content jumping around when overflow is hidden on the body.
	2. Mobile Safari ignores { overflow: hidden } declaration on the body.
	3. Allow scroll on provided target.
*/

var ScrollLock = function (_Component) {
	_inherits(ScrollLock, _Component);

	function ScrollLock(props) {
		_classCallCheck(this, ScrollLock);

		return _possibleConstructorReturn(this, (ScrollLock.__proto__ || Object.getPrototypeOf(ScrollLock)).call(this, props));
	}

	_createClass(ScrollLock, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (!this.canUseDom()) return;

			var scrollTarget = this.props.scrollTarget;
			var scrollbarWidth = window.innerWidth - document.body.clientWidth; // 1.
			var target = document.body;

			target.style.paddingRight = scrollbarWidth + 'px';
			target.style.overflowY = 'hidden';

			target.addEventListener('touchmove', this.preventTouchMove, false); // 2.

			if (scrollTarget) {
				scrollTarget.addEventListener('touchstart', this.preventInertiaScroll, false); // 3.
				scrollTarget.addEventListener('touchmove', this.allowTouchMove, false); // 3.
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (!this.canUseDom()) return;

			var scrollTarget = this.props.scrollTarget;
			var target = document.body;

			target.style.paddingRight = '';
			target.style.overflowY = '';

			target.removeEventListener('touchmove', this.preventTouchMove, false);

			if (scrollTarget) {
				scrollTarget.removeEventListener('touchstart', this.preventInertiaScroll, false);
				scrollTarget.removeEventListener('touchmove', this.allowTouchMove, false);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}, {
		key: 'preventTouchMove',
		value: function preventTouchMove(e) {
			e.preventDefault();
		}
	}, {
		key: 'allowTouchMove',
		value: function allowTouchMove(e) {
			e.stopPropagation();
		}
	}, {
		key: 'preventInertiaScroll',
		value: function preventInertiaScroll() {
			var top = this.scrollTop;
			var totalScroll = this.scrollHeight;
			var currentScroll = top + this.offsetHeight;

			if (top === 0) {
				this.scrollTop = 1;
			} else if (currentScroll === totalScroll) {
				this.scrollTop = top - 1;
			}
		}
	}, {
		key: 'canUseDom',
		value: function canUseDom() {
			return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
		}
	}]);

	return ScrollLock;
}(_react.Component);

ScrollLock.propTypes = {
	scrollTarget: _propTypes.PropTypes.object
};
exports.default = ScrollLock;
