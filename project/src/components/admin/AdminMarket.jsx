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
import kidneyIcon from '../market/type1.png';
import gunIcon from '../market/gun.png';
import carIcon from '../market/type2.png';
import toyIcon from '../market/toy.png';

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

  const rows = [
    [
      {typeLabel: 'toy', 
       descLabel: 'bu bir itemdir ve ilk sıradadır',      
       priceLabel: '$1000',
       removeLabel: 'remove'}
    ],
    [
       {typeLabel: 'gun', 
       descLabel: 'bu bir itemdir ve ikinci sıradadır',   
       priceLabel: '$40',  
       removeLabel: 'remove'},
    ],
    [
        {typeLabel: 'car', 
        descLabel: 'bu bir itemdir ve üçüncü sıradadır',   
        priceLabel: '$140000',  
        removeLabel: 'remove'},
    ],
    [
        {typeLabel: 'kidney', 
        descLabel: 'bu bir itemdir ve dördüncü sıradadır',   
        priceLabel: '$995500',  
        removeLabel: 'remove'},
    ],
  ];

function RenderTitleRows(props){
    return props.cells.map((cell) => {
        return (<TableCell>
                    {cell.label}
                </TableCell>);
    });
}

function RenderRow(props){
    return props.cells.map((cell) => {
        let typeIcon = ''
        switch(cell.typeLabel){
            case 'gun':
                typeIcon = gunIcon;
                break;
            case 'toy':
                typeIcon = toyIcon;
                break;
            case 'car':
                typeIcon = carIcon;
                break;
            case 'kidney':
                typeIcon = kidneyIcon;
                break;
        }
        return (
                <TableRow>
                    <TableCell>
                        <img src={typeIcon} style={{height:100,}}/>
                    </TableCell>
                    <TableCell>
                        {cell.descLabel}
                        <Button size="small" color="secondary" variant="contained">Edit</Button>
                    </TableCell>
                    <TableCell>
                        {cell.priceLabel}
                        <Button size="small" color="secondary" variant="contained">Edit</Button>
                    </TableCell>
                    <TableCell>
                        <Button>
                            {cell.removeLabel}
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
    return props.rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map( (row) => {
        return (
            <RenderRow cells={row}/>
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
                    <TableRows rowsPerPage={rowsPerPage} page={page} rows={props.rows}/>
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage='Items per page'
                rowsPerPageOptions={[1, 2, 3]}
                component="div"
                count={rows.length}
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
        itemName: " ",
        itemDesc: " "
    }
    this.handleChange = this.handleChange.bind(this);

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
                        type="itemName"
                        name = "itemName"
                        placeholder="ItemName"
                        value={this.state.itemName}
                        onChange={this.handleChange}
                        required />
                        <input                     
                        type="itemDesc"
                        name = "itemDesc"
                        placeholder="ItemDesc"
                        value={this.state.itemDesc}
                        onChange={this.handleChange}
                        required />
                        <Button type="submit" style={submitStyle} size="small">Add Item</Button>
                    </form>
                </div>
                <Title/>
                <ItemsTable columns={columns} rows={rows}/>
            </div>
             )}
        </UserContext.Consumer>);
  }
}

export default AdminMarket