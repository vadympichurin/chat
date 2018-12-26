import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';

import Message from './Components/Message/Message';
import ColorPanel from './Components/ColorPanel/ColorPanel';
import MetaPanel from './Components/MetaPanel/MetaPanel';
import SidePanel from './Components/SidePanel/SidePanel';
import { connect } from 'react-redux';


const App = ({colors}) => {
    return (
      <Grid columns='equal' className='app' style={{background: colors.secondaryColor}}>
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

const MSTP = state => ({
  colors: state.colors,
})

export default connect(MSTP)(App);
