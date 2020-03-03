"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const TextField_1 = require("@material-ui/core/TextField");
const styles_1 = require("@material-ui/core/styles");
const use_debounce_1 = require("use-debounce");
const toTitleCase_1 = require("../../toTitleCase");
const useStyles = styles_1.makeStyles((theme) => styles_1.createStyles({}));
const TextFieldWithDebounce = textFieldProps => {
    const classes = useStyles(textFieldProps);
    const { value, onChange, debounceTimeout = 300, titleCase, ...props } = textFieldProps;
    const [internalValue, setValue] = React.useState();
    const [initialValueSet, setInitialValueSet] = React.useState(false);
    React.useEffect(() => {
        if (!initialValueSet) {
            setValue(value);
            setInitialValueSet(true);
        }
    }, [initialValueSet, value]);
    const [debouncedCallback] = use_debounce_1.useDebouncedCallback((event) => {
        onChange(event);
    }, 
    // delay in ms
    debounceTimeout);
    const handleChange = (event) => {
        event.persist();
        const value = titleCase ? toTitleCase_1.default(event.target.value) : event.target.value;
        setValue(value);
        debouncedCallback(event);
    };
    /**
     * Hack to make 'props.variant' type safe
     *
     * See: https://github.com/mui-org/material-ui/issues/15697
     */
    const tsProps = (() => {
        let tsVariant;
        switch (props.variant) {
            case 'outlined': {
                tsVariant = { variant: 'outlined' };
                break;
            }
            case 'filled': {
                tsVariant = { variant: 'filled' };
                break;
            }
            case undefined:
            default: {
                tsVariant = { variant: 'standard' };
                break;
            }
        }
        const p = props;
        delete p.variant;
        return { ...p, ...tsVariant };
    })();
    return (React.createElement(TextField_1.default, Object.assign({ classes: classes, margin: "normal", value: internalValue || '', onChange: handleChange }, tsProps)));
};
exports.default = TextFieldWithDebounce;
//# sourceMappingURL=index.js.map