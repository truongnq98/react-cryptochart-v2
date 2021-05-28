"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Format = require("d3-format");

var _d3TimeFormat = require("d3-time-format");

var _displayValuesFor = require("./displayValuesFor");

var _displayValuesFor2 = _interopRequireDefault(_displayValuesFor);

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _utils = require("../utils");

var _ToolTipText = require("./ToolTipText");

var _ToolTipText2 = _interopRequireDefault(_ToolTipText);

var _ToolTipTSpanLabel = require("./ToolTipTSpanLabel");
const { bisector } = require("d3-array");

var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OHLCTooltip = function (_Component) {
	_inherits(OHLCTooltip, _Component);

	function OHLCTooltip(props) {
		_classCallCheck(this, OHLCTooltip);

		var _this = _possibleConstructorReturn(this, (OHLCTooltip.__proto__ || Object.getPrototypeOf(OHLCTooltip)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		return _this;
	}

	_createClass(OHLCTooltip, [{
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var displayValuesFor = this.props.displayValuesFor;
			var _props = this.props,
			    xDisplayFormat = _props.xDisplayFormat,
			    accessor = _props.accessor,
			    volumeFormat = _props.volumeFormat,
			    ohlcFormat = _props.ohlcFormat,
			    percentFormat = _props.percentFormat,
			    tooltipDefault = _props.tooltipDefault;
			var _moreProps$chartConfi = moreProps.chartConfig,
			    width = _moreProps$chartConfi.width,
			    height = _moreProps$chartConfi.height;
			var displayXAccessor = moreProps.displayXAccessor;


			var currentItem = displayValuesFor(this.props, moreProps);
			var displayDate = void 0,
			    open = void 0,
			    high = void 0,
			    low = void 0,
			    close = void 0,
			    volume = void 0,
			    percent = void 0,
			    max_cap = void 0,
				btc = void 0,
				eth = void 0;
			displayDate = open = high = low = close = volume = percent = max_cap = btc = eth = null;

			if ((0, _utils.isDefined)(currentItem) && (0, _utils.isDefined)(accessor(currentItem)) && moreProps.show) {
				var item = accessor(currentItem);
				volume = (0, _utils.isDefined)(item.volume) ? volumeFormat(item.volume).replace("G", "B") : null;
				max_cap = (0, _utils.isDefined)(item.max_cap) ? volumeFormat(item.max_cap).replace("G", "B") : null;
				displayDate = xDisplayFormat(displayXAccessor(item));
				open = ohlcFormat(item.open);
				high = ohlcFormat(item.high);
				low = ohlcFormat(item.low);
				close = ohlcFormat(item.close);
				btc = ohlcFormat(currentItem.btc);
				eth = ohlcFormat(currentItem.eth);
				percent = percentFormat((item.close - item.open) / item.open);
			} else if (tooltipDefault) {
				volume = (0, _utils.isDefined)(tooltipDefault.volume) ? volumeFormat(tooltipDefault.volume).replace("G", "B") : null;
				max_cap = (0, _utils.isDefined)(tooltipDefault.max_cap) ? volumeFormat(tooltipDefault.max_cap).replace("G", "B") : null;
				displayDate = xDisplayFormat(displayXAccessor(tooltipDefault));
				open = ohlcFormat(tooltipDefault.open);
				high = ohlcFormat(tooltipDefault.high);
				low = ohlcFormat(tooltipDefault.low);
				close = ohlcFormat(tooltipDefault.close);
				btc = ohlcFormat(tooltipDefault.btc);
				eth = ohlcFormat(tooltipDefault.eth);
			}

			var originProp = this.props.origin;

			var origin = (0, _utils.functor)(originProp);

			var _origin = origin(width, height),
			    _origin2 = _slicedToArray(_origin, 2),
			    x = _origin2[0],
			    y = _origin2[1];

			var itemsToDisplay = {
				displayDate: displayDate,
				open: open,
				high: high,
				low: low,
				close: close,
				percent: percent,
				volume: volume,
				max_cap: max_cap,
				btc: btc,
				eth: eth,
				x: x,
				y: y
			};

			return this.props.children(this.props, moreProps, itemsToDisplay);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_GenericChartComponent2.default, {
				clip: false,
				svgDraw: this.renderSVG,
				drawOn: ["mousemove"]
			});
		}
	}]);

	return OHLCTooltip;
}(_react.Component);

OHLCTooltip.propTypes = {
	className: _propTypes2.default.string,
	accessor: _propTypes2.default.func,
	xDisplayFormat: _propTypes2.default.func,
	children: _propTypes2.default.func,
	volumeFormat: _propTypes2.default.func,
	percentFormat: _propTypes2.default.func,
	ohlcFormat: _propTypes2.default.func,
	origin: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.func]),
	fontFamily: _propTypes2.default.string,
	fontSize: _propTypes2.default.number,
	onClick: _propTypes2.default.func,
	displayValuesFor: _propTypes2.default.func,
	textFill: _propTypes2.default.string,
	labelFill: _propTypes2.default.object,
	displayTexts: _propTypes2.default.object,
	tooltipDefault: _propTypes2.default.object
};

var displayTextsDefault = {
	d: "Date: ",
	o: " O: ",
	h: " H: ",
	l: " L: ",
	c: " C: ",
	v: " Vol: ",
	m: " Cap: ",
	btc: " Btc: ",
	eth: " Eth: ",
	na: "n/a"
};

