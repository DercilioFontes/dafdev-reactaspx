import * as React from "react";
import * as ReactDOM from "react-dom";
import { FoodModel, IAppState } from "./Models"

export class MenuBox extends React.Component<any, IAppState> {
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
      const tmp: IAppState = this.state;
      tmp.items = dataItems;
      this.setState(tmp);
    };
    xhr.send();
  }

  render() {
    return (
      <div>
        Test
      </div>);
  };
}