import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class AccessEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const access = await (await fetch(`/access/${this.props.match.params.id}`)).json();
      this.setState({item: access});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/access', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/accesses');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Access' : 'Add Access'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="serverDestination">Destination</Label>
            <Input type="text" name="serverDestination" id="serverDestination" value={item.serverDestination || ''}
                   onChange={this.handleChange} autoComplete="serverDestination"/>
          </FormGroup>
          <FormGroup>
            <Label for="userDestination">User Destination</Label>
            <Input type="text" name="userDestination" id="userDestination" value={item.userDestination || ''}
                   onChange={this.handleChange} autoComplete="userDestination"/>
          </FormGroup>
          <FormGroup>
            <Label for="from">From</Label>
            <Input type="text" name="from" id="from" value={item.from || ''}
                   onChange={this.handleChange} autoComplete="from"/>
          </FormGroup>
          <FormGroup>
            <Label for="notes">Notes</Label>
            <Input type="text" name="notes" id="notes" value={item.notes || ''}
                   onChange={this.handleChange} autoComplete="notes"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/accesses">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(AccessEdit);