import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import { UserContext } from './user-context';
import axios from 'axios';

const URL = "http://localhost:5000/market";

const titleStyle = {
    padding: 20,
}

const columns = [
    { id: 'type', label: 'Item Type' },
    { id: 'description', label: 'Description', align: 'left' },
    { id: 'price', label: 'Price', minWidth: 170, align: 'right'},
    { id: 'buy', label:' ', minWidth: 170, align: 'right'},
  ];

function RenderTitleRows(props){
    return props.cells.map((cell) => {
        return (<TableCell>
                    {cell.label}
                </TableCell>);
    });
}

function RenderRow(props){
    const [disabled, setDisabled] = React.useState(false);
    const handleClick = (val1, val2) => (event) => {

        axios.post(URL,
            {
                "request_type": "buy_item",
                "user_id": props.id,
                "shop_item_id": val1,
                "item_type": val2
             },
            {withCredentials: false})
            .then( res => {
                if(res.data.result.success){
                    console.log("bought!");
                }
                })
             .catch(error => {
                console.log("could not buy", error);
                });
        setDisabled(true);
    }

    return props.items.map((cell) => {

        let typeIcon = require("./market/" + cell.item_type + ".png");
        return (
            <TableRow>
                <TableCell>
                    <img src={typeIcon} style={{height:100,}}/>
                </TableCell>
                <TableCell>
                    {cell.item_description}
                </TableCell>
                <TableCell>
                    {cell.item_id}
                </TableCell>
                <TableCell>
                    <Button disabled={disabled} onClick={handleClick(cell.item_id, cell.item_type)} >
                        BUY
                    </Button>
                </TableCell>
            </TableRow>
        ); 
    });
}

function TableColumns(props){
    return(
        <TableHead>
            <TableRow>
                <RenderTitleRows cells={props.cells}/>
            </TableRow>
        </TableHead>
    );
}

function TableRows(props){
    return props.items.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map( (item) => {
        return (
            <RenderRow items={item} id = {props.id}/>
        );
    });
}
function ItemsTable(props){
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    return(
        <Paper>
            <TableContainer>
            <Table>
                <TableColumns cells={props.columns}/>
                <TableBody>
                    <TableRows rowsPerPage={rowsPerPage} page={page} items={props.items} id = {props.id}/>
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage='Items per page'
                rowsPerPageOptions={[1, 2, 3]}
                component="div"
                count={props.items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>);
}

function Title(){
    return <Typography style={titleStyle} component="h4" variant="h4">
                Store
           </Typography>
}

class Market extends Component {
  constructor(props) {
    super(props)
    this.state = { items: []};

    console.log("id bu: ", this.props.id);
      axios.post(URL,
        {
            "request_type": "get_items",
            "user_id": this.props.id
         },
        {withCredentials: false})
        .then( res => {
            this.setState( {items: res.data.result.items});
            console.log(this.state.items);
            })
         .catch(error => {
            console.log("list items", error);
            });
    }

  render() {

    return(
        <UserContext.Consumer>
        { ( {username, balance, updateBalance, loggedIn, alphaCoins} ) => (
            <div>
                <NavBar updateLogIn={this.props.updateLogIn} updateType={this.props.updateType} type={this.props.type} userBalance={balance} id = {this.props.id} isLogged={loggedIn} alphaCoins={alphaCoins}/>
                <Title/>
                <ItemsTable id = {this.props.id} columns={columns} items={this.state.items}/>
            </div>
             )}
        </UserContext.Consumer>);
  }
}

export default Market