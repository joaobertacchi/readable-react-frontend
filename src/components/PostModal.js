// @flow

import React from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField, Typography, MenuItem } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';

import { type CategoriesStateType } from '../types/state';
import { type CategoryType } from '../types/category';
import { type PostType } from '../types/post';
import { handleAddPost, handleUpdatePost } from '../actions/posts';

import { connect } from 'react-redux';
import { compose } from 'redux';

const styles = (theme: Object): Object => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  modal: {
    top: `50%`,
    left: `50%`,
  },
  button: {
    margin: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

type State = {
  author: string,
  body: string,
  category: string,
  title: string,
};

type OwnProps = {
  categories: CategoriesStateType,
  classes: Object,
  modalTitle: string,
  onClose: Function,
  open: boolean,
  post: PostType,
};

type DispatchedProps = {
  savePost: Function,
};

type Props = OwnProps & DispatchedProps;

class PostModal extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { post } = props;
    const {
      id,
      author,
      title,
      body,
      category,
    } = post || {};
    this.state = {
      id,
      author: author || '',
      title: title || '',
      body: body || '',
      category: category || '',
    };
  }

  handleChange = (name: string): (SyntheticInputEvent<> => void) => (event: SyntheticInputEvent<>) => {
    this.setState({ [name]: event.target.value });
  };

  handleClear = () => {
    this.setState({
      author: '',
      title: '',
      body: '',
      category: '',
    });
  };

  handleSave = () => {
    const { savePost, onClose } = this.props;
    const post = {
      ...this.state,
    };
    savePost(post);
    this.handleClear();
    onClose();
  };

  render(): React$Node {
    const { classes, categories, onClose, open, modalTitle } = this.props;
    const { author, title, body, category } = this.state;

    return (
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={onClose}
      >
        <div
          style={{
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
          }}
          className={classes.paper}
        >
          <Typography variant="h6" id="modal-title">
            {modalTitle}
          </Typography>
          <form className={classes.container} noValidate autoComplete="off">
              <TextField
                required
                id="category"
                select
                label="Category"
                style={{ margin: 8 }}
                className={classes.textField}
                value={category}
                onChange={this.handleChange('category')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your post category"
                margin="normal"
                variant="outlined"
              >
                {categories.map((category: CategoryType): React$Node => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="author"
                label="Author"
                style={{ margin: 8 }}
                helperText="Type your name"
                value={author}
                onChange={this.handleChange('author')}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            <TextField
              required
              id="title"
              label="Title"
              style={{ margin: 8 }}
              helperText="Type your post title"
              fullWidth
              value={title}
              onChange={this.handleChange('title')}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              id="body"
              label="Body"
              style={{ margin: 8 }}
              helperText="Type your post body"
              fullWidth
              multiline
              rows="4"
              value={body}
              onChange={this.handleChange('body')}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={onClose}
            >
              <ClearIcon className={classNames(classes.leftIcon)} />
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleSave}
            >
              <SaveIcon className={classNames(classes.leftIcon)} />
              Save
            </Button>
          </form>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch: Function): DispatchedProps => ({
  savePost: (post: PostType) => {
    console.log('saving post: ', post);
    if (!post.id) dispatch(handleAddPost(post));
    else dispatch(handleUpdatePost(post));
  },
});

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
)(PostModal);