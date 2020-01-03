import React from "react";
import "./DropList.scss";

function DropListItem({ alias, value, onClick, onChange }) {
  return (
    <div
      onClick={() => {
        onChange(value);
        onClick();
      }}
    >
      {alias}
    </div>
  );
}

class DropList extends React.Component {
  constructor({ list, name }) {
    super();
    this.list = list;
    this.name = name;
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      show: false
    };
  }

  onChange(value) {
    console.log(value);
  }

  toggle() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <div className="droplist_hyh">
        <div className="droplist-display_hyh" onClick={this.toggle}>
          {this.name}
        </div>
        <div className={`droplist-list_hyh ${this.state.show ? "" : "hide"}`}>
          {this.list.map(item => (
            <DropListItem
              key={item.alias}
              alias={item.alias}
              value={item.value}
              onClick={() => {
                item.onClick && item.onClick();
                this.toggle();
              }}
              onChange={this.onChange}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default DropList;
