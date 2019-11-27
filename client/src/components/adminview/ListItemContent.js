import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {setItemIndex, fetchUsers, fetchReturningUsers} from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import { socket } from '../../socket';
import '../../style.css';



class ListItemContent extends React.Component {

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchReturningUsers();
    socket.on('change_data', this.changeData);
  }

  setIndex(index) {
    this.props.setItemIndex(index);
  }

  changeData = () => {
    this.props.fetchUsers();
    this.props.fetchReturningUsers();
  }

  getNotificationCount() {
    var count = 0;
    for (var i = 0; i < this.props.users.length; i++) {
      if (this.props.users[i].status === 'Pending') {
        count += 1;
      }
    }
    return count;
  }

  getOrderNotificationCount() {
    var count = 0;
    for (var i = 0; i < this.props.users.length; i++) {
      if (this.props.users[i].orderPost.length !== 0) {
        if (this.props.users[i].orderPost[0].orderStatus === 'Pending') {
          count += 1;
        }
       
      }
    }
    return count;
  }

  getReturningUserNotificationCount() {
    var count = 0;
    for (var i = 0; i < this.props.returningUsers.length; i++) {
      
        if (this.props.returningUsers[i].orderPost[0].orderStatus === 'Pending') {
          count += 1;
        }
    }
    return count;
  }

  render() {
    return(
      <div>
        <List>
          <Tooltip title="Dashboard" placement="right">
          <Link style={{textDecoration: 'none', color: 'black'}} to='/dashboard'>
            <ListItem button selected={this.props.selectedIndex === 0} onClick={() => this.setIndex(0)}>
              <ListItemIcon>
                <DashboardIcon className="list-item-icon" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          </Tooltip>
          <Tooltip title="Customers" placement="right">
        <Link style={{textDecoration: 'none', color: 'black'}} to="/dashboard/customers">
          <ListItem button selected={this.props.selectedIndex === 1} onClick={() => this.setIndex(1)}>
           
            <ListItemIcon>
            <Badge badgeContent={this.getNotificationCount()} color="secondary">
              <PeopleIcon className="list-item-icon" />
              </Badge>
            </ListItemIcon>
          
            <ListItemText primary="Customers" />
          </ListItem>
        </Link>
        </Tooltip>
        <Tooltip title="Inventory" placement="right">
        <Link style={{textDecoration: 'none', color: 'black'}} to="/dashboard/inventory">
        <ListItem button selected={this.props.selectedIndex === 2} onClick={() => this.setIndex(2)}>
          <ListItemIcon>
            <FontAwesomeIcon style={{fontSize: '1.5rem', height: '1rem'}} className="list-item-icon" icon={faWeightHanging} />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem>
        </Link>
        </Tooltip>
        <Tooltip title="Report" placement="right">
        <Link style={{textDecoration: 'none', color: 'black'}} to="/dashboard/report">
        <ListItem button selected={this.props.selectedIndex === 3} onClick={() => this.setIndex(3)}>
          <ListItemIcon>
            <LayersIcon className="list-item-icon" />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>
        </Link>
        </Tooltip>
        <Tooltip title="Online Order" placement="right">
        <Link style={{textDecoration: 'none', color: 'black'}} to="/dashboard/order">
        <ListItem button selected={this.props.selectedIndex === 4} onClick={() => this.setIndex(4)}>
          <ListItemIcon>
            <Badge badgeContent={this.getOrderNotificationCount() + this.getReturningUserNotificationCount()} color="secondary">
              <ShoppingCartIcon className="list-item-icon" />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Online Order" />
        </ListItem>
        </Link>
        </Tooltip>
        <Tooltip title="Admin Settings" placement="right">
        <Link style={{textDecoration: 'none', color: 'black'}} to="/dashboard/setting">
        <ListItem button selected={this.props.selectedIndex === 5} onClick={() => this.setIndex(5)}>
          <ListItemIcon>
            <SettingsIcon className="list-item-icon" />
          </ListItemIcon>
          <ListItemText primary="Admin Settings" />
        </ListItem>
        </Link>
        </Tooltip>
        </List>
      </div>
    );
 }
}
const mapStateToProps = state => {
  return {
    selectedIndex: state.itemIndex,
    users: Object.values(state.users),
    returningUsers: Object.values(state.returningUsers)
  }
}

 export default connect(mapStateToProps, {setItemIndex, fetchUsers, fetchReturningUsers}) (ListItemContent);
  
  // export const secondaryListItems = (
  //   <div>
  //     <ListSubheader inset>Saved reports</ListSubheader>
  //     <ListItem button selected={selectedIndex === 4} onClick={event => handleListItemClick(event, 4)}>
  //       <ListItemIcon>
  //         <AssignmentIcon />
  //       </ListItemIcon>
  //       <ListItemText primary="Current month" />
  //     </ListItem>
  //     <ListItem button selected={selectedIndex === 5} onClick={event => handleListItemClick(event, 5)}>
  //       <ListItemIcon>
  //         <AssignmentIcon />
  //       </ListItemIcon>
  //       <ListItemText primary="Last quarter" />
  //     </ListItem>
  //     <ListItem button selected={selectedIndex === 6} onClick={event => handleListItemClick(event, 6)}>
  //       <ListItemIcon>
  //         <AssignmentIcon />
  //       </ListItemIcon>
  //       <ListItemText primary="Year-end sale" />
  //     </ListItem>
  //   </div>
  // );