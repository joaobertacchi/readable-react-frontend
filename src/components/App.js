// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { handleInitialData } from '../actions/shared';

import PostList from '../routes/PostList';
import PostDetails from '../routes/PostDetails';
import { Header } from '../components/layouts';
import { type SortType, Constants } from '../types/post';

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

type State = {
  sortType: SortType,
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sortType: Constants.sortType.DATE,
    };
  }

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  onSortType = (sortType: SortType) => {
    this.setState({
      sortType,
    });
  };

  render(): React$Node {
    const { classes } = this.props;
    const { sortType } = this.state;
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Header />
          <Route
            path='/'
            exact
            render={(props: Props): React$Node =>
              <PostList
                {...props}
                onSortType={this.onSortType}
                sortType={sortType}
              />
            }
          />
          <Route
            path='/:category'
            exact
            render={(props: Props): React$Node =>
              <PostList
                {...props}
                onSortType={this.onSortType}
                sortType={sortType}
                selectedCategory={props.match.params.category}
              />
            }
          />
          <Route
            path='/:category/:postId'
            exact
            render={(props: Props): React$Node =>
              <PostDetails {...props} />
            }
          />
        </div>
      </Router>
    );
  }
}

export default connect()(withStyles(styles)(App));
