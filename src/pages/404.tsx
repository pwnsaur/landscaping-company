const NotFound = () => {
  return (
    <div className='not-found'>
      <h1>404</h1>

      <style jsx>{`
        .not-found {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
