export const Error = ({ error }) => (
  <div style={{ textAlign: 'center', lineHeight: '3.5rem' }}>
    <h2>Sorry, an unexpected error has occurred.</h2>
    <p>{error.message}</p>
  </div>
);
