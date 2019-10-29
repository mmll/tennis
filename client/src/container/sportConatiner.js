import {connect} from 'react-redux';
import React from 'react'
import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import {addEvent, deleteEvent, updateEvent} from "../actions";


function Event({ event }) {
	return (
		<span>
      <strong>{event.title}</strong>
			<p>{event.comment}</p>
    </span>
	)
}

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const mapStateToProps = (state) =>({
	events: state.events
});

const mapDispatchToProps = dispatch =>({
	addEvent:(event)=>{
		dispatch(addEvent(event));
	},
	deleteEvent:(event)=>{
		dispatch(deleteEvent(event));
	},
	updateEvent:(event)=>{
		dispatch(updateEvent(event));
	}
});


const SportConatiner = ({addEvent,deleteEvent, updateEvent,events}) => {
	let localizer = momentLocalizer(moment); // or globalizeLocalizer
	const classes = useStyles();
	const [state, setState] = React.useState({open: false, mode: 'new', event:{title: 'Tennis', comment:'',start:null, end: null }});

	let handleSelect = ({start, end}) => {
		setState({...state, mode:'new', open: true, event:{...state.event, start: start, end: end}});
	};

	const handleClose = () => {
		setState({...state, open: false});
	};

	const handleSave = ()=>{
		if(state.mode == 'new'){
			addEvent({event: state.event});
		}else{
			updateEvent({event: state.event})
		}
		setState({...state, open: false});
	};

	const handleDelete = ()=>{
		deleteEvent({event: state.event});
		setState({...state, open: false});
	};


	const handleChange = name => event => {
		setState({...state, event:{...state.event, [name]: event.target.value || ''}});
	};

	const onSelectEvent = (event)=>{
		setState({...state, mode:'edit', open: true, event: event});
	};
	return (
		<div>
			<div className='container'>
				<Calendar
					className='calendar'
					localizer={localizer}
					events={events}
					startAccessor="start"
					selectable
					defaultView={Views.MONTH}
					endAccessor="end"
					onSelectEvent={onSelectEvent}
					defaultDate={new Date()}
					onSelectSlot={handleSelect}
					views={['week', 'month']}
					components={{
						event: Event,
					}}/>
			</div>
			<Dialog open={state.open} onClose={handleClose} aria-labelledby='form-dialog-title'>
				<DialogContent>
					<DialogContentText>
						Log Sport Event
					</DialogContentText>
					<form className={classes.container}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="age-native-simple">Tag</InputLabel>
							<Select
								native
								value={state.event.title}
								onChange={handleChange('title')}
								input={<Input id="age-native-simple"/>}
							>
								<option value='Tennis'>Tennis</option>
								<option value='Running'>Running</option>
							</Select>
							<TextField
								id="outlined-name"
								label="Comment"
								className={classes.textField}
								onChange={handleChange('comment')}
								value={state.event.comment}
								margin="normal"
								variant="outlined"
							/>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					{state.mode ==='edit'? <Button  onClick={handleDelete} color="primary">
						Delete
					</Button>: <span></span>
					}
					<Button onClick={handleSave} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
};


export default connect(mapStateToProps,mapDispatchToProps)(SportConatiner);
