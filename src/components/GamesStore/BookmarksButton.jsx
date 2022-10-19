import { useDispatch, useSelector } from 'react-redux';
import {
  AddCircleOutlineRounded,
  CheckCircleOutlineRounded,
} from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

import { StyledTooltip } from '../../styles/StyledTooltip';
import { bookmarksSliceActions } from '../../store/bookmarksSlice';
import { toastSliceActions } from '../../store/toastSlice';

export const BookmarksButton = ({ game, prices, variant, styles = {} }) => {
  const bookmarkedItems = useSelector(state => state.bookmarks.bookmarkedItems);
  const presentInBookmarks = bookmarkedItems.find(item => item.id === game.id);

  const dispatch = useDispatch();

  const bookmarkStyle = {
    alignSelf: 'flex-start',
    color: 'white',
    fontSize: '1.2rem',
    pl: '1rem',
    '&:hover': {
      backgroundColor: 'grey.main',
    },
    ...styles,
  };

  const clickHandler = e => {
    e.stopPropagation();

    if (presentInBookmarks) {
      dispatch(bookmarksSliceActions.remove(game.id));
      dispatch(toastSliceActions.addInfoToast('Item Removed from Bookmarks!'));
    } else {
      dispatch(bookmarksSliceActions.add({ game: game, pricesList: prices }));
      dispatch(toastSliceActions.addSuccessToast('Item Added to Bookmarks.'));
    }
  };

  const title = presentInBookmarks
    ? 'Remove from Bookmarks'
    : 'Add to Bookmarks';

  const Icon = presentInBookmarks
    ? CheckCircleOutlineRounded
    : AddCircleOutlineRounded;

  return variant === 'icon' ? (
    <StyledTooltip title={title} placement="top">
      <IconButton sx={{ position: 'absolute' }} onClick={clickHandler}>
        <Icon
          fontSize="large"
          sx={{
            backgroundColor: presentInBookmarks
              ? 'success.dark'
              : 'common.black.light',
            borderRadius: '50%',
          }}
        />
      </IconButton>
    </StyledTooltip>
  ) : (
    <Button
      variant="text"
      startIcon={<Icon />}
      sx={bookmarkStyle}
      onClick={clickHandler}
    >
      {presentInBookmarks ? 'In Bookmarks' : 'Add to Bookmarks'}
    </Button>
  );
};
