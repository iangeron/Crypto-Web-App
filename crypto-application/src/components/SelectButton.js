import { makeStyles } from "@material-ui/core";
import { findByLabelText } from "@testing-library/react";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      display: 'flex',
      fontSize: 13,
      justifyContent: 'center',
      // borderRadius: 5,
      padding: 10,
      // boxShadow: 'rgb(0 0 0 / 30%) 0px 8px 34px',
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Poppins",
      cursor: "pointer",
      backgroundColor: selected ? "whitesmoke" : "",
      color: selected ? "black" : "",
      border: selected ? "2px solid black" : "1px solid black",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "whitesmoke",
        color: "black",
      },
      width: "30%",
      //   margin: 5,
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;