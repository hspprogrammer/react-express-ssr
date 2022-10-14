"use strict";
exports.id = "homePage";
exports.ids = null;
exports.modules = {

/***/ "./src/components/Link/index.js":
/*!**************************************!*\
  !*** ./src/components/Link/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Link)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../history */ "./src/history.js");



function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function handleClick(props, event) {
  if (props.onClick) {
    props.onClick(event);
  }

  if (props.target === '_blank') {
    return;
  }

  if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
    return;
  }

  if (event.defaultPrevented === true) {
    return;
  }

  event.preventDefault(); //阻止默认行为

  _history__WEBPACK_IMPORTED_MODULE_1__["default"].push(props.to);
}

function Link(props) {
  const {
    to,
    children,
    target = '_self'
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: to,
    target: target,
    onClick: e => handleClick(props, e)
  }, children);
}

/***/ })

};
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9ob21lUGFnZS5jYTA5OGUxOTkwYTA0NDdhZjlhOC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFJQSIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0LWV4cHJlc3Mtc3NyLy4vc3JjL2NvbXBvbmVudHMvTGluay9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGhpc3RvcnkgZnJvbSAnLi4vLi4vaGlzdG9yeSc7XG5cblxuZnVuY3Rpb24gaXNMZWZ0Q2xpY2tFdmVudCAoZXZlbnQpIHtcbiAgICByZXR1cm4gZXZlbnQuYnV0dG9uID09PSAwO1xufVxuXG5mdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQgKGV2ZW50KSB7XG4gICAgcmV0dXJuICEhKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuYWx0S2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVDbGljayAocHJvcHMsIGV2ZW50KSB7XG4gICAgaWYgKHByb3BzLm9uQ2xpY2spIHtcbiAgICAgICAgcHJvcHMub25DbGljayhldmVudCk7XG4gICAgfVxuXG4gICAgaWYgKHByb3BzLnRhcmdldCA9PT0gJ19ibGFuaycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc01vZGlmaWVkRXZlbnQoZXZlbnQpIHx8ICFpc0xlZnRDbGlja0V2ZW50KGV2ZW50KSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8v6Zi75q2i6buY6K6k6KGM5Li6XG4gICAgaGlzdG9yeS5wdXNoKHByb3BzLnRvKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMaW5rIChwcm9wcykge1xuICAgIGNvbnN0IHsgdG8sIGNoaWxkcmVuLCB0YXJnZXQgPSAnX3NlbGYnIH0gPSBwcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgICA8YSBocmVmPXt0b30gdGFyZ2V0PXt0YXJnZXR9IG9uQ2xpY2s9e2UgPT4gaGFuZGxlQ2xpY2socHJvcHMsIGUpfT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9hPlxuICAgICk7XG59XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==