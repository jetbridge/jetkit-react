"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const pagedTable_1 = require("./pagedTable/pagedTable");
const core_1 = require("@material-ui/core");
// import { act } from 'react-dom/test-utils'
const react_1 = require("@testing-library/react");
require("@testing-library/jest-dom/extend-expect");
const fakePaginatedResponse = (val) => {
    const res = {
        total: 1,
        total_pages: 1,
        first_page: 1,
        last_page: 1,
        page: 1,
        rows: [val],
    };
    return res;
};
const tableHeader = (React.createElement(core_1.TableHead, null,
    React.createElement(core_1.TableRow, null,
        React.createElement(core_1.TableCell, null, "Value"))));
describe('PagedTable', () => {
    afterEach(react_1.cleanup);
    it('renders without crashing', async () => {
        const fakeResponse = 'ok';
        const apiCall = () => Promise.resolve(fakePaginatedResponse(fakeResponse));
        const Table = () => {
            const pagedTable = pagedTable_1.default({
                apiCall,
            });
            const renderRow = React.useCallback((val) => (React.createElement(core_1.TableRow, { key: val },
                React.createElement(core_1.TableCell, { "data-testid": "val" },
                    "Value: ",
                    val))), []);
            return React.createElement(pagedTable_1.PagedTable, Object.assign({}, pagedTable.renderProps, { renderRow: renderRow, header: tableHeader }));
        };
        let getByTestId;
        // change this to async act when we can upgrade to react 16.9.0
        // https://github.com/facebook/react/pull/14853
        // https://medium.com/@AndreCalvo/testing-custom-react-hooks-that-use-fetch-or-other-async-functions-5fb128d07f53
        react_1.act(() => {
            getByTestId = react_1.render(React.createElement(Table, null)).getByTestId;
        });
        await react_1.waitForElement(() => getByTestId('val'));
        // should have value from fake paginated response
        expect(getByTestId('val')).toHaveTextContent(fakeResponse);
    });
});
//# sourceMappingURL=pagedTable.test.js.map