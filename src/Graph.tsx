import React, { Component } from 'react';
import { Table } from '@finos/perspective';
import { ServerRespond } from './DataStreamer';
import './Graph.css';


interface IProps {
  data: ServerRespond[],
}


 */
interface PerspectiveViewerElement extends HTMLElement{
  load: (table: Table) => void,
}


class Graph extends Component<IProps, {}> {
 
  table: Table | undefined;

  render() {
    return React.createElement('perspective-viewer');
  }

  componentDidMount() {
    
    const elem = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;
    const schema = {
      stock: 'string',
      top_ask_price: 'float',
      top_bid_price: 'float',
      timestamp: 'date',
    };

    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }
    if (this.table) {
      
      elem.load(this.table);
      elem.setAttribute('view','y_line');
      elem.setAttribute('column-pivots','["stock"]');
      elem.setAttribute('row-pivots','["timestamp"]');
      elem.setAttribute('columns','["top_ask_price"]');
      elem.setAttribute('aggregates', `{"stock":"distinct count","top_ask_price":"avg","top_bid_price":"avg","timestamp":"distinct count"}`);
    }
  }

export default Graph;
