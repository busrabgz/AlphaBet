import React, {Component} from 'react'
import { Checkbox, FormGroup, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Box, Radio, Grid, Typography, Paper, Button } from '@material-ui/core';

function RenderContests(props){
    return(
        props.contests.map((contest) => {
            return(
                <FormControlLabel
                control={<Checkbox size="small" name={contest.name} />}
                label={contest.name}
                />
        )})
    );
}

function ContestFilter(props) {
    return(
        <Grid item lg={4} md={6} sm={12} xs={12}>
            <Typography variant="h5" color="initial">Select Contest</Typography>
            <FormControl style={props.style} component="fieldset">
                <FormGroup>
                    <RenderContests contests={props.contests}/>
                </FormGroup>
            </FormControl>
        </Grid> 
    );
}


function RenderMBNs(props){
    const mbns = [];
    for(let i = 1; i < props.max; i++)
        mbns.push(i);
    return(
        mbns.map((mbn) => {
            return(
                <FormControlLabel value={mbn.toString()} control={<Radio size="small"/>} label={mbn} />
        )})
    )
}

function MBNFilter(props) {
    return(
        <Grid item lg={4} md={6} sm={12} xs={12}>
            <Typography variant="h5" color="initial">Select MBN</Typography>
            <FormControl style={props.style} component="fieldset">
            <RadioGroup defaultValue="none" aria-label="gender" name="gender1">
                <RenderMBNs max={10}/>
            </RadioGroup>
            </FormControl>
        </Grid> 
    );
}

function SortFilter(props) {
    return(
        <Grid item lg={4} md={6} sm={12} xs={12}>
            <Typography variant="h5" color="initial">Sort By</Typography>
            <FormControl style={props.style} component="fieldset">
            <RadioGroup defaultValue="none" aria-label="gender" name="gender1">
                <FormControlLabel value="oddDesc"   control={<Radio size="small"/>} label="Odd (High to Low)" />
                <FormControlLabel value="oddAsc"    control={<Radio size="small"/>} label="Odd (Low to High)" />
                <FormControlLabel value="pop"       control={<Radio size="small"/>} label="Popularity" />
                <FormControlLabel value="dateAsc"   control={<Radio size="small"/>} label="Date (Recent to Old)" />
                <FormControlLabel value="dateDesc"  control={<Radio size="small"/>} label="Date (Old to Recent)" />
            </RadioGroup>
            </FormControl>
        </Grid> 
    );
}

function KeyWordFilter() {
    return(
        <Grid item lg={7} md={7} sm={12} xs={12}>
                <TextField fullWidth="true" variant="outlined" id="input-with-icon-grid" label="Search with text (etc. Beşiktaş)" />
        </Grid> 
    );
}

function SportFilter(){

    const [value, setValue] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (value === 'FOOTBALL') {
          console.log('selected value is ' + value);
        } else if (value === 'BASKETBALL') {
            console.log('selected value is ' + value);
        } else {
            console.log('selected value is ' + value);
        }
    };

    return(
        <Grid item lg={5} md={5} sm={12} xs={12}>
            <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel
                    value="FOOTBALL"
                    control={<Radio color="primary" />}
                    label="Football"
                    labelPlacement="end"
                    />
                    <FormControlLabel
                    value="BASKETBALL"
                    control={<Radio color="primary" />}
                    label="Basketball"
                    labelPlacement="end"
                    />
                    <FormControlLabel
                    value="TENNIS"
                    control={<Radio color="primary" />}
                    label="Tennis"
                    labelPlacement="end"
                    />
                </RadioGroup>
            </FormControl>
        </Grid> 
    );
}

function BottomPanel(props){
    const rootStyle = {
        marginTop: 10,
        display: "inline-flex",
        width: "100%"
    }
    const childStyle={
        paddingLeft: 10,
        height: 150,
        overflowY: "scroll",
        overflowX: "hidden",
        width: "100%",
    }

    return( 
            <Grid container spacing={3} style={rootStyle}>
                <MBNFilter style={childStyle}/>
                <ContestFilter style={childStyle} contests={props.contests}/>
                <SortFilter style={childStyle}/>
            </Grid>
    );
}

function TopPanel() {
    const rootStyle = {
        display: "inline-flex",
        width: "100%"
    }
    return(
        <Grid container spacing={3} style={rootStyle}>
            <SportFilter/>
            <KeyWordFilter/>
        </Grid>
    );
}

class FilterPanel extends Component{

    render(){

        return(
            <Paper style={{padding: 15,}} elevation={7}>
                <form>
                    <TopPanel/>
                    <BottomPanel contests={this.props.contests}/>
                    <Button style={{marginTop: 20, backgroundColor: "#14FF43"}} variant="outlined" fullWidth="true">LIST</Button>
                </form>
            </Paper>
        );
    }
}

export default FilterPanel