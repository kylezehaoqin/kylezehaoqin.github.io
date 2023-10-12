import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <>
      <ul role="list">
        <li><Link to="/">About me</Link></li>
        <li><Link to="/reads">I've been reading...</Link></li>
      </ul>
    </>
  )
}



