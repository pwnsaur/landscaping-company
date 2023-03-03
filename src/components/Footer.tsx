const Footer = () => {
  return (
    <footer className='footer'>
      <p>Copyright 2023 Hackerman</p>

      <style jsx>{`
        .footer {
          margin-top: auto;
          /* position: fixed;
          bottom: 0 */
          display: flex;
          justify-content: center;
          margin: 20px;
          margin-top: auto;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
