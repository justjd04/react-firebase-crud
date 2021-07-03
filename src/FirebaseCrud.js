import React, { useState, useEffect } from "react";
import { 
Container, 
Grid, 
Segment, 
Form, 
Input, 
Button,
Table,
Header,
Icon
} from 'semantic-ui-react';
import firebase from './firebase';

const FirebaseCrud = () => {

      const [aFirstName, setAFirstName] = useState('');
      const [aLastName, setALastName] = useState('');
      const [userData, setUserData] = useState([]);
      const [uFirstName, setUFirstName] = useState('');
      const [uLastName, setULastName] = useState('');
      const [userId, setUserId] = useState('');

      useEffect(() => {
          const firestore = firebase.database().ref('/UserInfo');
          firestore.on('value',(response)=>{
              const data = response.val();
              let userInfo = [];
              for (let id in data) {
                  userInfo.push({
                      id:id,
                      FirstName: data[id].FirstName,
                      LastName: data[id].LastName,
                  });
              }
              setUserData(userInfo);
          });     
      }, []);

      const handleAddUser = () => {
          const firestore = firebase.database().ref('/UserInfo');
          let data = {
              FirstName:aFirstName,
              LastName:aLastName
          }
          firestore.push(data);
          setAFirstName('');
          setALastName('');
      };

      const handleUpdateUser = () => {
          const firestore = firebase.database().ref('/UserInfo').child(userId);
          firestore.update({
              FirstName:uFirstName,
              LastName:uLastName
          })
          setUFirstName('');
          setULastName('');
      };

      const handleUpdateClick = (data) => {
          setUFirstName(data.FirstName);
          setULastName(data.LastName);
          setUserId(data.id);
      }

      const handleDelete = (id) => {
          const firestore = firebase.database().ref('UserInfo').child(id);
          firestore.remove();
    };

    return <div class='ui hidden divider'>
    <Container>
        <Grid>
            <Grid.Row columns='2'>
                <Grid.Column>
                    <Segment padded='very'>
                        <Form>
                            <Form.Field>
                                <label>FirstName</label>
                                <Input placeholder='FirstName' focus 
                                value={aFirstName} 
                                onChange={(e)=>{setAFirstName(e.target.value);
                                }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>LastName</label>
                                <Input placeholder='LastName' focus 
                                value={aLastName}
                                onChange={(e)=>{setALastName(e.target.value);
                                }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Button onClick={()=>{handleAddUser()}} positive>
                                    <Icon name='add circle'></Icon>Add User</Button>
                            </Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                <Segment padded='very'>
                        <Form>
                            <Form.Field>
                                <label>FirstName</label>
                                <Input placeholder='FirstName' focus 
                                value={uFirstName} 
                                onChange={(e)=>{setUFirstName(e.target.value);
                                }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>LastName</label>
                                <Input placeholder='LastName' focus 
                                value={uLastName}
                                onChange={(e)=>{setULastName(e.target.value);
                                }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Button onClick={()=>{handleUpdateUser()}} primary>
                                    <Icon name='edit'></Icon>Update User</Button>
                            </Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns='1'>
                <Grid.Column>
                    {
                        userData.length == 0 ? (
                        <Segment padded='very'>
                            <Header textAlign='center'>
                                There is no data available. Enter some data.
                            </Header>
                        </Segment>
                        ) : (
                        <Segment padded='very'>
                            <Table celled fixed singleLine>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>FirstName</Table.HeaderCell>
                                        <Table.HeaderCell>LastName</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                {
                                    userData.map((data,index)=>{
                                        return <Table.Body>
                                            <Table.Cell>{data.FirstName}</Table.Cell>
                                            <Table.Cell>{data.LastName}</Table.Cell>
                                            <Table.Cell>
                                                <Button primary onClick={()=>{handleUpdateClick(data)}}>
                                                    <Icon name='edit'></Icon>
                                                    Update
                                                </Button>
                                                <Button color='red' onClick={()=>{handleDelete(data.id)}}>
                                                    <Icon name='delete'></Icon>
                                                    Delete
                                                </Button>
                                            </Table.Cell>
                                        </Table.Body>
                                    })
                                }
                            </Table>
                        </Segment>)
                    }
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </Container>
        </div>
}

export default FirebaseCrud;