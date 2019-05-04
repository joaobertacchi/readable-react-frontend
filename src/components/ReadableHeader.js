// @flow

import React from 'react';

import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

type OwnProps = {
  author: string,
  category?: string,
  date: string,
  headerPath?: string,
  style?: Object,
  title?: string,
};

type Props = OwnProps;

const ReadableHeader = ({style, headerPath, title, date, author, category}: Props): React$Node => (
  <div className={style}>
    {title && headerPath &&
      <div>
        <Link to={headerPath}>
          <Typography variant="title" gutterBottom>
            {title}
          </Typography>
        </Link>
      </div>
    }
    <div>
      <Typography variant="caption" inline>
        {date}
      </Typography>
      {' '}
      <Typography variant="caption" inline color="textSecondary">
        by {author}
      </Typography>
      {' '}
      {category &&
        <Typography variant="button" inline color="primary">
          {category}
        </Typography>
      }
    </div>
  </div>
);

export default ReadableHeader;