import React, { Component } from "react";
import {PropTypes} from 'prop-types'

/*
	NOTES

	1. Stop content jumping around when overflow is hidden on the body.
	2. Mobile Safari ignores { overflow: hidden } declaration on the body.
	3. Allow scroll on provided target.
*/

export default class ScrollLock extends Component {
	constructor(props){
		super(props);
	}
	static propTypes = {
	  scrollTarget: PropTypes.object
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
	preventTouchMove(e){
		e.preventDefault();
	}

	allowTouchMove(e){
		e.stopPropagation();
	}

	preventInertiaScroll(){
		var top = this.scrollTop;
		var totalScroll = this.scrollHeight;
		var currentScroll = top + this.offsetHeight;

		if (top === 0) {
			this.scrollTop = 1;
		} else if (currentScroll === totalScroll) {
			this.scrollTop = top - 1;
		}
	}

	canUseDom(){
		return !!(
			typeof window !== 'undefined'
			&& window.document
			&& window.document.createElement
		);
	}
}
