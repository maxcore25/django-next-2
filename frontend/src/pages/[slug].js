import { useRouter } from 'next/router';

const Campaign = ({ data }) => {
  console.log(data);
  const route = useRouter();

  return (
    <div>
      <h1>{route.query.slug}</h1>
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
