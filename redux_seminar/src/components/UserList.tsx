import React from 'react';
import {useSelector} from 'react-redux';
import {selectUsers} from '../redux/UserSlice';
import {Link} from 'react-router-dom';
import {RootState} from '../redux/store';

const UserList: React.FC = () => {
    const users = useSelector((state: RootState) => selectUsers(state));

    return (
        <div className="container">
            <h1>Список пользователей</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <span>{user.name}</span>
                        <Link to={`/users/${user.id}`}>Посмотреть информацию</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;