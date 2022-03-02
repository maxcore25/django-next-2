import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import dateFormat from 'dateformat';
import Link from 'next/link';

export default function Home({ data, error }) {
  console.log(data);
  console.log(error);

  return (
    <>
      <Head>
        <title>Campaign Manager</title>
      </Head>
      <main>
        <h1>Available Campaigns</h1>
        <p>lorem test</p>

        {data.map(el => (
          <div
            key={el.slug}
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
                src={`https://res.cloudinary.com/dkd3mgbyi/${el.logo}`}
                alt='hello'
                width={120}
                height={120}
              />
            </div>
            <div>
              <Link href={`/` + el.slug}>
                <a>
                  <h1>
                    {el.id} - {el.title}
                  </h1>
                </a>
              </Link>
              <p>{el.description}</p>
              <small>
                {dateFormat(
                  new Date(el.created_at),
                  'ddd, mmmm, dS, yyyy, h:MM:ss TT'
                )}
              </small>
            </div>
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
