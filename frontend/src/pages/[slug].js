import { useRouter } from 'next/router';
import Image from 'next/image';
import dateFormat from 'dateformat';
import { useState } from 'react';

const Campaign = ({ data }) => {
  // console.log(data);
  const route = useRouter();

  const [email, setEmail] = useState('');

  const handleOnSubmit = e => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, campaign: data.id }),
    };
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}subscribers`);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}subscribers`, options)
      .then(res => res.json())
      .then(response => console.log('response', response))
      .catch(error => console.log('error', error));
  };

  return (
    <div>
      <h1>{route.query.slug}</h1>
      <div
        style={{
          border: '1px solid #000',
          display: 'flex',
          gap: 20,
          alignItems: 'center',
          padding: 20,
          margin: 10,
        }}>
        <div>
          <Image
            src={`https://res.cloudinary.com/dkd3mgbyi/${data.logo}`}
            alt='hello'
            width={120}
            height={120}
          />
        </div>
        <div>
          <h1>
            {data.id} - {data.title}
          </h1>
          <p>{data.description}</p>
          <small>
            {dateFormat(
              new Date(data.created_at),
              'ddd, mmmm, dS, yyyy, h:MM:ss TT'
            )}
          </small>
        </div>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div>
          <input
            onChange={event => setEmail(event.target.value)}
            type='email'
            name='email'
            placeholder='Enter email'
            required
          />
        </div>
        <div>
          <input type='submit' value='SUBSCRIBE' />
        </div>
      </form>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch(`${process.env.BASE_URL}campaigns`);
  const data = await response.json();
  const allSlugs = data.map(item => item.slug);
  console.log('slugs:', allSlugs);
  const paths = allSlugs.map(slug => ({ params: { slug: slug } }));
  console.log('paths:', paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `${process.env.BASE_URL}campaigns/${params.slug}`
  );
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}

export default Campaign;
