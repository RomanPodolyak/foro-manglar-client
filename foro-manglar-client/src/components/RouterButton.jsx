import { Button } from "@mui/core";
import { useNavigate } from "react-router-dom";

/**
 * in props, "to" is to where should the button route
 *
 */
export default function RouterButton(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(
      typeof props.to === "string" ? (props.to !== "" ? props.to : "#") : "#"
    );
  };

  return (
    <Button {...props} onClick={handleClick}>
      {props.children}
    </Button>
  );
}
