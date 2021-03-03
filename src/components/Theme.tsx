import { Switch, FormControlLabel } from "@material-ui/core";
import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";

export default function Theme() {
  const { chooseTheme, darkTheme } = useContext(CountdownContext);

  return (
    <div>
      <FormControlLabel
        label="Blue"
        labelPlacement="end"
        control={<Switch color="primary" onClick={chooseTheme} />}
      />
    </div>
  );
}
