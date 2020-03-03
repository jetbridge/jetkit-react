"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles_1 = require("@material-ui/core/styles");
const section_1 = require("./section");
const userSection_1 = require("./userSection");
const styles = (theme) => styles_1.createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.primary.contrastText,
        backgroundColor: '#F6F6F8',
        width: theme.navWidth,
        minWidth: theme.navWidth,
        paddingTop: '2.5rem',
        boxShadow: '1px 0px 5px 0px rgba(0,0,0,0.25)',
        position: 'relative',
        alignItems: 'center',
    },
});
const Menu = ({ defaultSelectedSection, sectionSelected: onSectionSelected, defaultSelectedSubSection, classes, sections, logoSrc, userName, avatarSrc, }) => {
    const [state, setState] = React.useState({
        selectedSection: defaultSelectedSection,
        selectedSubSection: defaultSelectedSubSection,
    });
    const onClick = (section, subSectionTitle) => {
        setState(prevState => {
            let selectedSubSection = subSectionTitle || (prevState.selectedSubSection && prevState.selectedSubSection[section.title]);
            if (!selectedSubSection) {
                // default to first subsecion if exists
                selectedSubSection = section.subsections && section.subsections[0] ? section.subsections[0].title : undefined;
            }
            return {
                selectedSection: section,
                selectedSubSection: { [section.title]: selectedSubSection },
            };
        });
    };
    React.useEffect(() => {
        if (onSectionSelected && state.selectedSection) {
            onSectionSelected(state.selectedSection, state.selectedSubSection && state.selectedSubSection[state.selectedSection.title]);
        }
    }, [onSectionSelected, state.selectedSection, state.selectedSubSection]);
    return (React.createElement("div", { className: classes.container },
        logoSrc && React.createElement("img", { src: logoSrc, width: "250", alt: "logo" }),
        userName && React.createElement(userSection_1.default, { avatarSrc: avatarSrc, userName: userName }),
        React.createElement("div", null, sections.map(s => (React.createElement(section_1.default, { key: s.title, section: s, onClick: onClick, expanded: state.selectedSection === s, selectedSubSection: state.selectedSubSection && state.selectedSubSection[s.title] }))))));
};
exports.default = styles_1.withStyles(styles)(Menu);
//# sourceMappingURL=index.js.map