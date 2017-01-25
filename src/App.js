import React, { Component } from 'react';

import './App.css';
import BulletChart from './BulletChart';
import data from './data';

class App extends Component {
  render() {
    let label = '2005 YTD';
    //Change the orientation to vertical to display the chart vertically

    return (
      <div>
        <p>
          <BulletChart data={data} label={label} orientation='horizontal'/>
        </p>
      </div>
    );
  }
}

export default App;
