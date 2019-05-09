// @flow

import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { type CategoriesStateType, type GlobalStateType } from '../../types/state';
import { type CategoryType } from '../../types/category';

const styles = (): Object => ({
  footer: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
});

type OwnProps = {
  loading: boolean,
  selectedCategory: string,
};

type StyleProps = {
  classes: Object,
}

type StateProps = {
  categories: CategoriesStateType,
};

type Props = OwnProps & StyleProps & StateProps;

class Footer extends React.Component<Props> {
  render(): React$Node {
    const { classes, categories, loading, selectedCategory } = this.props;
    return (
      <div className={classes.footer}>
        <Paper>
          {loading
            ? null
            : <Tabs
                value={typeof selectedCategory === 'undefined' ? '' : selectedCategory}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="All" value="" component={Link} to='/' />
                {categories.map((category: CategoryType): React$Node => (
                  <Tab key={category.name} label={category.name} value={category.name} component={Link} to={`/${category.path}`} />
                ))}
              </Tabs>
          }
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ categories }: GlobalStateType): StateProps {
  return {
    categories,
    loading: !categories || categories.length === 0,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Footer));