import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class AccessList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {accesses: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
    
        fetch('accesses')
            .then(response => {
              var data = response.json();
              return data;
            })
            .then(data => this.setState({accesses: data, isLoading: false}));
    }
    
    async remove(id) {
        await fetch(`/access/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            // Update the accesses ... 
            let updatedAccesses = [...this.state.accesses].filter(i => i.id !== id);
            this.setState({accesses: updatedAccesses});
        });
    }

    render() {
        const {accesses, isLoading} = this.state;
    
        if (isLoading) {
          return <p>Loading...</p>;
        }
    
        const accessList = accesses.map(access => {
          return <tr key={access.id}>
            <td style={{whiteSpace: 'nowrap'}}>{access.serverDestination}</td>
            <td style={{whiteSpace: 'nowrap'}}>{access.userDestination}</td>
            <td style={{whiteSpace: 'nowrap'}}>{access.from}</td>
            <td style={{whiteSpace: 'nowrap'}}>{access.notes}</td>
            <td>
              <ButtonGroup>
                <Button size="sm" color="primary" tag={Link} to={"/access/" + access.id}>Edit</Button>
                <Button size="sm" color="danger" onClick={() => this.remove(access.id)}>Delete</Button>
                <CopyToClipboard 
                  text={"ssh " + access.userDestination + "@" + access.serverDestination + "    # from " + access.from} 
                  onCopy={this.onCopy}>
                  <Button variant="outline-success" size="sm">Copy ssh suggestion</Button>
                </CopyToClipboard>
              </ButtonGroup>
            </td>
          </tr>
        });
     
        return (
          <div>
            <AppNavbar/>
            <Container fluid>
              <div className="float-right">
                <Button color="success" tag={Link} to="/access/new">Add Access</Button>
              </div>
              <h3>B2B Accesses</h3>
              <Table className="mt-4">
                <thead>
                <tr>
                  <th>Destination</th>
                  <th>User</th>
                  <th>Access from</th>
                  <th>Notes</th>
                </tr>
                </thead>
                <tbody>
                {accessList}
                </tbody>
              </Table>
            </Container>
          </div>
        );

        
      }
    }
    
    export default AccessList;