import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

/**
 * in props, "to" is to where should the button route
 *
 */
export default function RouterButton(props) {
  const history = useHistory();
  const handleClick = () => {
    history.push(
      typeof props.to === "string" ? (props.to !== "" ? props.to : "#") : "#"
    );
  };

  return (
    <Button {...props} onClick={handleClick}>
      {props.children}
    </Button>
  );
}
