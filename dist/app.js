"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const ReactDOM = __importStar(require("react-dom"));
const Hello_1 = require("./components/Hello");
const Letters_1 = require("./components/Letters");
ReactDOM.render(React.createElement(Hello_1.Hello, { compiler: "TypeScript", framework: "React" }), document.getElementById("example"));
ReactDOM.render(React.createElement(Letters_1.Letters, null), document.getElementById("buttons"));
//# sourceMappingURL=app.js.map