import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <>
      <div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>👤</span>
          <input className='form-control' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="username" />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>🔒</span>
          <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        </div>
        <Button variant='secondary' onClick={() => createUser()} disabled={!userName || !password}>
          Sign Up
        </Button>
        <Button variant='primary' className='ms-2' onClick={() => loginUser()} disabled={!userName || !password}>
          Login
        </Button>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}

// export function Login({ userName, authState, onAuthChange }) {
//   return (
//     <main className="container-fluid bg-book-paper text-center">
//             <div>
//                 <h5>Welcome to Library Ace! Login to start:</h5>
//                 <form method="get" action="/myace">
//                     <div className="input-group mb-3">
//                     <span className="input-group-text">👤</span>
//                     <input className="form-control" type="text" placeholder="username" />
//                     </div>
//                     <div className="input-group mb-3">
//                     <span className="input-group-text">🔒</span>
//                     <input className="form-control" type="password" placeholder="password" />
//                     </div>
//                     <p></p>
//                     <button type="submit" className="btn btn-secondary me-2">Sign Up</button>
//                     <button type="submit" className="btn btn-primary">Login</button>
//                 </form>
//             </div>
//         </main>
//   );
// }
