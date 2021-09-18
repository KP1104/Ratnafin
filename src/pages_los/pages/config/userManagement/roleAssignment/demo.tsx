import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import { TextField } from "components/styledComponent/textfield";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
  },
  title: {
    flex: "1 1 100%",
    color: theme.palette.primary.main,
    letterSpacing: "1px",
  },
}));

export const UserManagement = ({ closeDialog }) => {
  const classes = useStyles();
  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4" className={classes.title}>
          User Management
        </Typography>
        <Button onClick={closeDialog}>Close</Button>
      </Toolbar>
      <Container>
        <Grid />
      </Container>
    </Paper>
  );
};
