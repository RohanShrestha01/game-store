import CircularProgress from '@mui/material/CircularProgress';

export const CircularScoreProgress = props => (
  <div
    style={{
      position: 'relative',
      height: '4rem',
      width: '4rem',
    }}
  >
    <CircularProgress
      variant="determinate"
      value={100}
      sx={{ position: 'absolute', color: 'grey.text' }}
    />
    <CircularProgress
      variant="determinate"
      sx={{ position: 'absolute', color: '#64dd17' }}
      {...props}
    />
    <span
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        color: '#64dd17',
        fontSize: '1.8rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {props.value}
    </span>
  </div>
);
