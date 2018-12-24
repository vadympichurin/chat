import React, { Component } from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';

import Message from './Components/Message/Message';
import ColorPanel from './Components/ColorPanel/ColorPanel';
import MetaPanel from './Components/MetaPanel/MetaPanel';
import SidePanel from './Components/SidePanel/SidePanel';


const App = () => {
    return (
      <Grid columns='equal' className='app'>
      <ColorPanel/>
      <SidePanel/>
      <Grid.Column style={{marginLeft: 320}}>
      <Message/>
      </Grid.Column>
      <Grid.Column width={4}>
      <MetaPanel/>
      </Grid.Column>
      </Grid>
    )
  
}

export default App;
