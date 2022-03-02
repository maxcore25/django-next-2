import { useRouter } from 'next/router';

const Campaign = () => {
  const route = useRouter();
  return (
    <div>
      <h1>{route.query.slug}</h1>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch(`${process.env.BASE_URL}/campaigns`);
  data = await response.json();

  return {
    props: {
      data,
      error,
    },
  };
}

export default Campaign;
