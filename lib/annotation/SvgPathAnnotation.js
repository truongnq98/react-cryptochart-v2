"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SvgPathAnnotation = function (_Component) {
	_inherits(SvgPathAnnotation, _Component);

	function SvgPathAnnotation(props) {
		_classCallCheck(this, SvgPathAnnotation);

		var _this = _possibleConstructorReturn(this, (SvgPathAnnotation.__proto__ || Object.getPrototypeOf(SvgPathAnnotation)).call(this, props));

		_this.handleClick = _this.handleClick.bind(_this);
		_this.handleHover = _this.handleHover.bind(_this);
		_this.handleLeave = _this.handleLeave.bind(_this);
		return _this;
	}

	_createClass(SvgPathAnnotation, [{
		key: "handleClick",
		value: function handleClick(e) {
			var onClick = this.props.onClick;


			if (onClick) {
				var _props = this.props,
				    xScale = _props.xScale,
				    yScale = _props.yScale,
				    datum = _props.datum;

				onClick({ xScale: xScale, yScale: yScale, datum: datum }, e);
			}
		}
	}, {
		key: "handleHover",
		value: function handleHover(e) {
			var onMouseOver = this.props.onMouseOver;


			if (onMouseOver) {
				var _props = this.props,
				    xScale = _props.xScale,
				    yScale = _props.yScale,
				    datum = _props.datum;

				onMouseOver({ xScale: xScale, yScale: yScale, datum: datum }, e);
			}
		}
	}, {
		key: "handleLeave",
		value: function handleLeave(e) {
			var onMouseOut = this.props.onMouseOut;

			
			if (onMouseOut) {
				var _props = this.props,
				    xScale = _props.xScale,
				    yScale = _props.yScale,
				    datum = _props.datum;

				onMouseOut({ xScale: xScale, yScale: yScale, datum: datum }, e);
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props,
			    className = _props2.className,
			    stroke = _props2.stroke,
			    opacity = _props2.opacity;
			var _props3 = this.props,
			    xAccessor = _props3.xAccessor,
			    xScale = _props3.xScale,
			    yScale = _props3.yScale,
			    path = _props3.path;
			var circle = _props3.circle,
				opacityCircle = _props2.opacityCircle,
				strokeWidth = _props2.strokeWidth,
				strokeCircle = _props2.strokeCircle,
				showNews = _props3.showNews,
				strokeDasharray = _props2.strokeDasharray,
				datum= _props2.datum;
			

			var _helper = helper(this.props, xAccessor, xScale, yScale),
			    x = _helper.x,
			    y = _helper.y,
			    fill = _helper.fill,
				fillCircle = _helper.fillCircle,
				fillHover = _helper.fillHover,
			    tooltip = _helper.tooltip;

			if (circle !== null) {
				var fillPath = fill,
					fillCirclePath = fillCircle,
					opacityCirclePath = opacityCircle;
				if (showNews) {
					strokeCircle = datum.news.percent >= 0 ? '#009933' : '#ff0000'
					return _react2.default.createElement(
						"g",
						{ className: className, onClick: this.handleClick, onMouseOver: this.handleHover, onMouseOut: this.handleLeave },
						_react2.default.createElement(
							"title",
							null,
							tooltip
						),
						_react2.default.createElement("circle", { cx: x, cy: y, r: circle, stroke: strokeCircle, fill: fillCirclePath, opacity: opacityCirclePath, strokeWidth: strokeWidth, strokeDasharray: strokeDasharray }),
					);
				}
				return _react2.default.createElement(
					"g",
					{ className: className, onClick: this.handleClick, onMouseOver: this.handleHover, onMouseOut: this.handleLeave },
					_react2.default.createElement(
						"title",
						null,
						tooltip
					),
					_react2.default.createElement("circle", { cx: x, cy: y, r: circle, stroke: strokeCircle, fill: fillCirclePath, opacity: opacityCirclePath, strokeWidth: strokeWidth, strokeDasharray: strokeDasharray }),
					_react2.default.createElement("path", { d: path({ x: x, y: y }), stroke: stroke, fill: fillPath, opacity: opacity })
				);
			}
			return _react2.default.createElement(
				"g",
				{ className: className, onClick: this.handleClick, onMouseOver: this.handleHover, onMouseOut: this.handleLeave },
				_react2.default.createElement(
					"title",
					null,
					tooltip
				),
				_react2.default.createElement("path", { d: path({ x: x, y: y }), stroke: stroke, fill: fill, opacity: opacity })
			);
		}
	}]);

	return SvgPathAnnotation;
}(_react.Component);

function helper(props, xAccessor, xScale, yScale) {
	var x = props.x,
	    y = props.y,
	    datum = props.datum,
	    fill = props.fill,
	    tooltip = props.tooltip,
	    plotData = props.plotData,
		fillCircle = props.fillCircle,
		fillHover = props.fillHover;


	var xFunc = (0, _utils.functor)(x);
	var yFunc = (0, _utils.functor)(y);

	var _ref = [xFunc({ xScale: xScale, xAccessor: xAccessor, datum: datum, plotData: plotData }), yFunc({ yScale: yScale, datum: datum, plotData: plotData })],
	    xPos = _ref[0],
	    yPos = _ref[1];


	return {
		x: xPos,
		y: yPos,
		fill: (0, _utils.functor)(fill)(datum),
		tooltip: (0, _utils.functor)(tooltip)(datum),
		fillCircle: (0, _utils.functor)(fillCircle)(datum),
		fillHover: (0, _utils.functor)(fillHover)(datum)
	};
}

SvgPathAnnotation.propTypes = {
	className: _propTypes2.default.string,
	path: _propTypes2.default.func.isRequired,
	onClick: _propTypes2.default.func,
	onMouseOver: _propTypes2.default.func,
	onMouseOut: _propTypes2.default.func,
	xAccessor: _propTypes2.default.func,
	xScale: _propTypes2.default.func,
	yScale: _propTypes2.default.func,
	datum: _propTypes2.default.object,
	stroke: _propTypes2.default.string,
	fill: _propTypes2.default.string,
	opacity: _propTypes2.default.number,
	circle: _propTypes2.default.number,
	opacityCircle: _propTypes2.default.string,
	fillCircle: _propTypes2.default.string,
	fillHover:  _propTypes2.default.string,
	strokeWidth: _propTypes2.default.number,
	strokeCircle: _propTypes2.default.string,
	strokeDasharray: _propTypes2.default.string,
	showNews: _propTypes2.default.boolean,
};

SvgPathAnnotation.defaultProps = {
	className: "react-stockcharts-svgpathannotation",
	opacity: 1,
	x: function x(_ref2) {
		var xScale = _ref2.xScale,
		    xAccessor = _ref2.xAccessor,
		    datum = _ref2.datum;
		return xScale(xAccessor(datum));
	}
};

exports.default = SvgPathAnnotation;
//# sourceMappingURL=SvgPathAnnotation.js.map