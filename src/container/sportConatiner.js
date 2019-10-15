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
import {addEvent} from "../actions";

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
	event: state.event
});

const mapDispatchToProps = dispatch =>({
	addEvent:(event)=>{
		dispatch(addEvent(event));
	}
});


const SportConatiner = ({addEvent}) => {
	let localizer = momentLocalizer(moment); // or globalizeLocalizer
	const classes = useStyles();
	const myEventsList = [];
	const [state, setState] = React.useState({open: false, tag: 'tennis', comment:'',start:null, end: null });
	let handleSelect = ({start, end}) => {
		setState({...state, open: true, start: start, end: end});
	};

	const handleClose = () => {
		setState({...state, open: false});
	};

	const handleSave = ()=>{
		addEvent({tag: state.tag, comment: state.comment, start: state.start, end: state.end});
		setState({...state, open: false});
	};
	const handleChange = name => event => {
		setState({...state, [name]: event.target.value || ''});
	};
	return (
		<div>
			<div className='container'>
				<Calendar
					localizer={localizer}
					events={myEventsList}
					startAccessor="start"
					selectable
					defaultView={Views.WEEK}
					endAccessor="end"
					onSelectEvent={event => alert(event.title)}
					defaultDate={new Date()}
					onSelectSlot={handleSelect}
					views={['week', 'month']}/>
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
								value={state.tag}
								onChange={handleChange('tag')}
								input={<Input id="age-native-simple"/>}
							>
								<option value='tennis'>Tennis</option>
								<option value='running'>Running</option>
							</Select>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Comment"
								type="text"
								value={state.comment}
								fullWidth
							/>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSave} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
};


export default connect(mapStateToProps,mapDispatchToProps)(SportConatiner);
