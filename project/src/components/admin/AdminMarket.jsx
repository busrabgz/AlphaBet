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
import { UserContext } from '../user-context';
import kidneyIcon from '../market/type2.png';
import gunIcon from '../market/gun.png';
import carIcon from '../market/type1.png';
import toyIcon from '../market/toy.png';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';

const URL = "http://localhost:5000/admin-dashboard/modify-market";

const submitStyle = {

}

const titleStyle = {
    padding: 20,
    float: "left"
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

class RenderRow extends Component{

    constructor(props){
        super(props)
        this.state={
            descriptionEdit: "",
            costEdit: "",
            openDesc: false,
            openCost: false,
            update: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCloseDesc = this.handleCloseDesc.bind(this)
        this.submitChangeDesc = this.submitChangeDesc.bind(this)
        this.handleClickOpenDesc = this.handleClickOpenDesc.bind(this)
        this.handleCloseCost = this.handleCloseCost.bind(this)
        this.submitChangeCost = this.submitChangeCost.bind(this)
        this.handleClickOpenCost = this.handleClickOpenCost.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.typeIcon = ''
        switch(this.props.cells.item_type){
            case 'gun':
                this.typeIcon = gunIcon;
                break;
            case 'toy':
                this.typeIcon = toyIcon;
                break;
            case 'car':
                this.typeIcon = carIcon;
                break;
            case 'kidney':
                this.typeIcon = kidneyIcon;
                break;
        }
    }

    addItem(){

    }

    removeItem(){
        axios.post(URL,
            {
                "request_type": "remove_item",
                "selected_item_id": this.props.cells.shop_item_id,
                "item_type": this.props.cells.item_type
            },
            {withCredentials: false})
            .then( res => {
                if(res.data.status.success){
                    console.log("success")
                }
                })
            .catch(error => {
                console.log("info", error);
                });
        this.props.updateItems()
    }

    submitChangeCost(){
        axios.post(URL,
        {
            "request_type": "update_cost",
            "selected_item_id": this.props.cells.shop_item_id,
            "new_cost": this.state.costEdit
        },
        {withCredentials: false})
        .then( res => {
            if(res.data.status.success){
                console.log("success")
            }
            })
        .catch(error => {
            console.log("info", error);
            });
        this.props.updateItems()
        this.handleCloseCost()
    }

    submitChangeDesc(){
        axios.post(URL,
        {
            "request_type": "update_description",
            "selected_item_id": this.props.cells.shop_item_id,
            "new_description": this.state.descriptionEdit
        },
        {withCredentials: false})
        .then( res => {
            if(res.data.status.success){
                console.log("success")
            }
            })
        .catch(error => {
            console.log("info", error);
            });
        this.props.updateItems()
        this.handleCloseDesc()
    }

    handleChange(event){
        this.setState({
            [event.target.id]: event.target.value
           })
    }

    handleClickOpenDesc(){
        this.setState({
            openDesc: true,
            descriptionEdit: ""
          })
    }

    handleClickOpenCost(){
        this.setState({
            openCost: true,
            costEdit: ""
          })
    }

    handleCloseDesc() {
        this.setState({
            openDesc: false
        })
      }

    handleCloseCost() {
        this.setState({
            openCost: false
        })
      }

    render(){
        return (
            <TableRow>
                <TableCell>
                    <img src={this.typeIcon} style={{height:100,}}/>
                </TableCell>
                <TableCell>
                    {this.props.cells.item_description}
                    <Button onClick={this.handleClickOpenDesc} size="small" color="secondary" variant="contained">Edit</Button>
                    <Dialog open={this.state.openDesc} onClose={this.handleCloseDesc} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Enter new description</DialogContentText>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="descriptionEdit"
                            label="Edit Description"
                            type="descriptionEdit"
                            value={this.state.descriptionEdit}
                            onChange={this.handleChange}
                            fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseDesc} color="primary">
                            Cancel
                            </Button>
                            <Button onClick={this.submitChangeDesc} color="primary">
                            Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableCell>
                <TableCell>
                    {this.props.cells.cost}
                    <Button onClick={this.handleClickOpenCost} size="small" color="secondary" variant="contained">Edit</Button>
                    <Dialog open={this.state.openCost} onClose={this.handleCloseCost} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Enter new cost</DialogContentText>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="costEdit"
                            label="Edit Description"
                            type="descriptionEdit"
                            value={this.state.costEdit}
                            onChange={this.handleChange}
                            fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseCost} color="primary">
                            Cancel
                            </Button>
                            <Button onClick={this.submitChangeCost} color="primary">
                            Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableCell>
                <TableCell>
                    <Button onClick={this.removeItem} size="large" color="secondary" variant="contained">
                        Remove
                    </Button>
                </TableCell>
            </TableRow>  
        ); 
    }
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
    return props.rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map( (row) => {
        return (
            <RenderRow updateItems={props.updateItems} cells={row}/>
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
                    <TableRows updateItems={props.updateItems} rowsPerPage={rowsPerPage} page={page} rows={props.rows}/>
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage='Items per page'
                rowsPerPageOptions={[1, 2, 3]}
                component="div"
                count={props.rows.length}
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

class AdminMarket extends Component {
  constructor(props) {
    super(props)
    this.state = {
        items: [],
        admin_id: this.props.id,
        newItemName: "",
        newItemDesc: "",
        newItemCost: "",
        update: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.fetch = this.fetch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(){
        axios.post(URL, 
            {
                "request_type": "add_item",
                "item_type": this.state.newItemName,
                "item_description": this.state.newItemDesc,
                "item_cost": this.state.newItemCost,
                "admin_id": this.state.admin_id
            },
            {withCredentials: false})
                .then( res => {    
                this.setState({
                    newItemName: "",
                    newItemDesc: "",
                    newItemCost: ""
                })
                })
                .catch( (error) => {
                console.log("info", error)
            });
            this.fetch()
    }

    fetch(){
        this.setState({
            update: !this.state.update
        })
    }
    
    componentDidMount(){
        axios.post(URL, 
            {
                "request_type": "display_all_items",
            },
            {withCredentials: false})
                .then( res => {    
                    
                console.log("items at the beginning", res.data)
                let temp = []
                for(let i = 0; i < res.data.items.length; i++)
                    temp[i] = res.data.items[i]
                console.log("temp", temp)
                this.setState({
                    items: temp,
                })
                })
                .catch( (error) => {
                console.log("info", error)
            });
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
         });
     }

  render() {
    return(
        <UserContext.Consumer>
        { ( {username, balance, updateBalance} ) => (
            <div>
                <div style={{float:"right"}}>
                    <form onSubmit={this.handleSubmit}>
                        <input                     
                        type="newItemName"
                        name = "newItemName"
                        placeholder="Item Type"
                        value={this.state.newItemName}
                        onChange={this.handleChange}
                        required />
                        <input                     
                        type="newItemDesc"
                        name = "newItemDesc"
                        placeholder="Item Description"
                        value={this.state.newItemDesc}
                        onChange={this.handleChange}
                        required />
                        <input                     
                        type="newItemCost"
                        name = "newItemCost"
                        placeholder="Item Cost"
                        value={this.state.newItemCost}
                        onChange={this.handleChange}
                        required />
                        <Button type="submit" style={submitStyle} size="small">Add Item</Button>
                    </form>
                </div>
                <Title/>
                <ItemsTable updateItems={this.fetch} columns={columns} rows={this.state.items}/>
            </div>
             )}
        </UserContext.Consumer>);
  }
}

export default AdminMarket