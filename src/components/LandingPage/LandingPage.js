import React from 'react';
import logoX from '../../image/pagex-logoX.png';
class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page-items">
        <img width="30%" src={logoX} alt="pagx-logo" />
        <h2>
        Find people's experience of art and entertainement.
           </h2>
        <h2>
         Promote your favorite artist's work.
           </h2>
      </div>
    );
  }
}

export default LandingPage;
