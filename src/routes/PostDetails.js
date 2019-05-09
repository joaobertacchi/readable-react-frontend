//@flow

import React, { PureComponent } from 'react';
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import PostModal from '../components/PostModal';
import NotFound from '../components/NotFound';
import { Footer } from '../components/layouts';

import { type PostId } from '../types/post';
import {
    type GlobalStateType,
    type CategoriesStateType,
    type PostsStateType,
} from '../types/state';
import { type CategoryType } from '../types/category';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = (): Object => ({
  main: {
    marginTop: 80,
    marginBottom: 60,
    // justifyContent: 'space-around',
    minWidth: '800px',
  },
});

type StyleProps = {
  classes: Object,
}

type MappedProps = {
  categories: CategoriesStateType,
  loading: boolean,
  posts: PostsStateType,
};

type RouterProps = {
  match: {
    params: {
      category: string,
      postId: PostId,
    },
  },
  postId: PostId,
};

type Props = RouterProps & StyleProps & MappedProps;

type State = {
  modalOpen: boolean,
};

class PostDetails extends PureComponent<Props, State> {
  state = {
    modalOpen: false,
  };

  state: State;

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };
  
  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render = (): React$Node => {
    const {
      classes,
      match: {
        params: {
          postId,
          category,
        },
      },
      categories,
      posts,
      loading,
    } = this.props;
    const { modalOpen } = this.state;
    if (
      !posts[postId]
      || !categories.map((c: CategoryType): string => c.name).includes(category)
      || posts[postId].category !== category
    ) {
      return (<NotFound {...this.props} />);
    }
      

    return (
      <div className={classes.main}>
        {loading
          ? null
          : <PostModal
              categories={categories}
              modalTitle="Edit post"
              onClose={this.handleClose}
              open={modalOpen}
              post={posts[postId]}
            />
        }
        <Post onEdit={this.handleOpen} postId={postId} showButtons />
        <CommentList postId={postId} />
        <Footer selectedCategory={false}/>
      </div>
    );
  };
}

function mapStateToProps({ categories, posts }: GlobalStateType): MappedProps {
  return {
    categories,
    posts,
    loading: !posts || Object.keys(posts).length === 0,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(PostDetails));