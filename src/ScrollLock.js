import React from "react";
import {PropTypes} from 'prop-types'

/*
	NOTES

	1. Stop content jumping around when overflow is hidden on the body.
	2. Mobile Safari ignores { overflow: hidden } declaration on the body.
	3. Allow scroll on provided target.
*/

class ScrollLock extends React.Component {
	constructor(props){
		super(props);
	}
	componentDidMount() {
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
	componentWillUnmount () {
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
	render () {
		return null;
	}
	const preventTouchMove = (e) => {
		e.preventDefault();
	}

	const allowTouchMove = (e) => {
		e.stopPropagation();
	}

	const preventInertiaScroll = () => {
		var top = this.scrollTop;
		var totalScroll = this.scrollHeight;
		var currentScroll = top + this.offsetHeight;

		if (top === 0) {
			this.scrollTop = 1;
		} else if (currentScroll === totalScroll) {
			this.scrollTop = top - 1;
		}
	}

	const canUseDom = () => {
		return !!(
			typeof window !== 'undefined'
			&& window.document
			&& window.document.createElement
		);
	}
}

ScrollLock.propTypes = {
  scrollTarget: PropTypes.object
};



module.exports = ScrollLock;
