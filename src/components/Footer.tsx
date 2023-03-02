type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className='footer'>
      <p>Copyright 2023 Hackerman</p>

      <style jsx>{`
        .footer {
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
