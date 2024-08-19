import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

const handlePostUser = () => {
    navigate('/user')
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users")
      const result = await response.json();
      setUsers(result)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
        method: "DELETE"
      })
      if(response.ok) {
        fetchUsers()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handlUpdate =  (userId) => {
    navigate(`/user/${userId}`)
  }
  
  return (
  <>
    <Container className='mt-4'>
      <Button 
        variant='contained' 
        color='primary'
        onClick={handlePostUser}
        sx={{ marginBottom: 5 }}
      >
        Create user
      </Button>  
      <Typography variant='h4' align='center' gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                <IconButton 
                    color='primary'
                    onClick={() => handlUpdate(user.id)}>
                    <EditIcon/>
                  </IconButton>
                  <IconButton 
                    color='secondary'
                    onClick={() => handleDelete(user.id)}>
                    <DeleteIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  </>
  );
}

export default Dashboard;