OHLCTooltip.defaultProps = {
	accessor: function accessor(d) {
		return {
			date: d.date,
			open: d.open,
			high: d.high,
			low: d.low,
			close: d.close,
			volume: d.volume,
			max_cap: d.max_cap,
			btc: d.btc,
			eth: d.eth,
		};
	},
	xDisplayFormat: (0, _d3TimeFormat.timeFormat)("%Y-%m-%d"),
	volumeFormat: (0, _d3Format.format)(".4s"),
	percentFormat: (0, _d3Format.format)(".2%"),
	ohlcFormat: (0, _d3Format.format)(".2f"),
	displayValuesFor: _displayValuesFor2.default,
	origin: [0, 0],
	children: defaultDisplay,
	displayTexts: displayTextsDefault
};

function defaultDisplay(props, moreProps, itemsToDisplay) {

	/* eslint-disable */
	var className = props.className,
	    textFill = props.textFill,
	    labelFill = props.labelFill,
	    onClick = props.onClick,
	    fontFamily = props.fontFamily,
	    fontSize = props.fontSize,
	    displayTexts = props.displayTexts;
	/* eslint-enable */

	var displayDate = itemsToDisplay.displayDate,
	    open = itemsToDisplay.open,
	    high = itemsToDisplay.high,
	    low = itemsToDisplay.low,
	    close = itemsToDisplay.close,
	    volume = itemsToDisplay.volume,
	    max_cap = itemsToDisplay.max_cap,
		btc = itemsToDisplay.btc,
		eth = itemsToDisplay.eth,
	    x = itemsToDisplay.x,
	    y = itemsToDisplay.y;

	return _react2.default.createElement(
		"g",
		{
			className: "react-stockcharts-tooltip-hover " + className,
			transform: "translate(" + x + ", " + y + ")",
			onClick: onClick
		},
		_react2.default.createElement(
			_ToolTipText2.default,
			{
				x: 0,
				y: 0,
				fontFamily: fontFamily,
				fontSize: fontSize
			},
			(0, _utils.isDefined)(displayDate) && _react2.default.createElement(
				_react2.default.Fragment,
				null,
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{
						fill: labelFill,
						key: "label",
						x: 0,
						dy: "5" },
					displayTexts.d
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value"},
					displayDate
				)
			),
			(0, _utils.isDefined)(open) && displayTexts.o ? _react2.default.createElement(
				_react2.default.Fragment,
				null,
				_react2.default.createElement(
					"tspan",
					{ fill: 'transparent' },
					"_"
				),         
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_C" },
					displayTexts.o
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_C" },
					open
				)
			) : "",
			(0, _utils.isDefined)(high) && displayTexts.h ? _react2.default.createElement(
				_react2.default.Fragment,
				null,
				_react2.default.createElement(
					"tspan",
					{ fill: 'transparent' },
					"_"
				),         
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_C" },
					displayTexts.h
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_C" },
					high
				)
			) : "",
			(0, _utils.isDefined)(low) && displayTexts.l ? _react2.default.createElement(
				_react2.default.Fragment,
				null,
				_react2.default.createElement(
					"tspan",
					{ fill: 'transparent' },
					"_"
				),         
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_C" },
					displayTexts.l
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_C" },
					low
				)
			) : "",
			(0, _utils.isDefined)(close) && displayTexts.c ? _react2.default.createElement(
				_react2.default.Fragment,
				null,
				_react2.default.createElement(
					"tspan",
					{ fill: 'transparent' },
					"_"
				),         
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_C" },
					displayTexts.c
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_C" },
					close
				)
			) : "",
			(0, _utils.isDefined)(volume) && displayTexts.v ? _react2.default.createElement(
				_react2.default.Fragment,
				null,
				_react2.default.createElement(
					"tspan",
					{ fill: 'transparent' },
					"_"
				),         
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_Vol" },
					displayTexts.v
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_Vol" },
					volume
				)
			) : "",
			(0, _utils.isDefined)(max_cap) && displayTexts.m ? _react2.default.createElement(
				_react2.default.Fragment,
				null,
				_react2.default.createElement(
					"tspan",
					{ fill: 'transparent' },
					"_"
				),         
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_Cap" },
					displayTexts.m
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_Cap" },
					max_cap
				)
			) : ""
			,
			(0, _utils.isDefined)(btc) && displayTexts.btc ? _react2.default.createElement(
				_react2.default.Fragment,
				null,
				_react2.default.createElement(
					"tspan",
					{ fill: 'transparent' },
					"_"
				),                   
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: '#ffa400', key: "label_Btc" },
					displayTexts.btc
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_Btc" },
					btc
				)
			) : "",
			(0, _utils.isDefined)(eth) && displayTexts.eth ? _react2.default.createElement(
				_react2.default.Fragment,
				null,
				_react2.default.createElement(
					"tspan",
					{ fill: 'transparent' },
					"_"
				),                   
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: '#d46a67', key: "label_Eth" },
					displayTexts.eth
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_Eth" },
					eth
				)
			) : ""
		)
	);
}

exports.default = OHLCTooltip;
//# sourceMappingURL=OHLCTooltip.js.map