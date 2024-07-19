// Button component to render a clickable button
const Button = ({ title, onClickHandler }) => {
  return (
     // Render a button element with a class name and onClick event handler
    <button className="archive-button"
      onClick={onClickHandler}>
      {title}
    </button>
  );
};

export default Button;

