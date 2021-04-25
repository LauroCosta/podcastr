import format from "date-fns/format";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import parseISO from "date-fns/parseISO";
import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../services/api";
import { converDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { Container } from "./episodeStyle";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string;
  durationAsString: string;
  url: string;
  publishedAt: string;
};

type EpisodeProps = {
  episode: Episode;
};

export default function Episode({ episode }: EpisodeProps) {
  return (
    <Container>
      <div className="thumbnailContainer">
        
       <Link href="/">
         <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
         </button>   
       </Link> 

       
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />

        <button type="button">
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.title}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), "d MMM yy", {
      locale: ptBR,
    }),
    durationAsString: converDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24,
  };
};
