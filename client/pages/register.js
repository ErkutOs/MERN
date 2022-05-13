import React, {useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import Link  from 'next/link'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          setLoading(true)
        const { data } = await axios.post(`/api/register`, {
            name,
            email,
            password
        })
        //console.log("REGISTER RESPONSE", data)
        toast.success('Successfully registered')
        setLoading(false)
      } catch (error) {
          toast.error(error.response.data)
          setLoading(false)
      }
      
  } 

  return (
    <>
        <h1 className="jumbotron text-center bg-primary square">Register</h1>
        <div className="container col-md-4 offset-md-4 pb-5">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className='form-control mb-4 p-4' 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter Name"
                    required
                />
                <input 
                    type="email" 
                    className='form-control mb-4 p-4' 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    required
                />
                <input 
                    type="password" 
                    className='form-control mb-4 p-4' 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                />
                <button 
                    type="submit" 
                    className="btn col-12 btn-primary"
                    disabled={!name || !email || !password || loading}
                >
                    {loading ? <SyncOutlined spin/> : "Submit"}
                </button>
            </form>
            <p className="text-center p-3">
                Already Registered?{" "}
                <Link href='/login'>
                    <a>Login</a>
                </Link>
            </p>
        </div>
    </>
  )
}

export default Register