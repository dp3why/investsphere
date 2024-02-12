import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    marginBottom: "1rem",
    left: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
  },
  heading: {
    marginLeft: "8px",
    color: "rgba(0,183,25, 1)",
    textDecoration: "none",
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  image: {
    marginRight: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    marginLeft: "2rem",
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(green[800]),
    backgroundColor: green[500],
  },
}));
