import * as React from "react";
import * as ReactDOM from "react-dom";
import { FoodModel, IAppState } from "./Models"

export class MenuBox extends React.Component<any, IAppState> {
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
            const userId: number = parseInt(xhr.responseText);
            const tmp: IAppState = this.state;
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
            const tmp: IAppState = this.state;
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
        } else {
            const itemToOrder = allItems[id];
            itemToOrder["Quantity"] = 1;
            myCart.push(allItems[id]);
        }

        const tmp: IAppState = this.state;
        tmp.myOrder = myCart;
        tmp.showPopup = false;
        this.setState(tmp);
    }

    render() {
        let menus = this.state.items || [];
        const menuList = menus.map(menu => {
            return (
                <div key={menu.Id}>
                    <b>{menu.Name}</b><br />
                    <img style={{ width: '100px', float: 'left', margin: '5px' }} src={"/Img/" + menu.Picture} />
                    {menu.Description}
                    <div>${menu.Price} | <a href="#" onClick={this.addToCart.bind(this, menu.Id)}>Add to cart</a></div><hr />
                </div>
            );
        });
        return (
            <div>
                <div id="wrapper">
                    <div id="dvmenu">
                        {menuList}
                    </div>
                </div>
            </div>);
    };
}