var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import GenericChartComponent from "../../GenericChartComponent";
import { getMouseCanvas } from "../../GenericComponent";

import { isDefined, noop, hexToRGBA, getStrokeDasharray, strokeDashTypes } from "../../utils";

var StraightLine = function (_Component) {
	_inherits(StraightLine, _Component);

	function StraightLine(props) {
		_classCallCheck(this, StraightLine);

		var _this = _possibleConstructorReturn(this, (StraightLine.__proto__ || Object.getPrototypeOf(StraightLine)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		return _this;
	}

	_createClass(StraightLine, [{
		key: "isHover",
		value: function isHover(moreProps) {
			var _props = this.props,
			    tolerance = _props.tolerance,
			    onHover = _props.onHover,
			    type = _props.type;


			if (isDefined(onHover)) {
				if (type === "SELECT") {
					var _props2 = this.props,
					    x1Value = _props2.x1Value,
					    x2Value = _props2.x2Value;
					var mouseXY = moreProps.mouseXY,
					    xScale = moreProps.xScale;

					var x1 = xScale(x1Value);
					var x2 = xScale(x2Value);
					return x1 <= mouseXY[0] + tolerance && x1 >= mouseXY[0] - tolerance || x2 <= mouseXY[0] + tolerance && x2 >= mouseXY[0] - tolerance;
				} else {
					var _props3 = this.props,
					    _x1Value = _props3.x1Value,
					    _x2Value = _props3.x2Value,
					    y1Value = _props3.y1Value,
					    y2Value = _props3.y2Value,
					    _type = _props3.type;
					var _mouseXY = moreProps.mouseXY,
					    _xScale = moreProps.xScale;
					var yScale = moreProps.chartConfig.yScale;

					var hovering = isHovering({
						x1Value: _x1Value, y1Value: y1Value,
						x2Value: _x2Value, y2Value: y2Value,
						mouseXY: _mouseXY,
						type: _type,
						tolerance: tolerance,
						xScale: _xScale,
						yScale: yScale
					});
					return hovering;
				}
			}
			return false;
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props4 = this.props,
			    stroke = _props4.stroke,
			    strokeWidth = _props4.strokeWidth,
			    strokeOpacity = _props4.strokeOpacity,
			    strokeDasharray = _props4.strokeDasharray,
			    type = _props4.type;


			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);
			ctx.setLineDash(getStrokeDasharray(strokeDasharray).split(","));

			if (type === "SELECT") {
				var _helperArea = helperArea(this.props, moreProps),
				    beginLine = _helperArea.beginLine,
				    endLine = _helperArea.endLine;

				var _props5 = this.props,
				    fill = _props5.fill,
				    fillOpacity = _props5.fillOpacity;

				ctx.fillStyle = hexToRGBA(fill, fillOpacity);
				ctx.beginPath();
				ctx.moveTo(beginLine.x1, beginLine.y1);
				ctx.lineTo(beginLine.x2, beginLine.y2);
				ctx.lineTo(endLine.x2, endLine.y2);
				ctx.lineTo(endLine.x1, endLine.y1);
				ctx.lineTo(beginLine.x1, beginLine.y1);
				ctx.stroke();
				ctx.fill();
			} else {
				var _helper = helper(this.props, moreProps),
				    x1 = _helper.x1,
				    y1 = _helper.y1,
				    x2 = _helper.x2,
				    y2 = _helper.y2;

				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				if (type === "ARROW") {
					var headlen = 20;
					var angle = Math.atan2(y2 - y1, x2 - x1);
					ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
					ctx.moveTo(x2, y2);
					ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
				}
				ctx.stroke();
			}
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props6 = this.props,
			    stroke = _props6.stroke,
			    strokeWidth = _props6.strokeWidth,
			    strokeOpacity = _props6.strokeOpacity,
			    strokeDasharray = _props6.strokeDasharray;


			var lineWidth = strokeWidth;

			var _helper2 = helper(this.props, moreProps),
			    x1 = _helper2.x1,
			    y1 = _helper2.y1,
			    x2 = _helper2.x2,
			    y2 = _helper2.y2;

			return React.createElement("line", {
				x1: x1, y1: y1, x2: x2, y2: y2,
				stroke: stroke, strokeWidth: lineWidth,
				strokeDasharray: getStrokeDasharray(strokeDasharray),
				strokeOpacity: strokeOpacity });
		}
	}, {
		key: "render",
		value: function render() {
			var _props7 = this.props,
			    selected = _props7.selected,
			    interactiveCursorClass = _props7.interactiveCursorClass;
			var _props8 = this.props,
			    onDragStart = _props8.onDragStart,
			    onDrag = _props8.onDrag,
			    onDragComplete = _props8.onDragComplete,
			    onHover = _props8.onHover,
			    onUnHover = _props8.onUnHover;


			return React.createElement(GenericChartComponent, {
				isHover: this.isHover,

				svgDraw: this.renderSVG,
				canvasToDraw: getMouseCanvas,
				canvasDraw: this.drawOnCanvas,

				interactiveCursorClass: interactiveCursorClass,
				selected: selected,

				onDragStart: onDragStart,
				onDrag: onDrag,
				onDragComplete: onDragComplete,
				onHover: onHover,
				onUnHover: onUnHover,

				drawOn: ["mousemove", "pan", "drag"]
			});
		}
	}]);

	return StraightLine;
}(Component);

export function isHovering2(start, end, _ref, tolerance) {
	var _ref2 = _slicedToArray(_ref, 2),
	    mouseX = _ref2[0],
	    mouseY = _ref2[1];

	var m = getSlope(start, end);

	if (isDefined(m)) {
		var b = getYIntercept(m, end);
		var y = m * mouseX + b;
		return mouseY < y + tolerance && mouseY > y - tolerance && mouseX > Math.min(start[0], end[0]) - tolerance && mouseX < Math.max(start[0], end[0]) + tolerance;
	} else {
		return mouseY >= Math.min(start[1], end[1]) && mouseY <= Math.max(start[1], end[1]) && mouseX < start[0] + tolerance && mouseX > start[0] - tolerance;
	}
}

export function isHovering(_ref3) {
	var x1Value = _ref3.x1Value,
	    y1Value = _ref3.y1Value,
	    x2Value = _ref3.x2Value,
	    y2Value = _ref3.y2Value,
	    mouseXY = _ref3.mouseXY,
	    type = _ref3.type,
	    tolerance = _ref3.tolerance,
	    xScale = _ref3.xScale,
	    yScale = _ref3.yScale;


	var line = generateLine({
		type: type,
		start: [x1Value, y1Value],
		end: [x2Value, y2Value],
		xScale: xScale,
		yScale: yScale
	});

	var start = [xScale(line.x1), yScale(line.y1)];
	var end = [xScale(line.x2), yScale(line.y2)];

	var m = getSlope(start, end);

	var _mouseXY2 = _slicedToArray(mouseXY, 2),
	    mouseX = _mouseXY2[0],
	    mouseY = _mouseXY2[1];

	if (isDefined(m)) {
		var b = getYIntercept(m, end);
		var y = m * mouseX + b;

		return mouseY < y + tolerance && mouseY > y - tolerance && mouseX > Math.min(start[0], end[0]) - tolerance && mouseX < Math.max(start[0], end[0]) + tolerance;
	} else {
		return mouseY >= Math.min(start[1], end[1]) && mouseY <= Math.max(start[1], end[1]) && mouseX < start[0] + tolerance && mouseX > start[0] - tolerance;
	}
}

function helper(props, moreProps) {
	var x1Value = props.x1Value,
	    x2Value = props.x2Value,
	    y1Value = props.y1Value,
	    y2Value = props.y2Value,
	    type = props.type;
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale;


	var modLine = generateLine({
		type: type,
		start: [x1Value, y1Value],
		end: [x2Value, y2Value],
		xScale: xScale,
		yScale: yScale
	});

	var x1 = xScale(modLine.x1);
	var y1 = yScale(modLine.y1);
	var x2 = xScale(modLine.x2);
	var y2 = yScale(modLine.y2);

	return {
		x1: x1, y1: y1, x2: x2, y2: y2
	};
}

function helperArea(props, moreProps) {
	var x1Value = props.x1Value,
	    x2Value = props.x2Value,
	    y1Value = props.y1Value,
	    y2Value = props.y2Value,
	    type = props.type;
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale;

	var _generateLine = generateLine({
		type: type,
		start: [x1Value, y1Value],
		end: [x2Value, y2Value],
		xScale: xScale,
		yScale: yScale
	}),
	    startLine = _generateLine.startLine,
	    endLine = _generateLine.endLine;

	var x1 = xScale(startLine.x1);
	var y1 = yScale(startLine.y1);
	var x2 = xScale(startLine.x2);
	var y2 = yScale(startLine.y2);

	var x3 = xScale(endLine.x1);
	var y3 = yScale(endLine.y1);
	var x4 = xScale(endLine.x2);
	var y4 = yScale(endLine.y2);

	return {
		beginLine: {
			x1: x1, y1: y1, x2: x2, y2: y2
		},
		endLine: {
			x1: x3, y1: y3, x2: x4, y2: y4
		}
	};
}

export function getSlope(start, end) {
	var m /* slope */ = end[0] === start[0] ? undefined : (end[1] - start[1]) / (end[0] - start[0]);
	return m;
}
export function getYIntercept(m, end) {
	var b /* y intercept */ = -1 * m * end[0] + end[1];
	return b;
}

export function generateLine(_ref4) {
	var type = _ref4.type,
	    start = _ref4.start,
	    end = _ref4.end,
	    xScale = _ref4.xScale,
	    yScale = _ref4.yScale;

	var m /* slope */ = getSlope(start, end);
	// console.log(end[0] - start[0], m)
	var b /* y intercept */ = getYIntercept(m, start);
	switch (type) {
		case "XLINE":
			return getXLineCoordinates({
				type: type, start: start, end: end, xScale: xScale, yScale: yScale, m: m, b: b
			});
		case "RAY":
			return getRayCoordinates({
				type: type, start: start, end: end, xScale: xScale, yScale: yScale, m: m, b: b
			});
		case "LINE":
			return getLineCoordinates({
				type: type, start: start, end: end, xScale: xScale, yScale: yScale, m: m, b: b
			});
		case "ARROW":
			return getLineCoordinates({
				type: type, start: start, end: end, xScale: xScale, yScale: yScale, m: m, b: b
			});
		case "SELECT":
			return {
				startLine: getXLineCoordinates({
					type: type, start: start, end: [start[0], start[1] - 1], xScale: xScale, yScale: yScale, m: m, b: b
				}),
				endLine: getXLineCoordinates({
					type: type, start: [end[0], end[1] - 1], end: end, xScale: xScale, yScale: yScale, m: m, b: b
				})
			};
	}
}

export function getXLineCoordinates(_ref5) {
	var start = _ref5.start,
	    end = _ref5.end,
	    xScale = _ref5.xScale,
	    yScale = _ref5.yScale,
	    m = _ref5.m,
	    b = _ref5.b;

	var _xScale$domain = xScale.domain(),
	    _xScale$domain2 = _slicedToArray(_xScale$domain, 2),
	    xBegin = _xScale$domain2[0],
	    xFinish = _xScale$domain2[1];

	var _yScale$domain = yScale.domain(),
	    _yScale$domain2 = _slicedToArray(_yScale$domain, 2),
	    yBegin = _yScale$domain2[0],
	    yFinish = _yScale$domain2[1];

	if (end[0] === start[0]) {
		return {
			x1: end[0], y1: yBegin,
			x2: end[0], y2: yFinish
		};
	}

	var _ref6 = end[0] > start[0] ? [xBegin, xFinish] : [xFinish, xBegin],
	    _ref7 = _slicedToArray(_ref6, 2),
	    x1 = _ref7[0],
	    x2 = _ref7[1];

	return {
		x1: x1, y1: m * x1 + b,
		x2: x2, y2: m * x2 + b
	};
}

export function getRayCoordinates(_ref8) {
	var start = _ref8.start,
	    end = _ref8.end,
	    xScale = _ref8.xScale,
	    yScale = _ref8.yScale,
	    m = _ref8.m,
	    b = _ref8.b;

	var _xScale$domain3 = xScale.domain(),
	    _xScale$domain4 = _slicedToArray(_xScale$domain3, 2),
	    xBegin = _xScale$domain4[0],
	    xFinish = _xScale$domain4[1];

	var _yScale$domain3 = yScale.domain(),
	    _yScale$domain4 = _slicedToArray(_yScale$domain3, 2),
	    yBegin = _yScale$domain4[0],
	    yFinish = _yScale$domain4[1];

	var x1 = start[0];
	if (end[0] === start[0]) {
		return {
			x1: x1,
			y1: start[1],
			x2: x1,
			y2: end[1] > start[1] ? yFinish : yBegin
		};
	}

	var x2 = end[0] > start[0] ? xFinish : xBegin;

	return {
		x1: x1, y1: m * x1 + b,
		x2: x2, y2: m * x2 + b
	};
}

function getLineCoordinates(_ref9) {
	var start = _ref9.start,
	    end = _ref9.end;

	var _start = _slicedToArray(start, 2),
	    x1 = _start[0],
	    y1 = _start[1];

	var _end = _slicedToArray(end, 2),
	    x2 = _end[0],
	    y2 = _end[1];

	if (end[0] === start[0]) {
		return {
			x1: x1,
			y1: start[1],
			x2: x1,
			y2: end[1]
		};
	}

	return {
		x1: x1, y1: y1,
		x2: x2, y2: y2
	};
}

StraightLine.propTypes = {
	x1Value: PropTypes.any.isRequired,
	x2Value: PropTypes.any.isRequired,
	y1Value: PropTypes.any.isRequired,
	y2Value: PropTypes.any.isRequired,

	interactiveCursorClass: PropTypes.string,
	stroke: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	strokeOpacity: PropTypes.number.isRequired,
	strokeDasharray: PropTypes.oneOf(strokeDashTypes),

	type: PropTypes.oneOf(["XLINE", // extends from -Infinity to +Infinity
	"RAY", // extends to +/-Infinity in one direction
	"LINE", // extends between the set bounds
	"ARROW", // arrow
	"SELECT"] // select area
	).isRequired,

	onEdge1Drag: PropTypes.func.isRequired,
	onEdge2Drag: PropTypes.func.isRequired,
	onDragStart: PropTypes.func.isRequired,
	onDrag: PropTypes.func.isRequired,
	onDragComplete: PropTypes.func.isRequired,
	onHover: PropTypes.func,
	onUnHover: PropTypes.func,

	defaultClassName: PropTypes.string,

	r: PropTypes.number.isRequired,
	withEdge: PropTypes.bool.isRequired,
	children: PropTypes.func.isRequired,
	tolerance: PropTypes.number.isRequired,
	selected: PropTypes.bool.isRequired,
	fill: PropTypes.string.isRequired,
	fillOpacity: PropTypes.number.isRequired
};

StraightLine.defaultProps = {
	onEdge1Drag: noop,
	onEdge2Drag: noop,
	onDragStart: noop,
	onDrag: noop,
	onDragComplete: noop,

	edgeStrokeWidth: 3,
	edgeStroke: "#000000",
	edgeFill: "#FFFFFF",
	r: 10,
	withEdge: false,
	strokeWidth: 1,
	strokeDasharray: "Solid",
	children: noop,
	tolerance: 7,
	selected: false,
	fill: "#8AAFE2",
	fillOpacity: 0.5
};

export default StraightLine;
//# sourceMappingURL=StraightLine.js.map