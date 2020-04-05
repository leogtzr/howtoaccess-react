import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class MenuView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {menu: {}, isLoading: true};
        // this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        const { title } = this.props.match.params;
    
        var url = title;
        // console.log("The url is: " + url);
        fetch(url)
            .then(response => {
              var data = response.json();
              console.log(data);
              return data;
            })
            .then(data => this.setState({menu: data, isLoading: false}));
    }
    
    // async remove(id) {
    //     await fetch(`/api/group/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(() => {
    //         // Update the groups ... 
    //         let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
    //         this.setState({groups: updatedGroups});
    //     });
    // }

    render() {
        const {menu, isLoading} = this.state;
    
        if (isLoading) {
          return <h2>Loading...</h2>
        }
    
        // const groupList = groups.map(group => {
        //   const val = `/menus/${group}`;
        //   return <tr key={group}>
        //     <Button color="link"><Link to={val}>{group}</Link></Button>
        //     <td>
        //       <ButtonGroup>
        //         <Button color="danger" onClick={() => console.log(group)}>Delete</Button>
        //       </ButtonGroup>
        //     </td>
        //   </tr>
        // });

        // console.log(groups);
    
        return (
          <div>
            <AppNavbar/>
            <Container fluid>
              <h2>{menu.title}</h2>
              <h3>{menu.menu["MONDAY"].breakfast.name}</h3>
              {/* <Table>
                <thead>
                <tr>
                  <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {groupList}
                </tbody>
              </Table> */}
            </Container>
          </div>
        );
      }
    }
    
    export default MenuView;