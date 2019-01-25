'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./utils/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const express = require('express')
var PORT = process.env.PORT || 3000;
var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
app.server = server;

app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('dev'));

server.listen(PORT, function () {
    (0, _logger.print)('App is running on ' + PORT);
});

exports.default = app;
//# sourceMappingURL=index.js.map