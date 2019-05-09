// @flow

import React from 'react';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Post from '../components/Post';
import { Footer } from '../components/layouts';
import PostListHeader from '../components/PostListHeader';
import NotFound from '../components/NotFound';

import { type PostId, type SortType, Constants } from '../types/post';
import {
    type GlobalStateType,
    type PostsStateType,
    type CategoriesStateType
} from '../types/state';
import { type CategoryType } from '../types/category';
import PostModal from '../components/PostModal';

const styles = (): Object => ({
  main: {
    marginTop: 80,
    marginBottom: 60,
    // justifyContent: 'space-around',
    minWidth: '800px',
    height: '100%'
  },
});

type StyleProps = {
  classes: Object,
}

type OwnProps = {
  onSortType: Function,
  selectedCategory: string,
  sortType: SortType,
};

type MappedProps = {
  categories: CategoriesStateType,
  loading: boolean,
  postIds: Array<PostId>,
};

type Props = OwnProps & StyleProps & MappedProps;

type State = {
  modalOpen: boolean,
};

class PostList extends React.PureComponent<Props, State> {
  static defaultProps = {
    selectedCategory: '',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };
  
  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render(): React$Node {
    const {
      classes,
      postIds,
      loading,
      selectedCategory,
      onSortType,
      sortType,
      categories,
    } = this.props;
    const { modalOpen } = this.state;
    if (
      selectedCategory.length > 0 &&
      !categories.map((c: CategoryType): string => c.name).includes(selectedCategory)
    )
      return (<NotFound {...this.props} />);

    return (
        <div className={classes.main}>
          <PostModal
            categories={categories}
            modalTitle="Add new post"
            onClose={this.handleClose}
            open={modalOpen}
          />
          <PostListHeader
            onSortType={onSortType}
            sortType={sortType}
            onOpen={this.handleOpen}
          />
          {loading
            ? null
            : (<Grid>
                {postIds.map((postId: PostId): React$Node =>
                  <Post
                    key={postId}
                    postId={postId}
                  />
                )}
              </Grid>)
          }
          <Footer selectedCategory={selectedCategory} />
        </div>
    );
  }
}

const sortBy = (posts: PostsStateType, sortType: SortType): Function => {
  switch (sortType) {
    case Constants.sortType.TITLE:
      return (a: PostId, b: PostId): number => {
        if (posts[a].title > posts[b].title) return 1;
        if (posts[a].title < posts[b].title) return -1;
        return 0;
      };
    case Constants.sortType.DATE:
      return (a: PostId, b: PostId): number => (posts[b].timestamp - posts[a].timestamp);
    case Constants.sortType.SCORE:
      return (a: PostId, b: PostId): number => (posts[b].voteScore - posts[a].voteScore);
    default:
      return (): number => -1;
  }
};

function mapStateToProps({ posts, categories }: GlobalStateType, { selectedCategory, sortType }: OwnProps): MappedProps {
  return {
    postIds: Object.keys(posts)
      .filter((postId: PostId): boolean => (selectedCategory ? posts[postId].category === selectedCategory : true))
      .sort(sortBy(posts, sortType)),
    loading: !posts || Object.keys(posts).length === 0,
    categories,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(PostList));
