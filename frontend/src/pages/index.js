import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home({ data, error }) {
  console.log(data);
  console.log(error);

  return (
    <>
      <main>
        <h1>Available Campaigns</h1>
        <p>lorem test</p>

        {data.map(el => (
          <div key={el.slug} style={{ border: '1px solid #000' }}>
            <div>
              <Image
                src={`https://res.cloudinary.com/dkd3mgbyi/${el.logo}`}
                alt='hello'
                width={120}
                height={120}
              />
            </div>
            <h1>
              {el.id} - {el.title}
            </h1>
            <p>{el.description}</p>
            <p>{el.created_at}</p>
          </div>
        ))}
      </main>
    </>
  );
}

export async function getStaticProps() {
  let data = [];
  let error = null;

  try {
    const response = await fetch(`${process.env.BASE_URL}api/campaigns/`);
    data = await response.json();
  } catch (err) {
    error = JSON.stringify(err);
    // return { notFound: true };
  }

  return {
    props: {
      data,
      error,
    },
  };
}
