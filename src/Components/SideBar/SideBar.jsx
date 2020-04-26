import React from 'react';
import './SideBar.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';


export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sideBarKeys: ['patients', 'notifications', 'chat', 'my-profile'],
            selectedIndex: 0
        }
    }

    componentDidMount() {
        var url = window.location.pathname.split('/');
        var tabToSelect = url[url.length - 1];

        switch (tabToSelect) {
            case this.state.sideBarKeys[0]:
                this.setSelectedIndex(0);
                break;

            case this.state.sideBarKeys[1]:
                this.setSelectedIndex(1);
                break;

            case this.state.sideBarKeys[2]:
                this.setSelectedIndex(2);
                break;

            case this.state.sideBarKeys[3]:
                this.setSelectedIndex(3);
                break;

            default:
                var sideBarSelected = false;
                for (var i = 0; i < this.state.sideBarKeys.length; i++) {
                    if (url.join("").includes(this.state.sideBarKeys[i])) {
                        this.setSelectedIndex(i);
                        sideBarSelected = true;
                        break;
                    }
                }
                if (!sideBarSelected) {
                    this.setSelectedIndex(0);
                    if (tabToSelect !== '') {
                        window.location.replace('/');
                    }
                }

                break;
        }
    }

    handleListItemClick = (event, index) => {
        this.setSelectedIndex(index);
    }

    setSelectedIndex = (index) => {
        this.setState({
            selectedIndex: index
        })
    }

    render() {
        return (
            <div className="sideBar" >
                <Link to="/patients" className="item">
                    <ListItem
                        button
                        selected={this.state.selectedIndex === 0}
                        onClick={(event) => this.handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Doentes" />
                    </ListItem>
                </Link>
                <Link to="/notifications" className="item">
                    <ListItem
                        button
                        selected={this.state.selectedIndex === 1}
                        onClick={(event) => this.handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Notificações" />
                    </ListItem>
                </Link>
                <Link to="/chat" className="item">
                    <ListItem
                        button
                        selected={this.state.selectedIndex === 2}
                        onClick={(event) => this.handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <ChatIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chat" />
                    </ListItem>
                </Link>
                <Link to="/my-profile" className="item">
                    <ListItem
                        button
                        selected={this.state.selectedIndex === 3}
                        onClick={(event) => this.handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Perfil" />
                    </ListItem>
                </Link>
            </div>
        );
    }

}