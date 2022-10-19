import { styled, Tooltip, tooltipClasses } from '@mui/material';

export const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black.light,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: '1.2rem',
    backgroundColor: theme.palette.common.black.light,
    textTransform: 'capitalize',
    boxShadow: theme.shadows[2],
  },
}));
