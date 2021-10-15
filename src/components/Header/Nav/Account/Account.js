import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import './Account.css';

const Account = () => {
  const { user, logout } = useAuth();
  return (
    <div className="account">
      {user?.email ? <>
        <span className="material-icons-outlined" title="Account">
          account_circle
        </span>
        {user.displayName}
        <span className="material-icons-outlined" title="Logout" onClick={logout}> logout </span>
      </>
        : <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      }

    </div>
  );
};

export default Account;