"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class MenuBox extends React.Component {
    constructor(state) {
        super(state);
        this.state = { items: null, myOrder: null, showPopup: false, userId: 0, orderPlaced: false };
        this.loadMenusFromServer();
    }
    loadMenusFromServer() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/data/GetMenuList/', true);
        xhr.onload = () => {
            const dataItems = JSON.parse(xhr.responseText);
            const tmp = this.state;
            tmp.items = dataItems;
            this.setState(tmp);
        };
        xhr.send();
    }
    render() {
        return (React.createElement("div", null, "Test"));
    }
    ;
}
exports.MenuBox = MenuBox;
//# sourceMappingURL=MenuBox.js.map