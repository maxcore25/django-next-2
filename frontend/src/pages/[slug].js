import { useRouter } from 'next/router';

const Campaign = () => {
  const route = useRouter();
  return (
    <div>
      <h1>{route.query.slug}</h1>
    </div>
  );
};

export default Campaign;
