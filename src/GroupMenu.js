import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class GroupMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {groups: [], isLoading: true};
        // this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
    
        fetch('menus')
            .then(response => {
              var data = response.json();
              return data;
            })
            .then(data => this.setState({groups: data, isLoading: false}));
    }

    render() {
        const {groups, isLoading} = this.state;
    
        if (isLoading) {
          return <h2>Loading...</h2>;
        }
    
        const groupList = groups.map(group => {
          const val = `/menus/${group}`;
          return <tr key={group}>
            <td>
            <Button color="link"><Link to={val}>{group}</Link></Button>
            </td>
            {/* <td>
              <ButtonGroup>
                <Button color="danger" onClick={() => console.log(group)}>Delete</Button>
              </ButtonGroup>
            </td> */}
          </tr>
        });
    
        return (
          <div>
            <AppNavbar/>
            <Container fluid>
              <h3>Menús</h3>
              <Table>
                <thead>
                <tr>
                  <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {groupList}
                </tbody>
              </Table>
            </Container>
          </div>
        );
      }
    }
    
    export default GroupMenu;