// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { handleInitialData } from '../actions/shared';

import PostList from './PostList';
import PostDetails from './PostDetails';
import { Header } from './layouts';

const styles = (theme: Object): Object => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
});

type RouterProps = {
  match: {
    params: {
      category: string,
      history: Object,
    },
  },
};

type ConnectedProps = {
  dispatch: Function,
};

type StyleProps = {
  classes: Object,
};

type Props = ConnectedProps & RouterProps & StyleProps;

class App extends Component<Props> {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render(): React$Node {
    const { classes } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Header />
          <Route path='/' exact render={(props: Props): React$Node =>
            <PostList {...props} />
          } />
          <Route path='/:category' exact render={(props: Props): React$Node =>
            <PostList selectedCategory={props.match.params.category} {...props} />
          } />
          <Route path='/:category/:postId' exact render={(props: Props): React$Node =>
            <PostDetails {...props} />
          } />
        </div>
      </Router>
    );
  }
}

export default connect()(withStyles(styles)(App));
