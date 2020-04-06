import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, Input } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class AccessList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {accesses: [], isLoading: true, searchValue: ''};
        this.remove = this.remove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.elClick = this.elClick.bind(this);
    }

    handleChange(event) {
      this.setState({searchValue: event.target.value});
      console.log(this.state);
    }

    handleSubmit(event) {
      console.log("Value: ");
      console.log(this.state);

      fetch('searchby/' + this.state.searchValue)
        .then(response => response.json())
        .then(data => this.setState({accesses: data}));

      event.target.reset();
      event.preventDefault();
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

    elClick() {
      fetch('accesses')
            .then(response => {
              var data = response.json();
              return data;
            })
            .then(data => this.setState({accesses: data, isLoading: false}));
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

            <Container className="App">
              <Form onSubmit={this.handleSubmit}>
                <Table>
                  <tbody>
                    <tr>
                      <td>
                      <Input
                        type="text"
                        name="server"
                        id="server"
                        placeholder="pr-galaxie-xl25"
                        onChange={this.handleChange}
                        required
                      />
                      </td>
                      <td><Button variant="outline-success" size="lg" type="submit">Search</Button></td>
                    </tr>
                  </tbody>
                </Table>
              </Form>
            </Container>

            <Container fluid>
              <div className="float-right">
                <Button color="success" tag={Link} to="/access/new">Add Access</Button>
                <Button color="link" tag={Link} to="/accesses" onClick={this.elClick}>Show All</Button>
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