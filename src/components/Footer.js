import React from 'react';

function Footer({loggedIn}) {
  return (
    <footer className="footer">
      {loggedIn ? (<>
            <p className="footer__copyright">© 2020 Mesto Russia</p>
            </>)
            : ('')
        }
  	</footer>
  );
}

export default Footer;