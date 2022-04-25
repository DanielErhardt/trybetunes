import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    const { name } = await getUser();
    this.setState({ userName: name, isLoading: false });
  }

  render() {
    const { userName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? (
          <Loading />
        ) : (
          <p data-testid="header-user-name">
            { userName }
          </p>
        )}
      </header>
    );
  }
}

export default Header;
