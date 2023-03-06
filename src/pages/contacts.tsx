import { useState } from 'react';
import { NextSeo } from 'next-seo';

const Contact = () => {
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const doc = {
      title,
      message,
    };
    try {
      console.log(doc);
      setTitle('');
      setMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NextSeo
        title='Kontakti'
        titleTemplate='Brasika | %s'
        description='Kontakti'
      />

      <div className='container'>
        <h2 className='title'>Jūsu ziņojums:</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type='text'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder='Tēma'
              required
            />
          </label>

          <label>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder='Ziņojums'
              required
            />
          </label>

          <button className='btn'>Apstiprināt</button>
        </form>

        <style jsx>{`
          .container {
            display: flex;
            text-align: center;
            flex-direction: column;
            align-items: center;
            padding: 15vh 0 5vh;
          }
          .create {
            color: #555;
            max-width: 480px;
            margin: 60px auto;
          }
          label {
            display: flex;
            margin: 50px 0;
          }
        `}</style>
      </div>
    </>
  );
};

export default Contact;
