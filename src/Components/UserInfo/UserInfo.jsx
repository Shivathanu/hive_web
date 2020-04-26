import React, { useContext } from 'react';
import './UserInfo.css';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { UserInfoContext } from './UserInfoContext';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function UserInfo(props) {
  const [data, setData] = useContext(UserInfoContext);
  const classes = useStyles();

  useEffect(() => {
    if (Object.keys(data.professional).length === 0 && data.professional.constructor === Object) {
      const newValues = {...data};

      //Set professional
      newValues.professional = props.currrentState.professionalContext
      localStorage.setItem("professionalId", props.currrentState.professionalContext.id)
      
      //Set date to display
      var today = new Date();
      newValues.dateToDisplay = newValues.weekDays[today.getDay()] + ', ' + today.getDate() + ' de ' + newValues.months[today.getMonth()] + ' ' + today.getFullYear();
      
      //set new state
      setData(newValues);
    }

  }, [props.currrentState, data, setData]);



  return (
    <div className="contextRoot">
      <div>
        <span>
          <Avatar src="/broken-image.jpg" className={classes.large} />
        </span>
        <span>
          <p>Dr(a). {data.professional.clinicalName}</p>
        </span>
      </div>
      <p>{data.dateToDisplay}</p>
    </div>
  );
}