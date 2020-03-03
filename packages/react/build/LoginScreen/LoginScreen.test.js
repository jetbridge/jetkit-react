"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const _1 = require(".");
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(React.createElement(_1.default, { onSubmitClick: () => null }), div);
    ReactDOM.unmountComponentAtNode(div);
});
//# sourceMappingURL=LoginScreen.test.js.map