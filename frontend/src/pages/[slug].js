import { useRouter } from 'next/router';
import Image from 'next/image';
import dateFormat from 'dateformat';

const Campaign = ({ data }) => {
  console.log(data);
  const route = useRouter();

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
