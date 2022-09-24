import classes from './SvgButton.module.css';

export const SvgButton = props => {
  const numberContent = (
    <span className={classes[`${props.type}-btn__number`]}>{props.number}</span>
  );

  return (
    <button className={classes[`${props.type}-btn`]}>
      {props.children}
      {props.number && numberContent}
    </button>
  );
};
