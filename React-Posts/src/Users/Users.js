import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useHistory, generatePath } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';


const Users = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState('');
  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
  const history = useHistory();

  const onEdit = (id) => {
    history.push(generatePath("/users/edit/:id", { id }));
  }
 
  const columns = [
    
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Email',
        selector: row => row.email,
    },
    {
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      cell: (record) => {
        return (
          <Fragment>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                onEdit(record.id);
              }}
            >
              Edit
            </button>

          </Fragment>
        );
       },

    },
];

const data = users;

  async function fetchData() {
    let data = null
    try {
      const response = await axios.get('http://localhost:3500/users');
      if (response.data.status === 401){
        setErrorMessage("Error: Unautorized");
      }else{
        data = response.data
      }
    } catch (err) {
      setErrorMessage(`Error: ${err.message}`);
    }
    setUsers(data);
  }

  useEffect(  () => {
    fetchData();
  }, [])

  return (
    <main className='NewPost'>
      {/* {users && users.map(user => (
          <p key={user.id}>{user.name}</p>
      ))}     */}
      <DataTable
          columns={columns}
          data={data}
          selectableRows
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          pagination
      />
    </main> 
  )
}

export default Users;
