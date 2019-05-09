// @flow

import React from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';

import { type CategoriesStateType } from '../types/state';
import { type CommentType, type CommentId } from '../types/comment';
import { type PostId } from '../types/post';
import { handleAddComment, handleUpdateComment } from '../actions/comments';

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
  id: CommentId,
  parentId: PostId,
};

type OwnProps = {
  categories: CategoriesStateType,
  classes: Object,
  comment: CommentType,
  modalTitle: string,
  onClose: Function,
  open: boolean,
  parentId: PostId,
};

type DispatchedProps = {
  saveComment: Function,
};

type Props = OwnProps & DispatchedProps;

class CommentModal extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { comment } = props;
    const {
      id,
      author,
      body,
      parentId,
    } = comment || {};
    this.state = {
      id: id || '',
      author: author || '',
      body: body || '',
      parentId,
    };
  }

  handleChange = (name: string): (SyntheticInputEvent<> => void) => (event: SyntheticInputEvent<>) => {
    this.setState({ [name]: event.target.value });
  };

  handleClear = () => {
    this.setState({
      id: '',
      author: '',
      body: '',
      parentId: '',
    });
  };

  handleSave = () => {
    const { saveComment, onClose } = this.props;
    const comment = {
      ...this.state,
    };
    saveComment(comment);
    this.handleClear();
    onClose();
  };

  render(): React$Node {
    const { classes, onClose, open, modalTitle } = this.props;
    const { author, body } = this.state;

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
  saveComment: (comment: CommentType) => {
    console.log('saving comment: ', comment);
    if (!comment.id) dispatch(handleAddComment(comment));
    else dispatch(handleUpdateComment(comment));
  },
});

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
)(CommentModal);