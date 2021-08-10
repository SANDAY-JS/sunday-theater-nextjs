import useSWR from "swr";
import Head from "next/head";
import unfetch from "isomorphic-unfetch";
import Link from "next/link";

const url = "http://sunday-theater.local/wp-json/wp/v2/posts";
const fetcher = (url) => unfetch(url).then((r) => r.json());

export const Home = ({ posts: initialPosts }) => {
  const { data: posts } = useSWR(url, fetcher, initialPosts);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      {posts.map((post) => {
        return (
          <article key={post.id}>
            <Link href={`/${post.slug}`}>
              <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </Link>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </article>
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = await fetcher(url);
  console.log(posts);

  return {
    props: { posts },
  };
};

export default Home;
