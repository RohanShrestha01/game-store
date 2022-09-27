import classes from './Error.module.css';

export const Error = ({ error }) => {
  return (
    <div className={classes['error-content']}>
      <h2>Sorry, an unexpected error has occurred.</h2>
      <p>{error.message}</p>
    </div>
  );
};
