"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles_1 = require("@material-ui/core/styles");
const ExpansionPanel_1 = require("@material-ui/core/ExpansionPanel");
const ExpansionPanelDetails_1 = require("@material-ui/core/ExpansionPanelDetails");
const ExpansionPanelSummary_1 = require("@material-ui/core/ExpansionPanelSummary");
const List_1 = require("@material-ui/core/List");
const ListItem_1 = require("@material-ui/core/ListItem");
const Typography_1 = require("@material-ui/core/Typography");
const classnames_1 = require("classnames");
const styles = (theme) => styles_1.createStyles({
    selectedBackground: {
        backgroundImage: 'linear-gradient(to left, #213161, #24489e)',
        color: 'white',
    },
    defaultBackground: {
        backgroundColor: '#F6F6F8',
        color: theme.palette.primary.contrastText,
    },
    selectedItem: {
        backgroundColor: theme.palette.primary.main,
    },
    item: {
        // textTransform: 'uppercase',
        fontSize: '1.2rem',
        paddingLeft: '2.5rem',
    },
    selectedSectionTitle: {
        backgroundColor: 'transparent !important',
        fontSize: '2rem',
    },
    subsectionTitle: {
        letterSpacing: '0.25em',
        fontSize: '0.9rem',
        color: theme.palette.primary.contrastText,
    },
    selectedSubsectionTitle: {
        color: theme.palette.primary.contrastText,
        fontWeight: 'bolder',
    },
    subSectionsList: {
        width: '100%',
    },
    sectionTitle: {
        letterSpacing: '0.25em',
        fontSize: 18,
        fontWeight: 500,
        textTransform: 'uppercase',
        color: 'black',
        marginLeft: '1rem',
        fontFamily: 'Avenir',
        opacity: 0.84,
        lineHeight: 'normal',
    },
    sectionRoot: {
        margin: '10px 0',
        boxShadow: 'none',
        '&:before': {
            height: 0,
        },
    },
});
const Section = ({ classes, onClick, selectedSubSection, expanded, section }) => {
    const handleClick = (title) => (event) => {
        if (onClick) {
            onClick(section, title);
        }
        event.stopPropagation();
    };
    const subSections = section.subsections || [];
    const menuListClass = expanded ? classes.selectedBackground : classes.defaultBackground;
    return (React.createElement(ExpansionPanel_1.default, { onClick: handleClick(), classes: { root: classes.sectionRoot }, className: classnames_1.default(menuListClass), expanded: expanded },
        React.createElement(ExpansionPanelSummary_1.default, null,
            React.createElement("span", { style: { display: 'flex', justifyContent: 'center' } },
                section.icon,
                React.createElement(Typography_1.default, { style: { color: expanded ? 'white' : 'black' }, className: classes.sectionTitle }, section.title))),
        React.createElement(ExpansionPanelDetails_1.default, { style: { padding: 0 } },
            React.createElement(List_1.default, { className: classes.subSectionsList }, subSections.map(subSection => (React.createElement(ListItem_1.default, { onClick: handleClick(subSection.title), key: subSection.title, button: true, className: classnames_1.default(classes.item, selectedSubSection === subSection.title ? classes.selectedItem : undefined) },
                subSection.icon && React.createElement("span", { style: { marginRight: 12 } }, subSection.icon),
                React.createElement(Typography_1.default, { className: classnames_1.default(classes.subsectionTitle, selectedSubSection === subSection.title ? classes.selectedSubsectionTitle : undefined) }, subSection.title))))))));
};
exports.default = styles_1.withStyles(styles)(Section);
//# sourceMappingURL=section.js.map