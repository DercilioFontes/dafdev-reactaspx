"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class MenuBox extends React.Component {
    constructor(state) {
        super(state);
        this.state = { items: null, myOrder: null, showPopup: false, userId: 0, orderPlaced: false };
        this.getLoginStatus();
        this.loadMenusFromServer();
    }
    getLoginStatus() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/data/GetUserId/', true);
        xhr.onload = () => {
            const userId = parseInt(xhr.responseText);
            const tmp = this.state;
            tmp.userId = userId;
            this.setState(tmp);
        };
        xhr.send();
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
    addToCart(id) {
        if (this.state.userId < 1) {
            alert("Log in to continue!");
            return;
        }
        id--;
        const myCart = this.state.myOrder || [];
        const allItems = this.state.items;
        if (myCart.indexOf(allItems[id]) > -1) {
            const itemToOrder = myCart.find(m => m.Id === allItems[id].Id);
            itemToOrder["Quantity"] = itemToOrder["Quantity"] + 1;
        }
        else {
            const itemToOrder = allItems[id];
            itemToOrder["Quantity"] = 1;
            myCart.push(allItems[id]);
        }
        const tmp = this.state;
        tmp.myOrder = myCart;
        tmp.showPopup = false;
        this.setState(tmp);
    }
    render() {
        const menus = this.state.items || new Array();
        const menuList = menus.map(menu => {
            return (React.createElement("div", { key: menu.Id },
                React.createElement("b", null, menu.Name),
                React.createElement("br", null),
                React.createElement("img", { style: { width: '100px', float: 'left', margin: '5px' }, src: "/Img/" + menu.Picture }),
                menu.Description,
                React.createElement("div", null,
                    "$",
                    menu.Price,
                    " | ",
                    React.createElement("a", { href: "#", onClick: this.addToCart.bind(this, menu.Id) }, "Add to cart")),
                React.createElement("hr", null)));
        });
        let total = 0;
        const myCart = this.state.myOrder || new Array();
        const myItems = myCart.map(menu => {
            total += menu.Price * menu.Quantity;
            return (React.createElement("div", { key: menu.Id },
                React.createElement("img", { style: { width: '75px', float: 'left', margin: '5px' }, src: "/Img/" + menu.Picture }),
                menu.Name,
                React.createElement("br", null),
                "Qty: ",
                menu.Quantity,
                React.createElement("br", null),
                "Price: $",
                menu.Price * menu.Quantity,
                React.createElement("br", null),
                React.createElement("hr", null)));
        });
        let totalAndContinueLink = React.createElement("div", { className: "grandTotal cartEmpty" }, "Cart Empty!");
        if (total > 0) {
            totalAndContinueLink =
                React.createElement("div", { className: "grandTotal cartNotEmpty" },
                    "Grand Total: $",
                    total,
                    React.createElement("button", { className: "greenBtn continueOrder" }, "Continue Order"));
        }
        return (React.createElement("div", null,
            React.createElement("div", { id: "wrapper" },
                React.createElement("div", { id: "dvmenu" }, menuList),
                React.createElement("div", { id: "dvcart" },
                    React.createElement("div", { id: "cartContent" }, myItems),
                    totalAndContinueLink))));
    }
    ;
}
exports.MenuBox = MenuBox;
//# sourceMappingURL=MenuBox.js.map