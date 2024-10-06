import React from 'react';
import { useLocalStorage} from '../hooks/useLocalStorage';


function Leaderboard() {
    const [leaderboard] = useLocalStorage('leaderboard', []);


    return(
        <div>
            <h1>Leaderboard</h1>
            <ul>
                {leaderboard.sort((a, b) => b.score - a.score) .map((user, index) => (
                    <li key={index}>
                        {user.name} :{user.score} points
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Leaderboard;